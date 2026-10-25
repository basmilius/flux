import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, KeyboardEvent } from 'react';
import type { FluxDirection, FluxStyle } from '../types';
import { useFluxDisabled } from './DisplayExtended';
import { FluxTooltip } from './Overlays';
import {useElasticOverdrag} from './elastic';
import { usePointerDrag } from './pointer';
import sliderStyles from '../../../components/src/css/component/primitive/Slider.module.scss';

interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    direction?: FluxDirection;
    disabled?: boolean;
    error?: string | boolean;
    formatter?: (value: number, decimals?: number) => string;
    isLoading?: boolean;
    isReadonly?: boolean;
    isTicksVisible?: boolean;
    isTooltipDisabled?: boolean;
    max?: number;
    min?: number;
    name?: string;
    step?: number;
}
export interface FluxFormSliderProps extends SliderProps {
    defaultValue?: number;
    onValueChange?: (value: number) => void;
    value?: number;
}
export interface FluxFormRangeSliderProps extends SliderProps {
    defaultValue?: [number, number];
    minDistance?: number;
    onValueChange?: (value: [number, number]) => void;
    value?: [number, number];
}

function decimals(step: number) {
    const [base, exponent = '0'] = String(step).split('e-');
    return (base.split('.')[1]?.length ?? 0) + Number(exponent);
}
function snap(value: number, min: number, max: number, step: number) {
    const stepped = step > 0 ? Math.round(value / step) * step : value;
    return Number(Math.max(min, Math.min(max, stepped)).toFixed(step > 0 ? decimals(step) : 10));
}

export function FluxFormSlider({ defaultValue = 0, onValueChange, value, ...props }: FluxFormSliderProps) {
    const [inner, setInner] = useState(defaultValue);
    return (
        <Slider
            {...props}
            values={[value ?? inner]}
            onUpdate={(next) => {
                if (value === undefined) setInner(next[0]);
                onValueChange?.(next[0]);
            }}
        />
    );
}

export function FluxFormRangeSlider({ defaultValue = [0, 100], onValueChange, value, ...props }: FluxFormRangeSliderProps) {
    const [inner, setInner] = useState(defaultValue);
    return (
        <Slider
            {...props}
            values={value ?? inner}
            onUpdate={(next) => {
                const range: [number, number] = [next[0], next[1]];
                if (value === undefined) setInner(range);
                onValueChange?.(range);
            }}
        />
    );
}

function Slider({ className, direction = 'horizontal', disabled, error, formatter = (value, places) => value.toLocaleString(undefined, { maximumFractionDigits: places }), isLoading: _isLoading, isReadonly, isTicksVisible, isTooltipDisabled, max = 100, min = 0, minDistance = 0, name, onUpdate, step = 1, style, values, ...props }: SliderProps & { minDistance?: number; onUpdate(values: number[]): void; values: number[] }) {
    const scopedDisabled = useFluxDisabled(disabled);
    const active = useRef<number | null>(null);
    const root = useRef<HTMLDivElement>(null);
    const overdrag = useElasticOverdrag(root, direction, true);
    const vertical = direction === 'vertical';
    const span = max - min;
    const interactive = !scopedDisabled && !isReadonly && span > 0;
    const distance = Math.max(0, step, minDistance);
    const positions = values.map((value) => (span > 0 ? Math.max(0, Math.min(1, (value - min) / span)) : 0));
    const lower = values.length === 1 ? 0 : positions[0];
    const upper = positions[positions.length - 1];

    function update(index: number, value: number) {
        if (!interactive) return;
        const next = [...values];
        const target = snap(value, min, max, step);
        next[index] = snap(values.length === 1 ? target : index === 0 ? Math.min(target, values[1] - distance) : Math.max(target, values[0] + distance), min, max, step);
        if (next[index] === values[index]) return;
        onUpdate(next);
    }
    const drag = usePointerDrag(
        (event, element) => {
            const rect = element.getBoundingClientRect();
            const size = vertical ? rect.height : rect.width;
            if (!interactive || size <= 0) return;
            const coordinate = vertical ? event.clientY : event.clientX;
            const start = vertical ? rect.top : rect.left;
            const fraction = (coordinate - start) / size;
            const target = min + Math.max(0, Math.min(1, vertical ? 1 - fraction : fraction)) * span;
            if (active.current === null) active.current = values.length === 1 || Math.abs(target - values[0]) <= Math.abs(target - values[1]) ? 0 : 1;
            update(active.current, target);
            overdrag.update(coordinate, start, start + size);
            event.preventDefault();
        },
        () => {
            active.current = null;
            overdrag.reset();
        }
    );
    function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        if (!interactive) return;
        const next = event.key === 'Home' ? min : event.key === 'End' ? max : ['ArrowUp', 'ArrowRight'].includes(event.key) ? values[index] + step : ['ArrowDown', 'ArrowLeft'].includes(event.key) ? values[index] - step : undefined;
        if (next === undefined) return;
        event.preventDefault();
        update(index, next);
    }
    return (
        <div
            {...props}
            ref={root}
            className={clsx(sliderStyles.slider, vertical && sliderStyles.isVertical, scopedDisabled && sliderStyles.isDisabled, drag.isDragging && sliderStyles.isDragging, className)}
            style={style}
            aria-disabled={scopedDisabled || undefined}
            aria-invalid={Boolean(error) || undefined}
            onPointerDown={(event) => {
                props.onPointerDown?.(event);
                if (!interactive || event.defaultPrevented || event.button !== 0) return;
                const thumb = (event.target as HTMLElement).closest<HTMLElement>('[data-slider-thumb]');
                active.current = thumb ? Number(thumb.dataset.sliderThumb) : null;
                drag.start(event);
            }}
        >
            {isTicksVisible && <FluxTicks lower={min} upper={max} />}
            <div className={sliderStyles.sliderTrack}>
                <div className={sliderStyles.sliderTrackValue} style={vertical ? { bottom: `${lower * 100}%`, height: `${(upper - lower) * 100}%` } : { left: `${lower * 100}%`, width: `${(upper - lower) * 100}%` }} />
                {values.map((value, index) => (
                    <FluxTooltip key={index} open={!isTooltipDisabled && drag.isDragging && active.current === index} content={formatter(value, decimals(step))} direction={vertical ? 'horizontal' : 'vertical'}>
                        <button className={clsx(sliderStyles.sliderThumb, scopedDisabled && sliderStyles.isDisabled, drag.isDragging && active.current === index && sliderStyles.isDragging)} style={vertical ? { bottom: `${positions[index] * 100}%` } : { left: `${positions[index] * 100}%` }} data-slider-thumb={index} type="button" role="slider" tabIndex={scopedDisabled ? -1 : 0} aria-label={values.length === 1 ? props['aria-label'] : index === 0 ? 'Lower bound' : 'Upper bound'} aria-labelledby={props['aria-labelledby']} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-orientation={direction} aria-disabled={scopedDisabled || undefined} aria-readonly={isReadonly || undefined} onKeyDown={(event) => keyboard(event, index)} />
                    </FluxTooltip>
                ))}
            </div>
            {name && values.map((value, index) => <input key={index} type="hidden" name={values.length === 1 ? name : `${name}[]`} value={value} />)}
        </div>
    );
}

export function FluxTicks({ className, formatter = String, lower, max = 100, min = 0, step, upper, ...props }: HTMLAttributes<HTMLDivElement> & { formatter?: (value: number) => string; lower?: number; max?: number; min?: number; step?: number; upper?: number }) {
    min = lower ?? min;
    max = upper ?? max;
    const span = max - min;
    function ticks(target: number, isSmall = false) {
        if (span <= 0) return [min];
        const sizes = step && step > 0 ? [step] : [...(isSmall ? [0.1, 0.5] : []), 1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000];
        for (const size of sizes) {
            const count = Math.floor(span / size);
            if (count > target + 1) continue;
            return [min, ...Array.from({ length: Math.max(0, count - 1) }, (_, index) => min + (index + 1) * size), max];
        }
        const power = 10 ** (String(span).length - 1);
        return Array.from({ length: Math.ceil(span / power) }, (_, index) => min + index * power);
    }
    const large = ticks(5);
    const small = ticks(50, true).filter((value) => !large.includes(value));
    return (
        <div {...props} className={clsx(sliderStyles.ticks, className)}>
            {large.map((value) => (
                <div key={value} className={sliderStyles.tickLarge} style={{ '--position': span > 0 ? (value - min) / span : 0 } as FluxStyle}>
                    <span>{formatter(value)}</span>
                </div>
            ))}
            {small.map((value) => (
                <div key={value} className={sliderStyles.tickSmall} style={{ '--position': (value - min) / span } as CSSProperties} />
            ))}
        </div>
    );
}
