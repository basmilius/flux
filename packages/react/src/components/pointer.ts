import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';

export function usePointerDrag(onMove: (event: PointerEvent, element: HTMLElement) => void, onEnd?: () => void) {
    const [isDragging, setDragging] = useState(false);
    const move = useRef(onMove);
    const end = useRef(onEnd);
    const cleanup = useRef<(() => void) | undefined>(undefined);
    move.current = onMove;
    end.current = onEnd;
    useEffect(() => () => cleanup.current?.(), []);

    function start(event: ReactPointerEvent<HTMLElement>) {
        if (event.button !== 0) return;
        cleanup.current?.();
        const element = event.currentTarget;
        const pointerId = event.pointerId;
        const owner = element.ownerDocument;
        const update = (next: PointerEvent) => {
            if (next.pointerId === pointerId) move.current(next, element);
        };
        const finish = (next: PointerEvent) => {
            if (next.pointerId !== pointerId) return;
            cleanup.current?.();
            setDragging(false);
            end.current?.();
        };
        cleanup.current = () => {
            owner.removeEventListener('pointermove', update);
            owner.removeEventListener('pointerup', finish);
            owner.removeEventListener('pointercancel', finish);
            if (element.hasPointerCapture?.(pointerId)) element.releasePointerCapture(pointerId);
            cleanup.current = undefined;
        };
        element.setPointerCapture?.(pointerId);
        owner.addEventListener('pointermove', update);
        owner.addEventListener('pointerup', finish);
        owner.addEventListener('pointercancel', finish);
        setDragging(true);
        move.current(event.nativeEvent, element);
    }

    return { isDragging, start };
}
