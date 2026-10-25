import { clsx } from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import type { FluxColor, FluxDirection, FluxIconName, FluxStyle } from '../types';
import { useFluxDisabled } from './DisplayExtended';
import { FluxIcon } from './Icon';
import {useElasticOverdrag} from './elastic';
import { usePointerDrag } from './pointer';
import styles from '../../../components/src/css/component/FormFader.module.scss';

export interface FluxFormFaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    ariaLabel?: string;
    color?: FluxColor;
    defaultValue?: number;
    direction?: FluxDirection;
    disabled?: boolean;
    error?: string | boolean;
    isLoading?: boolean;
    name?: string;
    formatter?: (value: number, decimals?: number) => string;
    iconLeading?: FluxIconName;
    iconTrailing?: FluxIconName;
    isReadonly?: boolean;
    isTicksVisible?: boolean;
    isValueHidden?: boolean;
    label?: string;
    max?: number;
    min?: number;
    onValueChange?: (value: number) => void;
    step?: number;
    value?: number;
}
type RangeProps = Omit<FluxFormFaderProps, 'defaultValue' | 'onValueChange' | 'value'> & {
    defaultValue?: [number, number];
    minDistance?: number;
    onValueChange?: (value: [number, number]) => void;
    value?: [number, number];
};

export function FluxFormFader({ defaultValue = 0, onValueChange, value, ...props }: FluxFormFaderProps) {
    const [inner, setInner] = useState(defaultValue);
    return (
        <Fader
            {...props}
            values={[value ?? inner]}
            onUpdate={(values) => {
                if (value === undefined) setInner(values[0]);
                onValueChange?.(values[0]);
            }}
        />
    );
}
export function FluxFormRangeFader({ defaultValue = [0, 100], onValueChange, value, ...props }: RangeProps) {
    const [inner, setInner] = useState(defaultValue);
    return (
        <Fader
            {...props}
            values={value ?? inner}
            onUpdate={(values) => {
                const next: [number, number] = [values[0], values[1]];
                if (value === undefined) setInner(next);
                onValueChange?.(next);
            }}
        />
    );
}

function Fader({ ariaLabel, className, color = 'primary', direction = 'horizontal', disabled, error: _error, isLoading: _isLoading, name: _name, formatter = (value, places) => value.toLocaleString(undefined, { maximumFractionDigits: places }), iconLeading, iconTrailing, isReadonly, isTicksVisible, isValueHidden, label, max = 100, min = 0, minDistance = 0, onUpdate, step = 1, style, values, ...props }: Omit<FluxFormFaderProps, 'defaultValue' | 'onValueChange' | 'value'> & { minDistance?: number; onUpdate(values: number[]): void; values: number[] }) {
    const scopedDisabled = useFluxDisabled(disabled);
    const root = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const overdrag = useElasticOverdrag(track, direction);
    const dragStart = useRef(0);
    const scrubbing = useRef(false);
    const labelRef = useRef<HTMLSpanElement>(null);
    const valueRef = useRef<HTMLSpanElement>(null);
    const active = useRef<number | null>(null);
    const [focused, setFocused] = useState<number | null>(null);
    const [zones, setZones] = useState({ length: 0, labelStart: 0, labelEnd: 0, valueStart: Infinity });
    const [animated, setAnimated] = useState(values);
    const currentAnimation = useRef(values);
    const span = max - min;
    const vertical = direction === 'vertical';
    const ranged = values.length === 2;
    const interactive = !scopedDisabled && !isReadonly && span > 0;
    const [base, exponent = '0'] = String(step).split('e-');
    const places = (base.split('.')[1]?.length ?? 0) + Number(exponent);
    const snappy = span > 0 && step > 0 && Math.ceil(span / step) + 1 <= 12;
    const distance = Math.max(0, minDistance, step);
    const clamp = (value: number, lower = min, upper = max) => Math.max(lower, Math.min(upper, value));
    const snap = (value: number) => Number(clamp(step > 0 ? min + Math.round((value - min) / step) * step : value).toFixed(places));
    function update(index: number, target: number) {
        if (!interactive) return;
        const next = [...values];
        next[index] = snap(ranged ? (index === 0 ? Math.min(target, values[1] - distance) : Math.max(target, values[0] + distance)) : target);
        if (next[index] === values[index]) return;
        onUpdate(next);
    }
    const drag = usePointerDrag(
        (event, element) => {
            const rect = element.getBoundingClientRect();
            const size = vertical ? rect.height : rect.width;
            if (!interactive || size <= 0) return;
            const fraction = vertical ? 1 - (event.clientY - rect.top) / size : (event.clientX - rect.left) / size;
            const target = min + clamp(fraction, 0, 1) * span;
            if (active.current === null) active.current = !ranged || Math.abs(target - values[0]) <= Math.abs(target - values[1]) ? 0 : 1;
            const coordinate = vertical ? event.clientY : event.clientX;
            const start = vertical ? rect.top : rect.left;
            if (Math.abs(coordinate - dragStart.current) > 3) scrubbing.current = true;
            update(active.current, target);
            overdrag.update(coordinate, start, start + size);
            event.preventDefault();
        },
        () => {
            active.current = null;
            scrubbing.current = false;
            overdrag.reset();
        }
    );
    useLayoutEffect(() => {
        let frame = 0;
        const from = currentAnimation.current;
        const start = performance.now();
        const immediate = (scrubbing.current && !snappy) || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
        function animate(now: number) {
            const progress = immediate ? 1 : Math.min(1, (now - start) / 150);
            const ease = 1 - Math.pow(1 - progress, 3);
            currentAnimation.current = values.map((value, index) => from[index] + (value - from[index]) * ease);
            setAnimated(currentAnimation.current);
            if (progress < 1) frame = requestAnimationFrame(animate);
        }
        if (immediate) animate(start + 150);
        else if (from.some((value, index) => value !== values[index])) frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [values.join(','), snappy]);
    useLayoutEffect(() => {
        const element = root.current;
        if (!element) return;
        function measure() {
            const rect = element!.getBoundingClientRect();
            const start = vertical ? rect.top : rect.left;
            const box = labelRef.current?.getBoundingClientRect();
            const value = valueRef.current?.getBoundingClientRect();
            setZones({ length: vertical ? rect.height : rect.width, labelStart: box ? (vertical ? box.top : box.left) - start : -Infinity, labelEnd: box ? (vertical ? box.bottom : box.right) - start : -Infinity, valueStart: value ? (vertical ? value.top : value.left) - start : Infinity });
        }
        measure();
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure);
        observer?.observe(element);
        return () => observer?.disconnect();
    }, [direction, label, isValueHidden, values.join(',')]);
    const positions = animated.map((value) => (span > 0 ? clamp((value - min) / span, 0, 1) : 0));
    const lower = ranged ? positions[0] : 0;
    const upper = positions[positions.length - 1];
    const park = (value: number) => clamp(value, 8, Math.max(8, zones.length - 8));
    const dodges = (position: number) => zones.length > 0 && ((position > zones.labelStart - 6 && position < zones.labelEnd + 6) || position > zones.valueStart - 6);
    const centers = positions.map((position, index) => park(position * zones.length + (ranged && index === 0 ? 8 : -8)));
    function keyboard(event: KeyboardEvent<HTMLElement>, index: number) {
        if (!interactive) return;
        const amount = Math.max(step, span / 10);
        const target = event.key === 'Home' ? min : event.key === 'End' ? max : event.key === 'PageUp' ? values[index] + amount : event.key === 'PageDown' ? values[index] - amount : ['ArrowUp', 'ArrowRight'].includes(event.key) ? values[index] + step : ['ArrowDown', 'ArrowLeft'].includes(event.key) ? values[index] - step : undefined;
        if (target === undefined) return;
        event.preventDefault();
        update(index, target);
    }
    return (
        <div
            {...props}
            ref={root}
            className={clsx(styles.formFader, !ranged && styles.formFaderFocusable, vertical && styles.isVertical, scopedDisabled && styles.isDisabled, isReadonly && styles.isReadonly, drag.isDragging && styles.isDragging, className)}
            role={ranged ? 'group' : 'slider'}
            style={{ ...style, '--fader-accent': `var(--${color}-solid)`, '--fader-strong': `var(--${color}-text)` } as FluxStyle}
            aria-label={label ?? ariaLabel}
            aria-disabled={scopedDisabled || undefined}
            aria-readonly={(!ranged && isReadonly) || undefined}
            aria-orientation={ranged ? undefined : direction}
            aria-valuemin={ranged ? undefined : min}
            aria-valuemax={ranged ? undefined : max}
            aria-valuenow={ranged ? undefined : values[0]}
            aria-valuetext={ranged ? undefined : formatter(values[0], places)}
            tabIndex={ranged ? undefined : scopedDisabled ? -1 : 0}
            onKeyDown={(event) => {
                if (!ranged) keyboard(event, 0);
            }}
            onFocus={(event) => {
                if (!ranged && event.currentTarget.matches(':focus-visible')) setFocused(0);
            }}
            onBlur={() => setFocused(null)}
            onPointerDown={(event) => {
                if (!interactive || event.button !== 0) return;
                const thumb = (event.target as HTMLElement).closest<HTMLElement>('[data-fader-thumb]');
                active.current = thumb ? Number(thumb.dataset.faderThumb) : null;
                scrubbing.current = false;
                dragStart.current = vertical ? event.clientY : event.clientX;
                drag.start(event);
            }}
        >
            <div ref={track} className={styles.formFaderTrack}>
                <div className={styles.formFaderFill} style={vertical ? { bottom: `${lower * 100}%`, height: `${(upper - lower) * 100}%`, display: !upper ? 'none' : undefined } : { left: `${lower * 100}%`, width: `${(upper - lower) * 100}%`, display: !upper ? 'none' : undefined }} />
                {positions.map((position, index) => {
                    const location = `clamp(8px, calc(${position * 100}% ${ranged && index === 0 ? '+' : '-'} 8px), calc(100% - 8px))`;
                    const dodge = dodges(vertical ? zones.length - centers[index] : centers[index]);
                    return <span key={index} className={clsx(styles.formFaderBar, dodge ? styles.isDodge : drag.isDragging && active.current === index ? styles.isGrabbed : focused === index ? styles.isFocus : undefined)} style={vertical ? { bottom: location } : { left: location }} />;
                })}
                {(isTicksVisible || snappy) &&
                    step > 0 &&
                    span / step <= 100 &&
                    Array.from({ length: Math.max(0, Math.ceil(span / step) - 1) }, (_, index) => {
                        const position = ((index + 1) * step) / span;
                        const px = position * zones.length;
                        const dodge = dodges(vertical ? zones.length - px : px);
                        const opacity = dodge ? 0 : clamp((Math.min(...centers.map((center) => Math.abs(px - center))) - 10) / 6, 0, 1);
                        const filled = clamp((upper * zones.length - px) / 8, 0, 1) * (ranged ? clamp((px - lower * zones.length) / 8, 0, 1) : 1);
                        return (
                            <span key={index} className={styles.formFaderTick} style={{ ...(vertical ? { bottom: `${position * 100}%` } : { left: `${position * 100}%` }), opacity }}>
                                <span className={styles.formFaderTickBase} />
                                <span className={styles.formFaderTickFill} style={{ opacity: filled }} />
                            </span>
                        );
                    })}
            </div>
            {ranged &&
                values.map((value, index) => (
                    <button
                        key={index}
                        className={styles.formFaderThumb}
                        data-fader-thumb={index}
                        style={vertical ? { bottom: `${positions[index] * 100}%` } : { left: `${positions[index] * 100}%` }}
                        type="button"
                        role="slider"
                        aria-label={index === 0 ? 'Lower bound' : 'Upper bound'}
                        aria-disabled={scopedDisabled || undefined}
                        aria-readonly={isReadonly || undefined}
                        aria-orientation={direction}
                        aria-valuemin={index === 0 ? min : values[0] + distance}
                        aria-valuemax={index === 0 ? values[1] - distance : max}
                        aria-valuenow={value}
                        aria-valuetext={formatter(value, places)}
                        tabIndex={scopedDisabled ? -1 : 0}
                        onKeyDown={(event) => keyboard(event, index)}
                        onFocus={(event) => {
                            if (event.currentTarget.matches(':focus-visible')) setFocused(index);
                        }}
                        onBlur={() => setFocused(null)}
                    />
                ))}
            <div className={styles.formFaderOverlay}>
                {iconLeading && <FluxIcon className={styles.formFaderIconLeading} name={iconLeading} size={ranged ? 16 : 15} />}
                {label && (
                    <span ref={labelRef} className={styles.formFaderLabel}>
                        {label}
                    </span>
                )}
                {!isValueHidden && (
                    <span ref={valueRef} className={styles.formFaderValue}>
                        {animated.map((value) => formatter(Number(value.toFixed(places)), places)).join(' - ')}
                    </span>
                )}
                {iconTrailing && <FluxIcon className={styles.formFaderIconTrailing} name={iconTrailing} size={ranged ? 16 : 15} />}
            </div>
        </div>
    );
}
