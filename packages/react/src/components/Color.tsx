import {useFluxTranslate} from '../i18n';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { FluxPrimaryButton, FluxSecondaryButton } from './Actions';
import { FluxPaneBody } from './Display';
import { useFluxDisabled } from './DisplayExtended';
import { FluxFormField, FluxFormInput } from './Forms';
import { FluxIcon } from './Icon';
import { FluxFlyout } from './Overlays';
import { FluxFormSlider } from './Sliders';
import { usePointerDrag } from './pointer';
import coordinateStyles from '../../../components/src/css/component/primitive/CoordinatePicker.module.scss';
import colorStyles from '../../../components/src/css/component/Color.module.scss';

type Triple = [number, number, number];
export type FluxColorPickerType = 'hex' | 'rgb' | 'hsl' | 'hsv';

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}
function normalizeHex(value: string) {
    const match = value.trim().match(/^#?([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);
    if (!match) return null;
    let hex = match[1];
    if (hex.length <= 4)
        hex = hex
            .split('')
            .map((char) => char + char)
            .join('');
    return `#${hex.toLowerCase()}`;
}
function hexToRgb(value: string): Triple {
    const hex = normalizeHex(value)?.slice(1, 7) ?? '3b82f6';
    return [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16)) as Triple;
}
function rgbToHex([r, g, b]: Triple) {
    return `#${[r, g, b].map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0')).join('')}`;
}
function rgbToHsv([r, g, b]: Triple): Triple {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        delta = max - min;
    let h = 0;
    if (delta) h = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
    h = (h / 6 + 1) % 1;
    return [h, max === 0 ? 0 : delta / max, max];
}
function hsvToRgb([h, s, v]: Triple): Triple {
    const i = Math.floor(h * 6),
        f = h * 6 - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s);
    const values: [[number, number, number], [number, number, number], [number, number, number], [number, number, number], [number, number, number], [number, number, number]] = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
    ];
    return values[i % 6].map((value) => Math.round(value * 255)) as Triple;
}
function rgbToHsl(rgb: Triple): Triple {
    const [h, s, v] = rgbToHsv(rgb),
        l = v * (1 - s / 2),
        sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
    return [h * 360, sl * 100, l * 100];
}
function hslToRgb([degrees, percentS, percentL]: Triple): Triple {
    const h = (((degrees % 360) + 360) % 360) / 360,
        s = clamp(percentS / 100, 0, 1),
        l = clamp(percentL / 100, 0, 1),
        v = l + s * Math.min(l, 1 - l),
        sv = v === 0 ? 0 : 2 * (1 - l / v);
    return hsvToRgb([h, sv, v]);
}

export interface FluxColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    alpha?: number;
    defaultAlpha?: number;
    defaultValue?: string | Triple;
    isAlphaEnabled?: boolean;
    onAlphaChange?: (value: number) => void;
    onValueChange?: (value: string | Triple) => void;
    type?: FluxColorPickerType;
    value?: string | Triple;
}

function colorToHsv(value: string | Triple, type: FluxColorPickerType): Triple {
    if (type === 'hsv' && Array.isArray(value)) return [...value];
    const rgb = typeof value === 'string' ? hexToRgb(value) : type === 'hsl' ? hslToRgb(value) : value;
    return rgbToHsv(rgb);
}

export function FluxColorPicker({ alpha, className, defaultAlpha = 1, defaultValue = '#3b82f6', isAlphaEnabled, onAlphaChange, onValueChange, style, type = 'hex', value, ...props }: FluxColorPickerProps) {
    const translate = useFluxTranslate();

    const initial = value ?? defaultValue;
    const [hsv, setHsv] = useState<Triple>(() => colorToHsv(initial, type));
    const [innerAlpha, setInnerAlpha] = useState(() => {
        const hex = typeof initial === 'string' ? normalizeHex(initial) : null;
        return isAlphaEnabled && hex?.length === 9 ? parseInt(hex.slice(7), 16) / 255 : defaultAlpha;
    });
    const currentAlpha = alpha ?? innerAlpha;
    const lastEmitted = useRef<string | undefined>(undefined);
    const rgb = hsvToRgb(hsv);
    const displayHex =
        rgbToHex(rgb) +
        (isAlphaEnabled
            ? Math.round(currentAlpha * 255)
                  .toString(16)
                  .padStart(2, '0')
            : '');
    const [hexDraft, setHexDraft] = useState(displayHex);
    const disabled = useFluxDisabled();

    useEffect(() => {
        if (value === undefined || JSON.stringify(value) === lastEmitted.current) return;
        setHsv(colorToHsv(value, type));
        const hex = typeof value === 'string' ? normalizeHex(value) : null;
        if (isAlphaEnabled && hex?.length === 9) {
            const next = parseInt(hex.slice(7), 16) / 255;
            if (alpha === undefined) setInnerAlpha(next);
            if (next !== currentAlpha) onAlphaChange?.(next);
        }
    }, [value, type, isAlphaEnabled]);
    useEffect(() => setHexDraft(displayHex), [displayHex]);

    function commit(next: Triple, opacity = currentAlpha) {
        setHsv(next);
        const nextRgb = hsvToRgb(next);
        const output: string | Triple =
            type === 'hex'
                ? rgbToHex(nextRgb) +
                  (isAlphaEnabled
                      ? Math.round(opacity * 255)
                            .toString(16)
                            .padStart(2, '0')
                      : '')
                : type === 'rgb'
                  ? nextRgb
                  : type === 'hsl'
                    ? rgbToHsl(nextRgb)
                    : next;
        lastEmitted.current = JSON.stringify(output);
        onValueChange?.(output);
    }
    function commitAlpha(next: number) {
        if (alpha === undefined) setInnerAlpha(next);
        onAlphaChange?.(next);
        commit(hsv, next);
    }
    function commitHex() {
        const normalized = normalizeHex(hexDraft);
        if (!normalized) {
            setHexDraft(displayHex);
            return;
        }
        let opacity = currentAlpha;
        if (isAlphaEnabled && normalized.length === 9) {
            opacity = parseInt(normalized.slice(7), 16) / 255;
            if (alpha === undefined) setInnerAlpha(opacity);
            onAlphaChange?.(opacity);
        }
        const next = rgbToHsv(hexToRgb(normalized));
        commit(next, opacity);
        setHexDraft(
            rgbToHex(hsvToRgb(next)) +
                (isAlphaEnabled
                    ? Math.round(opacity * 255)
                          .toString(16)
                          .padStart(2, '0')
                    : '')
        );
    }
    const drag = usePointerDrag((event, element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 12 || rect.height <= 12) return;
        const round = (value: number) => Math.round(clamp(value, 0, 1) / 0.0005) * 0.0005;
        commit([hsv[0], round((event.clientX - rect.left - 6) / (rect.width - 12)), 1 - round((event.clientY - rect.top - 6) / (rect.height - 12))]);
        event.preventDefault();
    });
    const parts = type === 'rgb' ? rgb : type === 'hsl' ? rgbToHsl(rgb) : hsv;
    return (
        <div {...props} className={clsx(colorStyles.colorPicker, className)} style={{ ...style, '--pickerBackground': `rgb(${hsvToRgb([hsv[0], 1, 1]).join(' ')})` } as React.CSSProperties}>
            <div
                className={clsx(coordinateStyles.coordinatePicker, colorStyles.colorPickerSaturation)}
                role="group"
                aria-label="Saturation and brightness"
                aria-disabled={disabled || undefined}
                onPointerDown={(event) => {
                    if (!disabled) drag.start(event);
                }}
            >
                <button
                    type="button"
                    className={clsx(coordinateStyles.coordinatePickerThumb, disabled && coordinateStyles.isDisabled, drag.isDragging && coordinateStyles.isDragging)}
                    style={{ left: `${hsv[1] * 100}%`, top: `${(1 - hsv[2]) * 100}%` }}
                    aria-label={`Saturation and brightness, X: ${Math.round(hsv[1] * 100)}%, Y: ${Math.round((1 - hsv[2]) * 100)}%`}
                    aria-roledescription="2D slider"
                    aria-disabled={disabled || undefined}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={(event) => {
                        if (disabled || !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
                        event.preventDefault();
                        commit([hsv[0], clamp(hsv[1] + (event.key === 'ArrowRight' ? 0.0005 : event.key === 'ArrowLeft' ? -0.0005 : 0), 0, 1), clamp(hsv[2] + (event.key === 'ArrowUp' ? 0.0005 : event.key === 'ArrowDown' ? -0.0005 : 0), 0, 1)]);
                    }}
                />
            </div>
            <FluxFormSlider className={colorStyles.colorPickerHueSlider} aria-label={translate('flux.hue')} min={0} max={360} step={0.1} isTooltipDisabled value={hsv[0] * 360} onValueChange={(hue) => commit([hue / 360, hsv[1], hsv[2]])} />
            {isAlphaEnabled && <FluxFormSlider className={colorStyles.colorPickerAlphaSlider} aria-label={translate('flux.opacity')} min={0} max={1} step={0.001} isTooltipDisabled value={currentAlpha} onValueChange={commitAlpha} />}
            <div className={colorStyles.colorPickerValue}>
                <div className={colorStyles.colorPickerPreview} style={{ '--color': `rgb(${rgb.join(' ')} / ${currentAlpha})` } as React.CSSProperties} aria-hidden="true" />
                {type === 'hex' ? (
                    <FluxFormField label="Hex">
                        <FluxFormInput value={hexDraft} onValueChange={(value) => setHexDraft(String(value ?? ''))} onBlur={commitHex} />
                    </FluxFormField>
                ) : (
                    parts.map((part, index) => (
                        <FluxFormField key={index} label={(type === 'rgb' ? ['R', 'G', 'B'] : type === 'hsl' ? ['H', 'S', 'L'] : ['H', 'S', 'V'])[index]}>
                            <FluxFormInput
                                type="number"
                                min={0}
                                max={type === 'rgb' ? 255 : type === 'hsv' ? 1 : index === 0 ? 360 : 100}
                                step={type === 'hsv' ? 0.01 : 1}
                                value={Number(part.toFixed(4))}
                                onBlur={(event) => {
                                    const next = event.currentTarget.valueAsNumber;
                                    if (!Number.isFinite(next)) return;
                                    const values: Triple = [...parts];
                                    values[index] = next;
                                    commit(type === 'hsv' ? values : rgbToHsv(type === 'rgb' ? values : hslToRgb(values)));
                                }}
                                onValueChange={(raw) => {
                                    const next = Number(raw);
                                    if (!Number.isFinite(next)) return;
                                    const values: Triple = [...parts];
                                    values[index] = next;
                                    commit(type === 'hsv' ? values : rgbToHsv(type === 'rgb' ? values : hslToRgb(values)));
                                }}
                            />
                        </FluxFormField>
                    ))
                )}
            </div>
        </div>
    );
}

const defaultColors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];
export function FluxColorSelect({ className, colors = defaultColors, defaultValue = '#000000', disabled, isCustomAllowed, onValueChange, value, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> & { colors?: string[]; defaultValue?: string; disabled?: boolean; isCustomAllowed?: boolean; onValueChange?: (value: string) => void; value?: string }) {
    const translate = useFluxTranslate();

    const controlled = value !== undefined,
        [inner, setInner] = useState(defaultValue),
        current = controlled ? value : inner,
        [custom, setCustom] = useState(current),
        refs = useRef<Array<HTMLButtonElement | null>>([]),
        scopedDisabled = useFluxDisabled(disabled);
    const select = (next: string) => {
        if (scopedDisabled) return;
        if (!controlled) setInner(next);
        onValueChange?.(next);
    };
    const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let next: number | undefined;
        if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % colors.length;
        else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index - 1 + colors.length) % colors.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = colors.length - 1;
        if (next !== undefined) {
            event.preventDefault();
            refs.current[next]?.focus();
        }
    };
    return (
        <div {...props} className={clsx(colorStyles.colorSelect, className)} role="radiogroup">
            {colors.map((color, index) => (
                <button
                    key={color}
                    ref={(element) => {
                        refs.current[index] = element;
                    }}
                    className={current === color ? colorStyles.colorSelectColorSelected : colorStyles.colorSelectColorDeselected}
                    style={{ '--color': color } as React.CSSProperties}
                    type="button"
                    role="radio"
                    aria-checked={current === color}
                    aria-label={color}
                    disabled={scopedDisabled}
                    tabIndex={scopedDisabled || (!colors.includes(current) && index !== 0) || (colors.includes(current) && current !== color) ? -1 : 0}
                    onClick={() => select(color)}
                    onKeyDown={(event) => move(event, index)}
                >
                    <FluxIcon className={colorStyles.colorSelectCheck} name="check" size={12} />
                </button>
            ))}
            {isCustomAllowed && (
                <FluxFlyout
                    label={translate('flux.customColor')}
                    opener={({ toggle }) => (
                        <button className={colorStyles.colorSelectCustom} type="button" disabled={scopedDisabled} aria-label={translate('flux.customColor')} onClick={toggle}>
                            <FluxIcon name="ellipsis-h" size={16} />
                        </button>
                    )}
                >
                    {({ close }) => (
                        <>
                            <FluxColorPicker className={colorStyles.colorSelectCustomPicker} value={custom} onValueChange={(value) => setCustom(String(value))} />
                            <FluxPaneBody className={colorStyles.colorSelectButtons}>
                                <FluxSecondaryButton label={translate('flux.cancel')} onClick={close} />
                                <FluxPrimaryButton
                                    label="OK"
                                    onClick={() => {
                                        select(custom);
                                        close();
                                    }}
                                />
                            </FluxPaneBody>
                        </>
                    )}
                </FluxFlyout>
            )}
        </div>
    );
}
