import {clsx} from 'clsx';
import {Fragment, useEffect, useLayoutEffect, useRef, useState, type ElementType, type HTMLAttributes, type KeyboardEvent, type PointerEvent} from 'react';
import type {FluxDirection} from '../types';
import {flattenElements} from './children';
import styles from '../../../components/src/css/component/SplitView.module.scss';

export interface FluxSplitViewPaneProps extends HTMLAttributes<HTMLDivElement> {
    defaultSize?: number | string;
    isResizable?: boolean;
    maxSize?: number;
    minSize?: number;
}

export function FluxSplitViewPane({className, defaultSize: _default, isResizable: _resize, maxSize: _max, minSize: _min, ...props}: FluxSplitViewPaneProps) {
    return <div {...props} className={clsx(styles.splitViewPane, className)}/>;
}

export function FluxSplitView({as, children, className, direction = 'horizontal', rememberKey, style, tag, ...props}: HTMLAttributes<HTMLElement> & {as?: ElementType; direction?: FluxDirection; rememberKey?: string; tag?: keyof HTMLElementTagNameMap}) {
    const Component = as ?? tag ?? 'div';
    const root = useRef<HTMLElement>(null);
    const panes = flattenElements<FluxSplitViewPaneProps>(children).filter(child => child.type === FluxSplitViewPane);
    const keys = panes.map((pane, index) => pane.key ?? index);
    const previousKeys = useRef<(string | number)[]>([]);
    const [sizes, setSizes] = useState<number[]>([]);
    const currentSizes = useRef(sizes);
    const [dragging, setDragging] = useState(false);
    const activeDrag = useRef<(() => void) | null>(null);
    const storageKey = rememberKey ? `flux/split-view/${rememberKey}` : undefined;

    function persist(next: number[]) {
        if (!storageKey) return;
        try {localStorage.setItem(storageKey, JSON.stringify(next));} catch {}
    }

    function update(next: number[], save = true) {
        currentSizes.current = next;
        setSizes(next);
        if (save) persist(next);
    }

    useLayoutEffect(() => {
        if (keys.length === previousKeys.current.length && keys.every((key, index) => key === previousKeys.current[index])) return;
        let initial: number[] | undefined;
        if (storageKey) {
            try {
                const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
                if (Array.isArray(value) && value.length === panes.length && value.every(size => typeof size === 'number' && Number.isFinite(size))) initial = value;
            } catch {}
        }
        if (!initial) {
            const total = (direction === 'horizontal' ? root.current?.clientWidth : root.current?.clientHeight) ?? 0;
            const available = Math.max(0, total - Math.max(0, panes.length - 1) * 6);
            let claimed = 0;
            let flexCount = 0;
            initial = panes.map(({props: {defaultSize}}) => {
                const size = typeof defaultSize === 'number' ? defaultSize : typeof defaultSize === 'string' && defaultSize.endsWith('%') ? available * parseFloat(defaultSize) / 100 : -1;
                if (size === -1) flexCount++;
                else claimed += size;
                return size;
            });
            const share = flexCount ? Math.max(0, (available - claimed) / flexCount) : 0;
            initial = initial.map(size => size === -1 ? share : size);
        }
        const previous = new Map(previousKeys.current.map((key, index) => [key, currentSizes.current[index]]));
        const next = keys.map((key, index) => previous.get(key) ?? initial![index]);
        previousKeys.current = keys;
        update(next);
    });
    useEffect(() => () => activeDrag.current?.(), []);

    const min = (index: number) => panes[index].props.minSize ?? 64;
    const max = (index: number) => panes[index].props.maxSize ?? Infinity;
    const clamp = (next: number[]) => next.map((size, index) => Math.min(Math.max(size, min(index)), max(index)));
    const resizable = (index: number) => panes[index].props.isResizable !== false && panes[index + 1].props.isResizable !== false;

    function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        if (!resizable(index)) return;
        const decrease = direction === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
        const increase = direction === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
        const step = event.shiftKey ? 64 : 16;
        const next = [...currentSizes.current];
        let delta: number;
        if (event.key === decrease) delta = -step;
        else if (event.key === increase) delta = step;
        else if (event.key === 'Home') delta = min(index) - next[index];
        else if (event.key === 'End') delta = (panes[index].props.maxSize ?? next[index] + next[index + 1] - min(index + 1)) - next[index];
        else return;
        event.preventDefault();
        let left = next[index] + delta;
        let right = next[index + 1] - delta;
        if (left < min(index)) {right -= min(index) - left; left = min(index);}
        else if (left > max(index)) {right += left - max(index); left = max(index);}
        if (right < min(index + 1)) {left -= min(index + 1) - right; right = min(index + 1);}
        else if (right > max(index + 1)) {left += right - max(index + 1); right = max(index + 1);}
        next[index] = left;
        next[index + 1] = right;
        update(clamp(next));
    }

    function onPointerDown(event: PointerEvent<HTMLButtonElement>, index: number) {
        if (event.button !== 0 || !resizable(index)) return;
        event.preventDefault();
        activeDrag.current?.();
        const target = event.currentTarget;
        const pointerId = event.pointerId;
        const controller = new AbortController();
        const horizontal = direction === 'horizontal';
        const start = horizontal ? event.clientX : event.clientY;
        const initial = [...currentSizes.current];
        target.setPointerCapture?.(pointerId);
        setDragging(true);
        const stop = () => {
            controller.abort();
            if (target.hasPointerCapture?.(pointerId)) target.releasePointerCapture(pointerId);
            activeDrag.current = null;
            setDragging(false);
        };
        const move = (event: globalThis.PointerEvent) => {
            if (event.pointerId !== pointerId) return;
            const delta = (horizontal ? event.clientX : event.clientY) - start;
            update(clamp(initial.map((size, i) => i === index ? size + delta : i === index + 1 ? size - delta : size)), false);
        };
        const finish = () => {stop(); persist(currentSizes.current);};
        activeDrag.current = stop;
        target.addEventListener('pointermove', move, {signal: controller.signal});
        target.addEventListener('pointerup', finish, {signal: controller.signal});
        target.addEventListener('pointercancel', finish, {signal: controller.signal});
    }

    const tracks = sizes.flatMap((size, index) => index < sizes.length - 1 ? [`${size}px`, '6px'] : [`${size}px`]).join(' ');
    return <Component {...props} ref={root} className={clsx(direction === 'horizontal' ? styles.splitViewHorizontal : styles.splitViewVertical, dragging && styles.splitViewDragging, className)} style={{...style, [direction === 'horizontal' ? 'gridTemplateColumns' : 'gridTemplateRows']: tracks}}>
        {panes.map((pane, index) => {
            const total = (sizes[index] ?? 0) + (sizes[index + 1] ?? 0);
            const percentage = total > 0 ? Math.round((sizes[index] ?? 0) / total * 100) : 0;
            return <Fragment key={keys[index]}>{pane}{index < panes.length - 1 && <button
                className={direction === 'horizontal' ? styles.splitViewHandle : styles.splitViewHandleVertical}
                type="button" role="separator" aria-label={`Resize ${direction === 'horizontal' ? 'columns' : 'rows'} ${index + 1} and ${index + 2}`}
                aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage} aria-valuetext={`${percentage}%`}
                tabIndex={resizable(index) ? 0 : -1} onKeyDown={event => onKeyDown(event, index)} onPointerDown={event => onPointerDown(event, index)}
            />}</Fragment>;
        })}
    </Component>;
}
