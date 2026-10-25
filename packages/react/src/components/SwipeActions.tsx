import {clsx} from 'clsx';
import {useLayoutEffect, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode} from 'react';
import {useFluxTranslate} from '../i18n';
import type {FluxColor, FluxIconName} from '../types';
import {FluxDisabled, useFluxDisabled} from './DisplayExtended';
import {FluxIcon} from './Icon';
import {elasticResistance} from './elastic';
import {createSpring} from './spring';
import styles from '../../../components/src/css/component/SwipeActions.module.scss';

export type FluxSwipeActionsSide = 'start' | 'end';
type Side = FluxSwipeActionsSide | null;

export function FluxSwipeAction({className, color = 'gray', icon, isPrimary, label, ...props}: ButtonHTMLAttributes<HTMLButtonElement> & {color?: FluxColor; icon: FluxIconName; isPrimary?: boolean; label?: string}) {
    const disabled = useFluxDisabled(props.disabled);
    return <button {...props} className={clsx(styles[`swipeAction${color.charAt(0).toUpperCase() + color.slice(1)}`], !label && styles.isIconOnly, isPrimary && styles.isPrimary, className)} data-flux-swipe-action="" data-flux-swipe-primary={isPrimary ? '' : undefined} type="button" disabled={disabled}>
        <FluxIcon name={icon} size={18}/>{label && <span className={styles.swipeActionLabel}>{label}</span>}
    </button>;
}

export function FluxSwipeActions({children, className, defaultOpen = null, disabled, end, onOpenChange, open: openProp, start, threshold = .5, ...props}: HTMLAttributes<HTMLDivElement> & {defaultOpen?: Side; disabled?: boolean; end?: ReactNode; onOpenChange?: (side: Side) => void; open?: Side; start?: ReactNode; threshold?: number}) {
    const translate = useFluxTranslate();
    const scopedDisabled = useFluxDisabled(disabled);
    const [inner, setInner] = useState<Side>(defaultOpen);
    const open = openProp === undefined ? inner : openProp;
    const root = useRef<HTMLDivElement>(null);
    const row = useRef<HTMLDivElement>(null);
    const controls = useRef<{sync(side: Side): void} | null>(null);
    const options = useRef({disabled: scopedDisabled, threshold, open, change: (_side: Side) => {}});
    options.current = {disabled: scopedDisabled, threshold, open, change(side) {
        if (openProp === undefined) setInner(side);
        onOpenChange?.(side);
    }};
    useLayoutEffect(() => {
        const wrapper = root.current!;
        const content = row.current!;
        let currentOpen = options.current.open;
        let direction = 1;
        let rowSize = 0;
        let area = {start: 0, end: 0};
        let primary = {start: false, end: false};
        let armable = true;
        let armed: Side = null;
        let fullTarget: {side: FluxSwipeActionsSide; value: number; action: HTMLElement} | null = null;
        let min = 0;
        let max = 0;
        let base: number | null = null;
        let suppressClick = false;
        let resizeFrame = 0;
        let wheelTimer: ReturnType<typeof setTimeout> | undefined;
        let wheel: {dx: number; samples: Sample[]} | null = null;
        let pointer: {id: number; x: number; dragging: boolean; samples: Sample[]} | null = null;
        type Sample = {time: number; x: number};
        const sideOf = (value: number): Side => value > 0 ? 'start' : value < 0 ? 'end' : null;
        const group = (side: FluxSwipeActionsSide) => wrapper.querySelector<HTMLElement>(`:scope > .${styles.swipeActionsGroup}.${side === 'start' ? styles.isStart : styles.isEnd}`);
        const targetFor = (side: Side) => side === 'start' ? area.start : side === 'end' ? -area.end : 0;
        const sample = (samples: Sample[], time: number, x: number) => {
            samples.push({time, x});
            while (samples.length > 2 && time - samples[0].time > 100) samples.shift();
        };
        const velocity = (samples: Sample[], time: number, x: number) => samples.length && time > samples[0].time ? (x - samples[0].x) / (time - samples[0].time) : 0;
        const offset = createSpring(value => {
            const side = sideOf(value);
            const distance = side ? area[side] + Math.max(0, rowSize - area[side]) * options.current.threshold - (armed === side ? 6 : 0) : Infinity;
            armed = armable && side && primary[side] && Math.abs(value) >= distance ? side : null;
            wrapper.style.setProperty('--swipe-offset', `${value}px`);
            wrapper.style.setProperty('--swipe-open-start', String(side === 'start' ? Math.min(1, Math.abs(value) / 12) : 0));
            wrapper.style.setProperty('--swipe-open-end', String(side === 'end' ? Math.min(1, Math.abs(value) / 12) : 0));
            group('start')?.classList.toggle(styles.isArmed, armed === 'start');
            group('end')?.classList.toggle(styles.isArmed, armed === 'end');
            if (fullTarget && Math.abs(value - fullTarget.value) < 1) {
                const action = fullTarget.action;
                fullTarget = null;
                action.click();
                change(null);
            }
        });
        function measure() {
            direction = getComputedStyle(content).direction === 'rtl' ? -1 : 1;
            wrapper.style.setProperty('--swipe-dir', String(direction));
            rowSize = content.offsetWidth;
            const sizes = {start: 0, end: 0};
            const primaries = {start: false, end: false};
            for (const side of ['start', 'end'] as const) {
                const element = group(side);
                if (!element) continue;
                const previous = element.style.width;
                if (offset.value !== 0) element.style.width = '0';
                sizes[side] = element.offsetWidth;
                element.style.width = previous;
                primaries[side] = Boolean(element.querySelector('[data-flux-swipe-primary]'));
            }
            area = sizes;
            primary = primaries;
        }
        function settle(side: Side, velocity?: number) {offset.set(targetFor(side), {velocity});}
        function change(side: Side, velocity?: number) {
            const changed = currentOpen !== side;
            currentOpen = side;
            if (changed) options.current.change(side);
            settle(side, velocity);
        }
        function openTo(side: FluxSwipeActionsSide) {measure(); change(side);}
        function cancelWheel() {clearTimeout(wheelTimer); wheel = null;}
        function begin(allowFull: boolean) {
            if (options.current.disabled) return false;
            const pending = fullTarget !== null;
            fullTarget = null;
            if (pending) settle(currentOpen);
            measure();
            armable = allowFull;
            max = !area.start ? 0 : allowFull && primary.start ? rowSize : area.start;
            min = !area.end ? 0 : -(allowFull && primary.end ? rowSize : area.end);
            base = null;
            if (sideOf(offset.value) === 'start') min = 0;
            else if (sideOf(offset.value) === 'end') max = 0;
            return true;
        }
        function moveBy(dx: number) {
            base ??= offset.value;
            const wanted = base + dx * direction;
            const bounded = Math.min(max, Math.max(min, wanted));
            offset.snap(bounded + elasticResistance(wanted - bounded, {max: 36, range: 120}));
        }
        function finish(vx: number) {
            const side = sideOf(offset.value);
            if (!side || !area[side]) {change(null); return;}
            const speed = vx * direction;
            const towardsOpen = side === 'start' ? speed : -speed;
            if (towardsOpen < -.5) {change(null, speed); return;}
            if (armed === side) {
                const action = group(side)?.querySelector<HTMLElement>('[data-flux-swipe-primary]');
                if (!action) {openTo(side); return;}
                fullTarget = {side, action, value: side === 'start' ? rowSize : -rowSize};
                offset.set(fullTarget.value, {velocity: side === 'start' ? Math.max(0, speed) : Math.min(0, speed)});
            } else if (towardsOpen > .5) change(side, speed);
            else if (Math.abs(offset.value) >= area[side] / 2) openTo(side);
            else change(null);
        }
        function down(event: globalThis.PointerEvent) {
            if (pointer || event.button !== 0) return;
            cancelWheel();
            if (!begin(true)) return;
            suppressClick = false;
            pointer = {id: event.pointerId, x: event.clientX, dragging: false, samples: [{time: event.timeStamp, x: event.clientX}]};
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up);
            window.addEventListener('pointercancel', cancel);
        }
        function move(event: globalThis.PointerEvent) {
            if (!pointer || event.pointerId !== pointer.id) return;
            sample(pointer.samples, event.timeStamp, event.clientX);
            if (!pointer.dragging) {
                if (Math.abs(event.clientX - pointer.x) < 9) return;
                pointer.x = event.clientX;
                pointer.dragging = true;
                content.setPointerCapture?.(event.pointerId);
                content.classList.add(styles.isDragging);
            }
            moveBy(event.clientX - pointer.x);
        }
        function release() {
            if (pointer && content.hasPointerCapture?.(pointer.id)) content.releasePointerCapture(pointer.id);
            pointer = null;
            content.classList.remove(styles.isDragging);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', cancel);
        }
        function end(event: globalThis.PointerEvent, cancelled: boolean) {
            if (!pointer || event.pointerId !== pointer.id) return;
            const dragging = pointer.dragging;
            const vx = velocity(pointer.samples, event.timeStamp, event.clientX);
            release();
            if (!dragging) return;
            if (cancelled) settle(currentOpen);
            else {suppressClick = true; finish(vx);}
        }
        function up(event: globalThis.PointerEvent) {end(event, false);}
        function cancel(event: globalThis.PointerEvent) {end(event, true);}
        function onWheel(event: WheelEvent) {
            if (event.ctrlKey || event.metaKey) return;
            const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? wrapper.clientWidth : 1;
            if (!wheel) {
                if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || pointer?.dragging || !begin(offset.value !== 0)) return;
                wheel = {dx: 0, samples: [{time: event.timeStamp, x: 0}]};
            }
            event.preventDefault();
            wheel.dx -= event.deltaX * scale;
            sample(wheel.samples, event.timeStamp, wheel.dx);
            moveBy(wheel.dx);
            clearTimeout(wheelTimer);
            wheelTimer = setTimeout(() => {
                if (!wheel) return;
                const speed = velocity(wheel.samples, event.timeStamp, wheel.dx);
                cancelWheel();
                finish(speed);
            }, 80);
        }
        function click(event: MouseEvent) {
            if (!suppressClick) return;
            suppressClick = false;
            event.preventDefault();
            event.stopPropagation();
        }
        function select(event: Event) {if (pointer) event.preventDefault();}
        function groupFocus(event: FocusEvent) {
            const element = event.currentTarget as HTMLElement;
            openTo(element.classList.contains(styles.isStart) ? 'start' : 'end');
        }
        function groupBlur(event: FocusEvent) {
            if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) change(null);
        }
        function groupClick(event: MouseEvent) {
            const action = (event.target as Element).closest('[data-flux-swipe-action]');
            if (!action) return;
            if (action.contains(document.activeElement)) content.focus();
            change(null);
        }
        function resize() {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => {
                if (pointer?.dragging || wheel || fullTarget || offset.value !== targetFor(currentOpen)) return;
                measure(); settle(currentOpen);
            });
        }
        controls.current = {sync(side) {
            if (options.current.disabled) {
                cancelWheel(); fullTarget = null; release(); change(null);
            } else if (side !== currentOpen) {currentOpen = side; fullTarget = null; settle(side);}
        }};
        measure();
        offset.snap(targetFor(currentOpen));
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(resize);
        observer?.observe(content);
        const groups = [group('start'), group('end')].filter((element): element is HTMLElement => Boolean(element));
        for (const element of groups) {
            observer?.observe(element);
            element.addEventListener('focusin', groupFocus);
            element.addEventListener('focusout', groupBlur);
            element.addEventListener('click', groupClick);
        }
        content.addEventListener('pointerdown', down);
        content.addEventListener('selectstart', select);
        content.addEventListener('click', click, true);
        wrapper.addEventListener('wheel', onWheel, {passive: false});
        return () => {
            controls.current = null; fullTarget = null;
            release(); cancelWheel(); offset.stop(); observer?.disconnect(); cancelAnimationFrame(resizeFrame);
            content.removeEventListener('pointerdown', down);
            content.removeEventListener('selectstart', select);
            content.removeEventListener('click', click, true);
            wrapper.removeEventListener('wheel', onWheel);
            for (const element of groups) {
                element.removeEventListener('focusin', groupFocus);
                element.removeEventListener('focusout', groupBlur);
                element.removeEventListener('click', groupClick);
            }
        };
    }, [Boolean(start), Boolean(end)]);
    useLayoutEffect(() => controls.current?.sync(open), [open, scopedDisabled]);
    return <FluxDisabled disabled={scopedDisabled}><div {...props} ref={root} className={clsx(styles.swipeActions, className)}>
        <div ref={row} className={styles.swipeActionsRow} tabIndex={-1}>{children}</div>
        {start && <div className={clsx(styles.swipeActionsGroup, styles.isStart)} role="group" aria-label={translate('flux.swipeActionsLeading')}>{start}</div>}
        {end && <div className={clsx(styles.swipeActionsGroup, styles.isEnd)} role="group" aria-label={translate('flux.swipeActionsTrailing')}>{end}</div>}
    </div></FluxDisabled>;
}
