import {useEffect, useRef, type RefObject} from 'react';
import type {FluxDirection} from '../types';

export function elasticResistance(distance: number, {deadZone = 0, max = 8, range = 120}: {deadZone?: number; max?: number; range?: number} = {}) {
    return Math.sign(distance) * max * (1 - Math.exp(-Math.max(0, Math.abs(distance) - deadZone) / range));
}

export function useElasticOverdrag(element: RefObject<HTMLElement | null>, direction: FluxDirection, variables = false) {
    const current = useRef({direction, variables});
    current.current = {direction, variables};
    const controller = useRef<ReturnType<typeof createOverdrag> | null>(null);
    if (!controller.current) controller.current = createOverdrag((scale, origin) => {
        const style = element.current?.style;
        if (!style) return;
        if (current.current.variables) {
            style.setProperty('--slider-overdrag-scale', String(scale));
            style.setProperty('--slider-overdrag-origin', origin);
        } else {
            style.transform = `scale${current.current.direction === 'vertical' ? 'Y' : 'X'}(${scale})`;
            style.transformOrigin = origin;
        }
    }, () => current.current.direction === 'vertical');
    useEffect(() => () => controller.current?.dispose(), []);
    return controller.current;
}
function createOverdrag(apply: (scale: number, origin: string) => void, vertical: () => boolean) {
    let scale = 1;
    let origin = '0% 50%';
    let outside = false;
    let frame = 0;
    function stop() {cancelAnimationFrame(frame); frame = 0;}
    function springHome() {
        stop();
        const from = scale;
        if (from === 1) return;
        if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) {scale = 1; apply(scale, origin); return;}
        const start = performance.now();
        function animate(now: number) {
            const progress = Math.min(1, (now - start) / 320);
            scale = from + (1 - from) * (1 - Math.pow(1 - progress, 3));
            apply(scale, origin);
            frame = progress < 1 ? requestAnimationFrame(animate) : 0;
        }
        frame = requestAnimationFrame(animate);
    }
    return {
        update(coordinate: number, start: number, end: number) {
            if (end <= start) return;
            const past = coordinate < start ? coordinate - start : coordinate > end ? coordinate - end : 0;
            if (!past) {if (outside) {outside = false; springHome();} return;}
            outside = true;
            origin = past > 0 ? vertical() ? '50% 0%' : '0% 50%' : vertical() ? '50% 100%' : '100% 50%';
            stop();
            scale = 1 + elasticResistance(Math.abs(past), {deadZone: 4}) / (end - start);
            apply(scale, origin);
        },
        reset() {outside = false; springHome();},
        dispose: stop
    };
}
