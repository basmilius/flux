export interface MenuPointer {
    x: number;
    y: number;
    tx: number;
    ty: number;
    vx: number;
    vy: number;
    speed: number;
}
export interface MenuCone {
    id: string;
    ax: number;
    ay: number;
    bx: number;
    by: number;
    cx: number;
    cy: number;
    dx?: number;
    dy?: number;
    hx: number;
    hy: number;
    back: boolean;
}
export interface MenuEntry {
    id: string;
    isOpen: boolean;
    lastInside: number;
    getTrigger(): HTMLElement | null;
    getPopup(): HTMLElement | null;
    disabled(): boolean;
    onOpen(open: boolean): void;
}

// Match useMenuFlyout.ts: a 90ms trail, smoothed velocity and a 400ms return corridor.
const TRAIL_LAG = 90;
const EMA_ALPHA = .3;
const MAX_SAMPLE_DT = 100;
const CONE_EDGE_BUFFER = 9;
const VELOCITY_BUFFER_SCALE = 15;
const MAX_VELOCITY_BUFFER = 30;
const RETURN_WINDOW = 400;

export function createMenuPrediction(onCloseAll: () => void) {
    const entries = new Set<MenuEntry>();
    const listeners = new Set<() => void>();
    let cone: MenuCone | null = null;
    let pointer: MenuPointer = {x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, speed: 0};
    let pointerType = '';
    let keyboardStack: string[] = [];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastFlush = 0;
    let velocityX = 0;
    let velocityY = 0;
    const trail: Array<{time: number; x: number; y: number}> = [];

    function publish(next: MenuCone | null) {
        if (cone === next) return;
        cone = next;
        listeners.forEach(listener => listener());
    }
    function clearCone(entry: MenuEntry) {
        if (cone?.id === entry.id) publish(null);
    }
    function close(entry: MenuEntry) {
        if (!entry.isOpen) return;
        entry.isOpen = false;
        entry.lastInside = -Infinity;
        keyboardStack = keyboardStack.filter(id => id !== entry.id);
        clearCone(entry);
        entry.onOpen(false);
    }
    function parentOf(node: Node) {
        return [...entries].find(entry => entry.isOpen && entry.getPopup()?.contains(node));
    }
    function closeOthers(self: MenuEntry) {
        const ancestors = new Set<MenuEntry>();
        let node = self.getTrigger();
        while (node) {
            const parent = parentOf(node);
            if (!parent || ancestors.has(parent)) break;
            ancestors.add(parent);
            node = parent.getTrigger();
        }
        for (const entry of entries) if (entry !== self && !ancestors.has(entry)) close(entry);
    }
    function open(entry: MenuEntry, keyboard = false) {
        if (entry.disabled()) return;
        if (keyboard && !keyboardStack.includes(entry.id)) keyboardStack.push(entry.id);
        if (entry.isOpen) return;
        entry.isOpen = true;
        entry.onOpen(true);
        closeOthers(entry);
    }
    function isInsidePopups(target: Node | null) {
        return Boolean(target && [...entries].some(entry => entry.isOpen && entry.getPopup()?.contains(target)));
    }
    function hasOpenDescendant(self: MenuEntry) {
        const popup = self.getPopup();
        return Boolean(popup && [...entries].some(entry => entry !== self && entry.isOpen && entry.getTrigger() && popup.contains(entry.getTrigger())));
    }
    function aimingAtOpenSubmenu(askTrigger: HTMLElement, now: number) {
        for (const entry of entries) {
            if (!entry.isOpen) continue;
            const trigger = entry.getTrigger(), popup = entry.getPopup();
            if (!trigger || !popup || popup.contains(askTrigger)) continue;
            const t = trigger.getBoundingClientRect(), r = popup.getBoundingClientRect();
            if (forwardContains(pointer, t, r) || (now - entry.lastInside < RETURN_WINDOW && returnContains(pointer, t, r))) return true;
        }
        return false;
    }
    function updateEntry(entry: MenuEntry, now: number) {
        const trigger = entry.getTrigger();
        if (!trigger) return;
        const {x, y, tx, ty, speed} = pointer;
        const t = trigger.getBoundingClientRect();
        const overTrigger = contains(t, x, y);
        if (!entry.isOpen) {
            const top = trigger.ownerDocument.elementFromPoint(x, y);
            const occluded = top && !trigger.contains(top) && isInsidePopups(top);
            if (overTrigger && !occluded && !aimingAtOpenSubmenu(trigger, now)) open(entry);
            return;
        }
        const popup = entry.getPopup();
        if (!popup) return;
        const r = popup.getBoundingClientRect();
        const inside = contains(r, x, y) || hasOpenDescendant(entry);
        if (overTrigger || inside) {
            if (inside) entry.lastInside = now;
            clearCone(entry);
            return;
        }
        const forward = forwardCone(t, r, speed);
        if (triangleContains(x, y, tx, ty, forward.bx, forward.by, forward.cx, forward.cy)) {
            publish({id: entry.id, ax: tx, ay: ty, ...forward, hx: x, hy: y, back: false});
            return;
        }
        const back = returnCone(t, r, speed);
        if (now - entry.lastInside < RETURN_WINDOW && quadContains(x, y, back)) {
            publish({id: entry.id, ...back, hx: x, hy: y, back: true});
            return;
        }
        close(entry);
    }
    function flush() {
        frame = 0;
        const now = performance.now();
        const dt = lastFlush ? now - lastFlush : 0;
        if (dt > MAX_SAMPLE_DT) {
            velocityX = velocityY = 0;
            trail.length = 0;
        } else if (dt > 0) {
            velocityX = velocityX * (1 - EMA_ALPHA) + (pointerX - pointer.x) / dt * EMA_ALPHA;
            velocityY = velocityY * (1 - EMA_ALPHA) + (pointerY - pointer.y) / dt * EMA_ALPHA;
        }
        trail.push({time: now, x: pointerX, y: pointerY});
        while (trail.length > 1 && trail[1].time <= now - TRAIL_LAG) trail.shift();
        lastFlush = now;
        pointer = {x: pointerX, y: pointerY, tx: trail[0].x, ty: trail[0].y, vx: velocityX, vy: velocityY, speed: Math.hypot(velocityX, velocityY)};
        if (pointerType !== 'touch') for (const entry of entries) updateEntry(entry, now);
    }
    function move(event: PointerEvent) {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frame) frame = requestAnimationFrame(flush);
    }
    function down(event: PointerEvent) {pointerType = event.pointerType;}
    function reset() {
        if (frame) cancelAnimationFrame(frame);
        frame = lastFlush = velocityX = velocityY = 0;
        trail.length = 0;
    }
    function stop() {
        reset();
        window.removeEventListener('pointermove', move, true);
        window.removeEventListener('pointerdown', down, true);
    }
    return {
        register(entry: MenuEntry) {
            if (!entries.size && typeof window !== 'undefined') {
                reset();
                window.addEventListener('pointermove', move, {capture: true, passive: true});
                window.addEventListener('pointerdown', down, {capture: true, passive: true});
            }
            entries.add(entry);
            return () => {
                close(entry);
                entries.delete(entry);
                if (!entries.size && typeof window !== 'undefined') stop();
            };
        },
        open,
        close,
        dismiss() {for (const entry of entries) close(entry);},
        closeAll() {
            for (const entry of entries) close(entry);
            onCloseAll();
        },
        isInsidePopups,
        get pointerType() {return pointerType;},
        get keyboardOwner() {return keyboardStack.at(-1);},
        getCone: () => cone,
        getConeTrigger: () => [...entries].find(entry => entry.id === cone?.id)?.getTrigger() ?? null,
        subscribe(listener: () => void) {listeners.add(listener); return () => {listeners.delete(listener);};}
    };
}
export type MenuPrediction = ReturnType<typeof createMenuPrediction>;

function contains(rect: DOMRect, x: number, y: number) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
function triangleContains(px: number, py: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
    const signs = [(px - bx) * (ay - by) - (ax - bx) * (py - by), (px - cx) * (by - cy) - (bx - cx) * (py - cy), (px - ax) * (cy - ay) - (cx - ax) * (py - ay)];
    return !(signs.some(value => value < 0) && signs.some(value => value > 0));
}
function forwardCone(t: DOMRect, r: DOMRect, speed: number) {
    const x = r.left >= t.right ? r.left : r.right <= t.left ? r.right : r.left;
    const buffer = CONE_EDGE_BUFFER + Math.min(speed * VELOCITY_BUFFER_SCALE, MAX_VELOCITY_BUFFER);
    return {bx: x, by: r.top - buffer, cx: x, cy: r.bottom + buffer};
}
function returnCone(t: DOMRect, r: DOMRect, speed: number) {
    const right = r.left >= t.right, left = r.right <= t.left;
    const near = right ? r.left : left ? r.right : r.left;
    const far = right ? t.left : left ? t.right : t.left;
    const buffer = CONE_EDGE_BUFFER + Math.min(speed * VELOCITY_BUFFER_SCALE, MAX_VELOCITY_BUFFER);
    return {ax: far, ay: t.top - CONE_EDGE_BUFFER, bx: far, by: t.bottom + CONE_EDGE_BUFFER, cx: near, cy: r.bottom + buffer, dx: near, dy: r.top - buffer};
}
function quadContains(x: number, y: number, q: ReturnType<typeof returnCone>) {
    return triangleContains(x, y, q.ax, q.ay, q.bx, q.by, q.cx, q.cy) || triangleContains(x, y, q.ax, q.ay, q.cx, q.cy, q.dx, q.dy);
}
function forwardContains(p: MenuPointer, t: DOMRect, r: DOMRect) {
    const c = forwardCone(t, r, p.speed);
    return triangleContains(p.x, p.y, p.tx, p.ty, c.bx, c.by, c.cx, c.cy);
}
function returnContains(p: MenuPointer, t: DOMRect, r: DOMRect) {
    return quadContains(p.x, p.y, returnCone(t, r, p.speed));
}
