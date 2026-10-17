import {useEffect, useRef, useState, type RefObject} from 'react';
import type {FluxFlowController} from '../FlowUtilities';

const NO_PAN = 'a, button, input, select, textarea, label, [role="button"], [role="switch"], [contenteditable], [data-nopan]';

export function useFlowGestures(clip: RefObject<HTMLElement | null>, controller: FluxFlowController, interactive: boolean, zoomStep: number) {
    const latest = useRef({interactive, zoomStep});
    latest.current = {interactive, zoomStep};
    const [isPanning, setPanning] = useState(false);
    useEffect(() => {
        const element = clip.current;
        if (!element) return;
        let pointer: {x: number; y: number} | null = null;
        let gesturing = false;
        let timer = 0;
        let gestureScale = 1;
        const track = () => controller.setTracking(Boolean(pointer) || gesturing);
        const keepGesture = () => {
            gesturing = true;
            track();
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {gesturing = false; track();}, 140);
        };
        const down = (event: PointerEvent) => {
            if (!latest.current.interactive || event.button !== 0 || (event.target instanceof Element && event.target.closest(NO_PAN))) return;
            pointer = {x: event.clientX, y: event.clientY};
            setPanning(true);
            track();
            element.setPointerCapture(event.pointerId);
        };
        const move = (event: PointerEvent) => {
            if (!pointer) return;
            controller.panBounded(event.clientX - pointer.x, event.clientY - pointer.y);
            pointer = {x: event.clientX, y: event.clientY};
        };
        const up = (event: PointerEvent) => {
            if (!pointer) return;
            pointer = null;
            setPanning(false);
            track();
            if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
        };
        const wheel = (event: WheelEvent) => {
            if (!latest.current.interactive) return;
            const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
            const dx = event.deltaX * scale, dy = event.deltaY * scale;
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                keepGesture();
                const limit = Math.log(1 + latest.current.zoomStep) / 0.0075;
                controller.zoomAt(event.clientX, event.clientY, Math.exp(-Math.min(limit, Math.max(-limit, dy)) * 0.0075));
            } else {
                const delta = controller.panBounded(-dx, -dy);
                if (!delta.x && !delta.y && !gesturing) return;
                event.preventDefault();
                keepGesture();
            }
        };
        const gestureStart = (event: Event) => {
            if (!latest.current.interactive) return;
            event.preventDefault();
            gestureScale = 1;
            keepGesture();
        };
        const gestureChange = (event: Event) => {
            if (!latest.current.interactive) return;
            event.preventDefault();
            keepGesture();
            const gesture = event as Event & {scale: number; clientX: number; clientY: number};
            controller.zoomAt(gesture.clientX, gesture.clientY, gesture.scale / gestureScale);
            gestureScale = gesture.scale;
        };
        element.addEventListener('pointerdown', down);
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerup', up);
        element.addEventListener('pointercancel', up);
        element.addEventListener('wheel', wheel, {passive: false});
        element.addEventListener('gesturestart', gestureStart, {passive: false});
        element.addEventListener('gesturechange', gestureChange, {passive: false});
        return () => {
            window.clearTimeout(timer);
            element.removeEventListener('pointerdown', down);
            element.removeEventListener('pointermove', move);
            element.removeEventListener('pointerup', up);
            element.removeEventListener('pointercancel', up);
            element.removeEventListener('wheel', wheel);
            element.removeEventListener('gesturestart', gestureStart);
            element.removeEventListener('gesturechange', gestureChange);
        };
    }, [clip, controller]);
    return isPanning;
}
