import {clsx} from 'clsx';
import {useLayoutEffect, useRef, useState, type CSSProperties} from 'react';
import {useFluxTranslate} from '../i18n';
import type {FluxSheetPosition} from '../types';
import {DialogPortal, type DialogProps} from './Overlays';
import {elasticResistance} from './elastic';
import {createSpring} from './spring';
import styles from '../../../components/src/css/component/Sheet.module.scss';
import overlayStyles from '../../../components/src/css/component/Overlay.module.scss';

const GROW = {bottom: 'ArrowUp', top: 'ArrowDown', left: 'ArrowRight', right: 'ArrowLeft'};
const SHRINK = {bottom: 'ArrowDown', top: 'ArrowUp', left: 'ArrowLeft', right: 'ArrowRight'};
export function FluxSheet({children, className, isDraggable = true, position = 'bottom', snapPoints, ...props}: DialogProps & {isDraggable?: boolean; position?: FluxSheetPosition; snapPoints?: readonly number[]}) {
    const translate = useFluxTranslate();
    const [surface, setSurface] = useState<HTMLDivElement | null>(null);
    const options = useRef({isDraggable, isCloseable: props.isCloseable, onClose: props.onClose});
    options.current = {isDraggable, isCloseable: props.isCloseable, onClose: props.onClose};
    const control = useRef<{step(direction: number): void} | null>(null);
    const snaps = (snapPoints ?? []).filter(value => value > 0 && value <= 1).sort((a, b) => a - b);
    const tallest = snaps.at(-1);
    const vertical = position === 'bottom' || position === 'top';
    useLayoutEffect(() => {
        const element = surface;
        if (!props.open || !element) return;
        const sign = position === 'bottom' || position === 'right' ? 1 : -1;
        let size = 0;
        let index = 0;
        let closingAt: number | null = null;
        let owner: 'undecided' | 'scroller' | 'sheet' = 'undecided';
        let scroller: HTMLElement | null = null;
        let baseOffset = 0;
        let originTravel = 0;
        let previousTravel = 0;
        let pointer: {id: number; start: number; threshold: number; dragging: boolean; samples: {time: number; coordinate: number}[]} | null = null;
        let wheelDelta = 0;
        let wheelLocked = false;
        let wheelTimer: ReturnType<typeof setTimeout> | undefined;
        let suppressClick = false;
        let clickTimer: ReturnType<typeof setTimeout> | undefined;
        const coordinate = (event: PointerEvent) => vertical ? event.clientY : event.clientX;
        const rest = (at = index) => tallest ? (tallest - snaps[at]) / tallest * size : 0;
        const offset = createSpring(value => {
            element.style.setProperty('--sheet-offset', `${value}px`);
            const lowest = rest(0);
            const travel = size - lowest;
            const shade = element.closest(`.${overlayStyles.overlayProvider}`)?.querySelector<HTMLElement>(`.${overlayStyles.overlayShade}`);
            shade?.style.setProperty('--overlay-shade-opacity', String(travel > 0 ? Math.min(1, Math.max(0, 1 - (value - lowest) / travel)) : 1));
            if (closingAt !== null && value === closingAt) {closingAt = null; options.current.onClose?.();}
        });
        const settle = (velocity?: number) => offset.set(rest(), {velocity});
        function dismiss(velocity?: number) {
            if (!options.current.isCloseable) {index = 0; settle(velocity); return;}
            if (velocity === undefined) {options.current.onClose?.(); return;}
            closingAt = size;
            offset.set(size, {velocity});
        }
        function step(direction: number) {
            const next = index + direction;
            if (next < 0) {dismiss(); return;}
            if (next >= snaps.length) return;
            index = next;
            settle();
        }
        control.current = {step};
        function scrollRoom(target: HTMLElement | null, delta: number) {
            if (!target) return 0;
            const current = vertical ? target.scrollTop : target.scrollLeft;
            return delta < 0 ? current : (vertical ? target.scrollHeight - target.clientHeight : target.scrollWidth - target.clientWidth) - current;
        }
        function findScroller(target: Element) {
            for (let current: Element | null = target; current && current !== element; current = current.parentElement) {
                if (current instanceof HTMLElement && (vertical ? current.scrollHeight > current.clientHeight : current.scrollWidth > current.clientWidth)) return current;
            }
            return null;
        }
        function claim(travel: number) {owner = 'sheet'; baseOffset = offset.value; originTravel = travel;}
        function sample(event: PointerEvent) {
            if (!pointer) return;
            pointer.samples.push({time: event.timeStamp, coordinate: coordinate(event)});
            while (pointer.samples.length > 2 && event.timeStamp - pointer.samples[0].time > 100) pointer.samples.shift();
        }
        function down(event: PointerEvent) {
            if (pointer || event.button !== 0 || !options.current.isDraggable || !(event.target instanceof Element)) return;
            const grabber = Boolean(event.target.closest('[data-flux-sheet-grabber]'));
            if (!grabber && event.target.closest('a,button,input,label,select,summary,textarea,[contenteditable],[role="button"],[role="slider"]')) return;
            closingAt = null;
            owner = grabber ? 'sheet' : 'undecided';
            scroller = grabber ? null : findScroller(event.target);
            baseOffset = offset.value;
            originTravel = previousTravel = 0;
            pointer = {id: event.pointerId, start: coordinate(event), threshold: event.pointerType === 'mouse' ? 2 : 6, dragging: false, samples: []};
            sample(event);
            window.addEventListener('pointermove', move);
            window.addEventListener('pointerup', up);
            window.addEventListener('pointercancel', cancel);
        }
        function move(event: PointerEvent) {
            if (!pointer || pointer.id !== event.pointerId) return;
            sample(event);
            if (!pointer.dragging) {
                if (Math.abs(coordinate(event) - pointer.start) < pointer.threshold) return;
                pointer.start = coordinate(event);
                pointer.dragging = true;
                element!.setPointerCapture?.(event.pointerId);
            }
            const travel = (coordinate(event) - pointer.start) * sign;
            if (owner === 'undecided') {if (scrollRoom(scroller, -sign) > 0) owner = 'scroller'; else claim(travel);}
            if (owner === 'scroller') {
                const away = travel > previousTravel;
                previousTravel = travel;
                if (scrollRoom(scroller, -sign) > 0 || !away) return;
                claim(travel);
            }
            element!.classList.add(styles.isDragging);
            const wanted = baseOffset + travel - originTravel;
            if (wanted >= 0) offset.set(wanted);
            else if (scrollRoom(scroller, sign) > 0) {
                if (vertical) scroller!.scrollTop += -wanted * sign; else scroller!.scrollLeft += -wanted * sign;
                baseOffset = 0;
                originTravel = travel;
                offset.set(0);
            } else offset.set(elasticResistance(wanted, {max: 48, range: 120}));
        }
        function detach() {
            if (pointer && element!.hasPointerCapture?.(pointer.id)) element!.releasePointerCapture(pointer.id);
            pointer = null;
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', cancel);
        }
        function release(event?: PointerEvent) {
            if (!pointer || (event && pointer.id !== event.pointerId)) return;
            const oldest = pointer.samples[0];
            const elapsed = event && oldest ? event.timeStamp - oldest.time : 0;
            const velocity = event && elapsed > 0 ? (coordinate(event) - oldest.coordinate) / elapsed * sign : 0;
            const moving = owner === 'sheet' && pointer.dragging;
            suppressClick = pointer.dragging;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {suppressClick = false;}, 0);
            detach();
            owner = 'undecided';
            scroller = null;
            element!.classList.remove(styles.isDragging);
            if (!moving) return;
            if (!event) {settle(); return;}
            if (!tallest) {if (velocity > .5 || offset.value > size * .35) dismiss(velocity); else settle(velocity); return;}
            const fraction = tallest * (1 - offset.value / size);
            if (velocity > .5) {
                const below = snaps.findLastIndex(point => point < fraction);
                if (below < 0) dismiss(velocity); else {index = below; settle(velocity);}
            } else if (velocity < -.5) {
                const above = snaps.findIndex(point => point > fraction);
                index = above < 0 ? snaps.length - 1 : above;
                settle(velocity);
            } else if (fraction < snaps[0] * .65) dismiss(velocity);
            else {index = snaps.reduce((nearest, point, at) => Math.abs(point - fraction) < Math.abs(snaps[nearest] - fraction) ? at : nearest, 0); settle(velocity);}
        }
        const up = (event: PointerEvent) => release(event);
        const cancel = () => release();
        function wheel(event: WheelEvent) {
            if (!options.current.isDraggable || snaps.length < 2 || !(event.target instanceof Element)) return;
            const delta = vertical ? event.deltaY : event.deltaX;
            const direction = delta * sign < 0 ? -1 : 1;
            const room = scrollRoom(findScroller(event.target), delta);
            if (direction === 1 ? index === snaps.length - 1 : room > 0 || index === 0) return;
            event.preventDefault();
            if (wheelLocked) return;
            wheelDelta = Math.sign(delta) === Math.sign(wheelDelta) ? wheelDelta + delta : delta;
            clearTimeout(wheelTimer);
            wheelTimer = setTimeout(() => {wheelDelta = 0; wheelLocked = false;}, 120);
            if (Math.abs(wheelDelta) < 40) return;
            wheelDelta = 0;
            wheelLocked = true;
            step(direction);
        }
        function click(event: MouseEvent) {if (suppressClick) {event.preventDefault(); event.stopPropagation();}}
        function select(event: Event) {if (pointer) event.preventDefault();}
        function resize() {
            const next = vertical ? element!.offsetHeight : element!.offsetWidth;
            // The observer's initial notification must not stop the spring started by the first measurement.
            if (next === size) return;
            const first = size === 0 && next > 0;
            size = next;
            if (owner === 'sheet' || closingAt !== null) return;
            if (first) {offset.snap(size); offset.set(rest(), {damping: 28});} else offset.snap(rest());
        }
        resize();
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(resize);
        observer?.observe(element);
        element.addEventListener('pointerdown', down);
        element.addEventListener('selectstart', select);
        element.addEventListener('wheel', wheel, {passive: false});
        element.addEventListener('click', click, true);
        return () => {detach(); offset.stop(); observer?.disconnect(); clearTimeout(wheelTimer); clearTimeout(clickTimer); element.removeEventListener('pointerdown', down); element.removeEventListener('selectstart', select); element.removeEventListener('wheel', wheel); element.removeEventListener('click', click, true); control.current = null;};
    }, [surface, props.open, position, snaps.join(',')]);
    const positionClass = styles[`is${position[0].toUpperCase()}${position.slice(1)}`];
    return <DialogPortal {...props} transition="sheet" className={clsx(styles.sheet, positionClass, className)}>
        <div ref={setSurface} className={clsx(styles.sheetSurface, styles.isSprung, positionClass)} style={{'--sheet-offset': '100%', [vertical ? 'height' : 'width']: tallest ? `${tallest * 100}%` : undefined} as CSSProperties}>
            {isDraggable && <button className={styles.sheetGrabber} data-flux-sheet-grabber="" type="button" aria-label={translate('flux.sheetGrabber')} onClick={() => control.current?.step(-1)} onKeyDown={event => {if (event.key === GROW[position] || event.key === SHRINK[position]) {event.preventDefault(); control.current?.step(event.key === GROW[position] ? 1 : -1);}}} />}
            {children}
        </div>
    </DialogPortal>;
}
