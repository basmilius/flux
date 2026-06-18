import { animationFrameDebounce, isSSR } from '@flux-ui/internals';
import { inject, nextTick, onMounted, onUnmounted, provide, ref, type ComponentPublicInstance, type Ref, watch } from 'vue';
import { FluxMenuFlyoutInjectionKey, type FluxMenuFlyoutCone, type FluxMenuFlyoutEntry, type FluxMenuFlyoutInjection, type FluxMenuFlyoutPointer } from '~flux/components/data';

// How far back (ms) the cone apex trails the live pointer. A lagged anchor keeps the safe triangle
// stable and meaningfully sized even during slow diagonal moves, where a single-frame apex collapses.
const TRAIL_LAG = 90;
// EMA smoothing for the pointer velocity (~3 frames @ 60Hz). Dampens jitter, follows real turns.
const EMA_ALPHA = 0.3;
// A gap larger than this between two samples means the pointer was idle; velocity and trail are stale.
const MAX_SAMPLE_DT = 100;
// Base margin (px, on the 3px grid) added above/below the popup's near edge so the cone corners forgive.
const CONE_EDGE_BUFFER = 9;
// Extra base margin per px/ms of pointer speed, capped — faster moves get a wider, more forgiving cone.
const VELOCITY_BUFFER_SCALE = 15;
const MAX_VELOCITY_BUFFER = 30;
// Minimum horizontal speed (px/ms) towards the opener before the return cone is allowed to hold the
// submenu open — below it a (near-)vertical sweep through the menu column would get stuck on the cone.
const SPEED_EPSILON = 0.02;
// Grace window (ms) before a submenu closes once the pointer leaves the cone, to absorb overshoot.
const CONE_GRACE_DURATION = 150;

type FluxMenuFlyoutConeGeometry = {
    readonly edgeX: number;
    readonly bx: number;
    readonly by: number;
    readonly cx: number;
    readonly cy: number;
};

let flyoutId = 0;

export type UseMenuFlyoutProviderOptions = {
    readonly debugCone: Ref<boolean>;
    readonly onCloseAll?: () => void;
};

export type UseMenuFlyoutOptions = {
    readonly triggerRef: Ref<ComponentPublicInstance | HTMLElement | null>;
    readonly popupRef: Ref<ComponentPublicInstance | HTMLElement | null>;
    readonly disabled?: Ref<boolean>;
};

export type UseMenuFlyoutReturn = {
    readonly context: FluxMenuFlyoutInjection | null;
    readonly cone: Ref<FluxMenuFlyoutCone | null>;
    readonly isOpen: Ref<boolean>;
    closeAll(): void;
    focusTrigger(): void;
    onPopupKeydown(evt: KeyboardEvent): void;
    onTriggerClick(evt: MouseEvent): void;
    onTriggerKeydown(evt: KeyboardEvent): void;
};

/**
 * Creates and provides the shared menu-flyout context for an entire open menu tree. Used by the
 * outermost menu surface (FluxContextMenu, or a standalone root FluxMenu). Tracks the pointer, the
 * active prediction cone, the keyboard-trap stack and the set of teleported flyout popups so that
 * click-outside and close-all can reason about the whole tree.
 */
export function useMenuFlyoutProvider(options: UseMenuFlyoutProviderOptions): FluxMenuFlyoutInjection {
    const {debugCone, onCloseAll} = options;
    const entries = new Set<FluxMenuFlyoutEntry>();

    const pointer = ref<FluxMenuFlyoutPointer>({x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, speed: 0});
    const pointerType = ref('');
    const activeCone = ref<FluxMenuFlyoutCone | null>(null);
    const keyboardStack = ref<number[]>([]);

    let pointerX = 0;
    let pointerY = 0;

    // Timestamped trail of recent pointer samples, used to read the position from ~TRAIL_LAG ago, plus
    // the EMA velocity state. Reset whenever tracking (re)starts or the pointer goes idle.
    const trail: {t: number; x: number; y: number}[] = [];
    let lastFlushTime = 0;
    let emaVx = 0;
    let emaVy = 0;

    function resetTracking(): void {
        trail.length = 0;
        lastFlushTime = 0;
        emaVx = 0;
        emaVy = 0;
    }

    // pointermove can fire several times per frame (high-poll-rate mice), and every flyout entry
    // reacts to the pointer ref with synchronous getBoundingClientRect reads. Coalesce updates to
    // one per animation frame so those layout reads happen at most once per frame instead of per event.
    const flushPointer = animationFrameDebounce(() => {
        const now = performance.now();
        const previous = pointer.value;
        const dt = lastFlushTime === 0 ? 0 : now - lastFlushTime;

        if (dt > MAX_SAMPLE_DT) {
            // The pointer was idle: the previous velocity and trail no longer describe the motion.
            emaVx = 0;
            emaVy = 0;
            trail.length = 0;
        } else if (dt > 0) {
            const instVx = (pointerX - previous.x) / dt;
            const instVy = (pointerY - previous.y) / dt;
            emaVx = emaVx * (1 - EMA_ALPHA) + instVx * EMA_ALPHA;
            emaVy = emaVy * (1 - EMA_ALPHA) + instVy * EMA_ALPHA;
        }

        trail.push({t: now, x: pointerX, y: pointerY});

        // Keep the newest sample that is still at least TRAIL_LAG old as trail[0] (the anchor), and
        // drop everything older. When the pointer just started moving, trail[0] is simply the oldest
        // sample we have, which is a harmless near-pointer fallback.
        const cutoff = now - TRAIL_LAG;

        while (trail.length > 1 && trail[1].t <= cutoff) {
            trail.shift();
        }

        const anchor = trail[0];
        lastFlushTime = now;

        pointer.value = {
            x: pointerX,
            y: pointerY,
            tx: anchor.x,
            ty: anchor.y,
            vx: emaVx,
            vy: emaVy,
            speed: Math.hypot(emaVx, emaVy)
        };
    });

    function onPointerMove(evt: PointerEvent): void {
        pointerX = evt.clientX;
        pointerY = evt.clientY;
        flushPointer();
    }

    function onPointerDown(evt: PointerEvent): void {
        pointerType.value = evt.pointerType;
    }

    function startTracking(): void {
        if (isSSR) {
            return;
        }

        resetTracking();

        window.addEventListener('pointermove', onPointerMove, {capture: true, passive: true});
        window.addEventListener('pointerdown', onPointerDown, {capture: true, passive: true});
    }

    function stopTracking(): void {
        if (isSSR) {
            return;
        }

        resetTracking();

        window.removeEventListener('pointermove', onPointerMove, {capture: true});
        window.removeEventListener('pointerdown', onPointerDown, {capture: true});
    }

    // Finds the open flyout whose popup directly contains `node` — i.e. node's parent flyout. Used to
    // climb the ancestor chain across teleported popups (each submenu popup is portalled to <body>, so
    // a grandparent popup never DOM-contains a grandchild trigger).
    function parentFlyoutOf(node: Node): FluxMenuFlyoutEntry | null {
        for (const entry of entries) {
            if (!entry.isOpen.value) {
                continue;
            }

            const popup = entry.getPopup();

            if (popup && popup.contains(node)) {
                return entry;
            }
        }

        return null;
    }

    const context: FluxMenuFlyoutInjection = {
        debugCone,
        pointer,
        pointerType,
        activeCone,
        keyboardStack,

        register(entry: FluxMenuFlyoutEntry): void {
            if (entries.size === 0) {
                startTracking();
            }

            entries.add(entry);
        },

        unregister(entry: FluxMenuFlyoutEntry): void {
            entries.delete(entry);

            if (entries.size === 0) {
                stopTracking();
                activeCone.value = null;
            }
        },

        closeOthers(self: FluxMenuFlyoutEntry): void {
            // Keep the whole ancestor chain of `self` open, not just its direct parent: a submenu three
            // levels deep still lives inside its grandparent's popup, which must not close underneath it.
            const ancestors = new Set<FluxMenuFlyoutEntry>();

            let node: HTMLElement | null = self.getTrigger();
            let guard = entries.size;

            while (node && guard-- > 0) {
                const parent = parentFlyoutOf(node);

                if (!parent || ancestors.has(parent)) {
                    break;
                }

                ancestors.add(parent);
                node = parent.getTrigger();
            }

            for (const entry of entries) {
                if (entry === self || !entry.isOpen.value || ancestors.has(entry)) {
                    continue;
                }

                entry.close();
            }
        },

        hasOpenDescendant(self: FluxMenuFlyoutEntry): boolean {
            const popup = self.getPopup();

            if (!popup) {
                return false;
            }

            for (const entry of entries) {
                if (entry === self || !entry.isOpen.value) {
                    continue;
                }

                const trigger = entry.getTrigger();

                if (trigger && popup.contains(trigger)) {
                    return true;
                }
            }

            return false;
        },

        isAimingAtOpenSubmenu(askTrigger: HTMLElement | null): boolean {
            const pointerState = pointer.value;

            for (const entry of entries) {
                if (!entry.isOpen.value) {
                    continue;
                }

                const trigger = entry.getTrigger();
                const popup = entry.getPopup();

                if (!trigger || !popup) {
                    continue;
                }

                // Never let an ancestor's cone block one of its own descendants from opening: the
                // descendant's opener lives inside this popup, so "aiming at this submenu" is meaningless.
                if (askTrigger && popup.contains(askTrigger)) {
                    continue;
                }

                const t = trigger.getBoundingClientRect();
                const r = popup.getBoundingClientRect();

                // Aiming into the submenu (forward) or travelling back towards its opener (return) both
                // count, so a sibling opener never steals the hover while the pointer is in transit. The
                // return cone only holds while genuinely moving back (see isAimingBack), otherwise a fast
                // vertical sweep through the column would keep siblings stuck open.
                if (isAimingForward(pointerState, t, r) || isAimingBack(pointerState, t, r)) {
                    return true;
                }
            }

            return false;
        },

        isInsidePopups(target: Node | null): boolean {
            if (!target) {
                return false;
            }

            for (const entry of entries) {
                const popup = entry.getPopup();

                if (popup && popup.contains(target)) {
                    return true;
                }
            }

            return false;
        },

        getActiveConeTrigger(): HTMLElement | null {
            const cone = activeCone.value;

            if (!cone) {
                return null;
            }

            for (const entry of entries) {
                if (entry.id === cone.id) {
                    return entry.getTrigger();
                }
            }

            return null;
        },

        closeAll(): void {
            if (onCloseAll) {
                onCloseAll();
                return;
            }

            for (const entry of entries) {
                entry.close();
            }
        }
    };

    onUnmounted(stopTracking);

    provide(FluxMenuFlyoutInjectionKey, context);

    return context;
}

/**
 * Returns the shared menu-flyout context, creating (and providing) a new root context when none
 * exists higher up the tree. Used by FluxMenu so that a standalone menu becomes the root while a
 * menu nested inside a FluxContextMenu or another flyout inherits the existing context.
 */
export function useMenuFlyoutContext(options: UseMenuFlyoutProviderOptions): FluxMenuFlyoutInjection {
    const parent = inject(FluxMenuFlyoutInjectionKey, null);

    if (parent) {
        return parent;
    }

    return useMenuFlyoutProvider(options);
}

/**
 * Per-flyout open/close and prediction-cone behaviour for FluxMenuFlyout. Submenus open instantly on
 * hover. They stay open while the pointer is over the trigger/popup (or an open descendant) or aiming
 * at the submenu through the prediction cone (a safe triangle whose apex trails the pointer and whose
 * base widens with speed). Once the cone no longer holds, a short grace window absorbs overshoot and
 * curved approaches before the submenu finally closes — so closing is near-instant but not brittle.
 */
export default function useMenuFlyout(options: UseMenuFlyoutOptions): UseMenuFlyoutReturn {
    const {triggerRef, popupRef, disabled} = options;
    const context = inject(FluxMenuFlyoutInjectionKey, null);

    const id = ++flyoutId;
    const isOpen = ref(false);
    const openSource = ref<'pointer' | 'keyboard'>('pointer');
    const cone = ref<FluxMenuFlyoutCone | null>(null);

    let graceTimer = 0;

    const entry: FluxMenuFlyoutEntry = {
        id,
        getTrigger: () => elementOf(triggerRef.value),
        getPopup: () => elementOf(popupRef.value),
        isOpen,
        close: () => doClose()
    };

    function open(source: 'pointer' | 'keyboard'): void {
        if (disabled?.value) {
            return;
        }

        // A pending close from the grace window must not fire after we (re)open.
        cancelGrace();

        openSource.value = source;

        if (context && source === 'keyboard' && !context.keyboardStack.value.includes(id)) {
            context.keyboardStack.value = [...context.keyboardStack.value, id];
        }

        if (!isOpen.value) {
            isOpen.value = true;
            context?.closeOthers(entry);
        }

        if (source === 'keyboard') {
            nextTick(focusFirstItem);
        }
    }

    function doClose(): void {
        cancelGrace();

        if (!isOpen.value) {
            return;
        }

        isOpen.value = false;
        cone.value = null;

        if (context) {
            if (context.activeCone.value?.id === id) {
                context.activeCone.value = null;
            }

            context.keyboardStack.value = context.keyboardStack.value.filter(value => value !== id);
        }
    }

    // Keeps the submenu open but removes its cone overlay (e.g. while the pointer is over the trigger,
    // the popup itself, or an open descendant — there is nothing left to predict).
    function clearCone(): void {
        cone.value = null;

        if (context && context.activeCone.value?.id === id) {
            context.activeCone.value = null;
        }
    }

    function buildCone(flags: {grace: boolean; back: boolean}, x: number, y: number, tx: number, ty: number, geom: FluxMenuFlyoutConeGeometry): FluxMenuFlyoutCone {
        return {id, ax: tx, ay: ty, bx: geom.bx, by: geom.by, cx: geom.cx, cy: geom.cy, hx: x, hy: y, grace: flags.grace, back: flags.back};
    }

    // The cone no longer holds. Instead of closing instantly, keep the submenu open for a short grace
    // window so overshoot and curved approaches are forgiven; a later in-cone tick cancels it.
    function startGrace(): void {
        if (graceTimer !== 0) {
            return;
        }

        graceTimer = window.setTimeout(() => {
            graceTimer = 0;
            doClose();
        }, CONE_GRACE_DURATION);
    }

    function cancelGrace(): void {
        if (graceTimer !== 0) {
            clearTimeout(graceTimer);
            graceTimer = 0;
        }
    }

    function focusTrigger(): void {
        elementOf(triggerRef.value)?.focus();
    }

    function focusFirstItem(): void {
        const popup = elementOf(popupRef.value);

        if (!popup) {
            return;
        }

        const focusable = popup.querySelector<HTMLElement>('[tabindex="0"]') ?? popup.querySelector<HTMLElement>('a[href], button:not([disabled])');
        focusable?.focus();
    }

    function onTriggerClick(evt: MouseEvent): void {
        evt.stopPropagation();

        // evt.detail === 0 means the click came from the keyboard (Enter/Space), in which case we
        // move focus into the submenu.
        if (evt.detail === 0) {
            open('keyboard');
            return;
        }

        // On touch there is no hover, so the trigger acts as a toggle: tap to open, tap again to close.
        if (context?.pointerType.value === 'touch') {
            if (isOpen.value) {
                doClose();
            } else {
                open('pointer');
            }

            return;
        }

        // A real mouse click keeps focus where it is.
        open('pointer');
    }

    function onTriggerKeydown(evt: KeyboardEvent): void {
        if (evt.key === 'ArrowRight') {
            evt.preventDefault();
            evt.stopPropagation();
            open('keyboard');
        }
    }

    function onPopupKeydown(evt: KeyboardEvent): void {
        if (evt.key === 'ArrowLeft' || evt.key === 'Escape') {
            evt.preventDefault();
            evt.stopPropagation();
            doClose();
            focusTrigger();
        }
    }

    if (context && !isSSR) {
        watch(context.pointer, () => {
            // On touch there is no hover: opening/closing is driven entirely by taps (onTriggerClick),
            // so a swipe or scroll must not open submenus or trigger the prediction-cone close.
            if (context.pointerType.value === 'touch') {
                return;
            }

            const trigger = elementOf(triggerRef.value);

            if (!trigger) {
                return;
            }

            const {x, y, tx, ty, vx, speed} = context.pointer.value;
            const t = trigger.getBoundingClientRect();
            const overTrigger = x >= t.left && x <= t.right && y >= t.top && y <= t.bottom;

            if (!isOpen.value) {
                // A deep submenu popup can be clamped/flipped so it overlaps an ancestor menu, leaving a
                // sibling opener geometrically under the pointer but visually covered. Hit-test the topmost
                // element so that covered opener is not treated as hovered — which would wrongly open it
                // and close the submenu the pointer is actually inside.
                const topElement = document.elementFromPoint(x, y);
                const occludedByOtherPopup = !!topElement && !trigger.contains(topElement) && context.isInsidePopups(topElement);

                if (overTrigger && !occludedByOtherPopup && !context.isAimingAtOpenSubmenu(trigger)) {
                    open('pointer');
                }

                return;
            }

            const popup = elementOf(popupRef.value);

            if (!popup) {
                return;
            }

            const r = popup.getBoundingClientRect();
            const overPopup = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;

            // Over the trigger/popup or with an open descendant: nothing to predict, keep it open.
            if (overTrigger || overPopup || context.hasOpenDescendant(entry)) {
                cancelGrace();
                clearCone();

                return;
            }

            const forwardGeom = computeConeGeometry(t, r, speed);

            // Forward: aiming from the opener into the submenu.
            if (keepOpenByCone(x, y, tx, ty, forwardGeom)) {
                cancelGrace();
                cone.value = buildCone({grace: false, back: false}, x, y, tx, ty, forwardGeom);
                context.activeCone.value = cone.value;

                return;
            }

            // Return: travelling back from the submenu towards its opener. Only holds while the pointer is
            // actually moving back towards the opener, so a fast (near-)vertical sweep through the column
            // does not keep this submenu — and its opener's hover state — stuck open.
            const returnGeom = computeConeGeometry(r, t, speed);

            if (isMovingTowardsOpener(vx, t, r) && keepOpenByCone(x, y, tx, ty, returnGeom)) {
                cancelGrace();
                cone.value = buildCone({grace: false, back: true}, x, y, tx, ty, returnGeom);
                context.activeCone.value = cone.value;

                return;
            }

            // The pointer left both cones. Keep the overlay drawn (flagged grace) but release the active
            // cone so the owning menu's items become interactive again immediately — the parent should
            // not stay dimmed while the grace window decides whether this is overshoot or a real exit.
            cone.value = buildCone({grace: true, back: false}, x, y, tx, ty, forwardGeom);

            if (context.activeCone.value?.id === id) {
                context.activeCone.value = null;
            }

            startGrace();
        });
    }

    onMounted(() => context?.register(entry));

    onUnmounted(() => {
        doClose();
        context?.unregister(entry);
    });

    return {
        context,
        cone,
        isOpen,
        closeAll: () => context?.closeAll(),
        focusTrigger,
        onPopupKeydown,
        onTriggerClick,
        onTriggerKeydown
    };
}

function elementOf(value: ComponentPublicInstance | HTMLElement | null | undefined): HTMLElement | null {
    if (!value) {
        return null;
    }

    if (value instanceof HTMLElement) {
        return value;
    }

    return (value.$el as HTMLElement | null) ?? null;
}

function pointInTriangle(px: number, py: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
    const d1 = sign(px, py, ax, ay, bx, by);
    const d2 = sign(px, py, bx, by, cx, cy);
    const d3 = sign(px, py, cx, cy, ax, ay);
    const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
    const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;

    return !(hasNegative && hasPositive);
}

function sign(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
    return (px - bx) * (ay - by) - (ax - bx) * (py - by);
}

/**
 * Builds a prediction-cone base: the edge of `toRect` that faces `fromRect` (so this works for both
 * right- and left-opening submenus), widened above and below by a fixed margin plus a speed-proportional
 * one — faster moves get a more forgiving cone. Pass (trigger, popup) for the forward cone that guards
 * the opener → submenu path, or (popup, trigger) for the return cone that guards submenu → opener.
 */
function computeConeGeometry(fromRect: DOMRect, toRect: DOMRect, speed: number): FluxMenuFlyoutConeGeometry {
    const edgeX = toRect.left >= fromRect.right ? toRect.left : (toRect.right <= fromRect.left ? toRect.right : toRect.left);
    const buffer = CONE_EDGE_BUFFER + Math.min(speed * VELOCITY_BUFFER_SCALE, MAX_VELOCITY_BUFFER);

    return {
        edgeX,
        bx: edgeX,
        by: toRect.top - buffer,
        cx: edgeX,
        cy: toRect.bottom + buffer
    };
}

/**
 * Whether the live pointer (x, y) still sits inside the safe triangle formed by the trailing anchor
 * (tx, ty) and the cone base. The lagged anchor encodes recent direction; the speed-widened base
 * encodes pace — together they keep a submenu open while the pointer travels diagonally towards it.
 */
function keepOpenByCone(x: number, y: number, tx: number, ty: number, geom: FluxMenuFlyoutConeGeometry): boolean {
    return pointInTriangle(x, y, tx, ty, geom.bx, geom.by, geom.cx, geom.cy);
}

/**
 * Whether the pointer is aiming from the opener into the open submenu (the forward safe triangle:
 * apex at the trailing anchor, base on the popup's near edge).
 */
function isAimingForward(pointer: FluxMenuFlyoutPointer, t: DOMRect, r: DOMRect): boolean {
    return keepOpenByCone(pointer.x, pointer.y, pointer.tx, pointer.ty, computeConeGeometry(t, r, pointer.speed));
}

/**
 * Whether the pointer is travelling back from the open submenu towards its opener (the return safe
 * triangle, gated on horizontal velocity so it only applies while genuinely heading back).
 */
function isAimingBack(pointer: FluxMenuFlyoutPointer, t: DOMRect, r: DOMRect): boolean {
    if (!isMovingTowardsOpener(pointer.vx, t, r)) {
        return false;
    }

    return keepOpenByCone(pointer.x, pointer.y, pointer.tx, pointer.ty, computeConeGeometry(r, t, pointer.speed));
}

/**
 * Whether the horizontal velocity points from the popup back towards its opener. The return cone may
 * only hold the submenu open while genuinely heading back — a (near-)vertical sweep through the menu
 * column has ~zero horizontal velocity and must not get stuck on the return triangle.
 */
function isMovingTowardsOpener(vx: number, t: DOMRect, r: DOMRect): boolean {
    const towardOpener = Math.sign((t.left + t.right) - (r.left + r.right));

    return vx * towardOpener > SPEED_EPSILON;
}
