import { animationFrameDebounce, isSSR } from '@flux-ui/internals';
import { inject, nextTick, onMounted, onUnmounted, provide, ref, type ComponentPublicInstance, type Ref, watch } from 'vue';
import { FluxMenuFlyoutInjectionKey, type FluxMenuFlyoutCone, type FluxMenuFlyoutEntry, type FluxMenuFlyoutInjection, type FluxMenuFlyoutPointer } from '~flux/components/data';

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

    const pointer = ref<FluxMenuFlyoutPointer>({x: 0, y: 0, px: 0, py: 0});
    const pointerType = ref('');
    const activeCone = ref<FluxMenuFlyoutCone | null>(null);
    const keyboardStack = ref<number[]>([]);

    let pointerX = 0;
    let pointerY = 0;

    // pointermove can fire several times per frame (high-poll-rate mice), and every flyout entry
    // reacts to the pointer ref with synchronous getBoundingClientRect reads. Coalesce updates to
    // one per animation frame so those layout reads happen at most once per frame instead of per event.
    const flushPointer = animationFrameDebounce(() => {
        const previous = pointer.value;
        pointer.value = {x: pointerX, y: pointerY, px: previous.x, py: previous.y};
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

        window.addEventListener('pointermove', onPointerMove, {capture: true, passive: true});
        window.addEventListener('pointerdown', onPointerDown, {capture: true, passive: true});
    }

    function stopTracking(): void {
        if (isSSR) {
            return;
        }

        window.removeEventListener('pointermove', onPointerMove, {capture: true});
        window.removeEventListener('pointerdown', onPointerDown, {capture: true});
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
            const trigger = self.getTrigger();

            for (const entry of entries) {
                if (entry === self || !entry.isOpen.value) {
                    continue;
                }

                const popup = entry.getPopup();

                if (popup && trigger && popup.contains(trigger)) {
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

        isAimingAtOpenSubmenu(): boolean {
            const {x, y, px, py} = pointer.value;

            for (const entry of entries) {
                if (!entry.isOpen.value) {
                    continue;
                }

                const trigger = entry.getTrigger();
                const popup = entry.getPopup();

                if (!trigger || !popup) {
                    continue;
                }

                const t = trigger.getBoundingClientRect();
                const r = popup.getBoundingClientRect();
                const edgeX = r.left >= t.right ? r.left : (r.right <= t.left ? r.right : r.left);

                if (pointInTriangle(x, y, px, py, edgeX, r.top, edgeX, r.bottom)) {
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
 * Per-flyout open/close and prediction-cone behaviour for FluxMenuFlyout. Submenus open instantly
 * on hover and close instantly once the pointer is neither over the trigger/popup (or an open
 * descendant) nor aiming at the submenu through the prediction cone (the safe triangle). There are
 * no open/close delays — the cone is the only thing that keeps a submenu open during a diagonal
 * move, which is also why the debug cone only shows while it actually applies.
 */
export default function useMenuFlyout(options: UseMenuFlyoutOptions): UseMenuFlyoutReturn {
    const {triggerRef, popupRef, disabled} = options;
    const context = inject(FluxMenuFlyoutInjectionKey, null);

    const id = ++flyoutId;
    const isOpen = ref(false);
    const openSource = ref<'pointer' | 'keyboard'>('pointer');
    const cone = ref<FluxMenuFlyoutCone | null>(null);

    const entry: FluxMenuFlyoutEntry = {
        getTrigger: () => elementOf(triggerRef.value),
        getPopup: () => elementOf(popupRef.value),
        isOpen,
        close: () => doClose()
    };

    function open(source: 'pointer' | 'keyboard'): void {
        if (disabled?.value) {
            return;
        }

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

            const {x, y, px, py} = context.pointer.value;
            const t = trigger.getBoundingClientRect();
            const overTrigger = x >= t.left && x <= t.right && y >= t.top && y <= t.bottom;

            if (!isOpen.value) {
                if (overTrigger && !context.isAimingAtOpenSubmenu()) {
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

            if (overTrigger || overPopup || context.hasOpenDescendant(entry)) {
                cone.value = null;

                if (context.activeCone.value?.id === id) {
                    context.activeCone.value = null;
                }

                return;
            }

            const edgeX = r.left >= t.right ? r.left : (r.right <= t.left ? r.right : r.left);
            const candidate: FluxMenuFlyoutCone = {id, ax: x, ay: y, bx: edgeX, by: r.top, cx: edgeX, cy: r.bottom};

            if (pointInTriangle(x, y, px, py, edgeX, r.top, edgeX, r.bottom)) {
                cone.value = candidate;
                context.activeCone.value = candidate;
            } else {
                cone.value = null;

                if (context.activeCone.value?.id === id) {
                    context.activeCone.value = null;
                }

                doClose();
            }
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
