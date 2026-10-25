import {useFluxTranslate} from '../i18n';
import {FluxFadeTransition} from './Transitions';
import {useItemControl} from './Composition';
import {clsx} from 'clsx';
import {createContext, forwardRef, useContext, useEffect, useId, useMemo, useRef, useState} from 'react';
import type {ChangeEvent, CSSProperties, FieldsetHTMLAttributes, HTMLAttributes, InputHTMLAttributes, KeyboardEvent, ReactNode} from 'react';
import type {FluxColor, FluxDirection, FluxIconName, FluxStyle} from '../types';
import {FluxTag} from './Display';
import {useFluxDisabled} from './DisplayExtended';
import {useFluxFormField} from './Forms';
import {FluxIcon} from './Icon';
import {FluxMenu, FluxMenuItem} from './Menus';
import formStyles from '../../../components/src/css/component/Form.module.scss';
import ratingStyles from '../../../components/src/css/component/FormRating.module.scss';

type FormValue = string | number | boolean;

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
    const [inner, setInner] = useState(defaultValue);
    const controlled = value !== undefined;
    return [controlled ? value : inner, (next: T) => {if (!controlled) setInner(next); onChange?.(next);}] as const;
}

export function FluxFormInputAddition({children, className, icon, label, ...props}: HTMLAttributes<HTMLDivElement> & {icon?: FluxIconName; label?: string}) {
    return <div {...props} className={clsx(formStyles.formInputAddition, className)}>{icon && <FluxIcon name={icon} size={18} />}{label && <span>{label}</span>}{children}</div>;
}

export function FluxFormInputGroup({ariaLabel, className, isCondensed, isSecondary, ...props}: HTMLAttributes<HTMLDivElement> & {ariaLabel?: string; isCondensed?: boolean; isSecondary?: boolean}) {
    return <div {...props} className={clsx(formStyles.formInputGroup, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, className)} role={ariaLabel ? 'group' : props.role} aria-label={ariaLabel} />;
}

export interface FluxFormNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'type' | 'value'> {
    defaultValue?: number | null; error?: string | boolean; isCondensed?: boolean; isLoading?: boolean; isReadonly?: boolean; isSecondary?: boolean;
    onValueChange?: (value: number | null) => void; value?: number | null;
}
export const FluxFormNumberInput = forwardRef<HTMLInputElement, FluxFormNumberInputProps>(function FluxFormNumberInput({className, defaultValue = null, disabled, error, isCondensed, isLoading: _isLoading, isReadonly, isSecondary, max, min, onBlur, onChange, onFocus, onKeyDown, onValueChange, step = 1, style, value, ...props}, ref) {
    const field = useFluxFormField(), scopedDisabled = useFluxDisabled(disabled);
    const [current, setCurrent] = useControllable(value, defaultValue, onValueChange);
    const stepNumber = Number(step) || 1, minNumber = min === undefined ? undefined : Number(min), maxNumber = max === undefined ? undefined : Number(max);
    const constrain = (next: number) => Math.min(maxNumber ?? Infinity, Math.max(minNumber ?? -Infinity, next));
    const round = (next: number) => {const places = (String(stepNumber).split('.')[1] ?? '').length; return places ? Number(next.toFixed(places)) : next;};
    const stepValue = (direction: 1 | -1) => {if (!scopedDisabled && !isReadonly) setCurrent(constrain(round((current ?? minNumber ?? 0) + direction * stepNumber)));};
    return <div style={style} className={clsx(scopedDisabled ? formStyles.formInputDisabled : formStyles.formInputEnabled, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, (error || field?.error) && formStyles.isInvalid, className)} aria-disabled={scopedDisabled || undefined}>
        <input {...props} ref={ref} className={clsx(formStyles.formInputNative, formStyles.formNumberInputNative)} id={props.id ?? field?.id} inputMode="decimal" type="number" disabled={scopedDisabled} readOnly={isReadonly} min={min} max={max} step={step} value={current ?? ''} aria-describedby={props['aria-describedby'] ?? field?.describedBy} aria-invalid={Boolean(error || field?.error) || undefined} onFocus={onFocus} onChange={(event: ChangeEvent<HTMLInputElement>) => {onChange?.(event); setCurrent(event.currentTarget.value === '' ? null : event.currentTarget.valueAsNumber);}} onBlur={event => {if (current !== null) setCurrent(constrain(snap(current, minNumber ?? 0, stepNumber))); onBlur?.(event);}} onKeyDown={event => {onKeyDown?.(event); if (!event.defaultPrevented && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {stepValue(event.key === 'ArrowUp' ? 1 : -1); event.preventDefault();}}} />
        <span aria-hidden="true" className={formStyles.formNumberInputButtons}><button type="button" tabIndex={-1} className={formStyles.formNumberInputButton} disabled={scopedDisabled || isReadonly || (maxNumber !== undefined && current !== null && current >= maxNumber)} onClick={() => stepValue(1)}><FluxIcon name="angle-up" size={12} /></button><button type="button" tabIndex={-1} className={formStyles.formNumberInputButton} disabled={scopedDisabled || isReadonly || (minNumber !== undefined && current !== null && current <= minNumber)} onClick={() => stepValue(-1)}><FluxIcon name="angle-down" size={12} /></button></span>
    </div>;
});

function snap(value: number, min: number, step: number) {if (step <= 0) return value; const places = (String(step).split('.')[1] ?? '').length; const result = min + Math.round((value - min) / step) * step; return places ? Number(result.toFixed(places)) : result;}

export interface FluxFormPinInputProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'defaultValue' | 'onChange' | 'value'> {ariaLabel?: string; autoComplete?: string; defaultValue?: string; error?: string | boolean; isLoading?: boolean; isPrivate?: boolean; isReadonly?: boolean; maxLength?: number; onValueChange?: (value: string) => void; value?: string}
export function FluxFormPinInput({ariaLabel, autoComplete = 'one-time-code', className, defaultValue = '', disabled, error, isLoading: _isLoading, isPrivate, isReadonly, maxLength = 6, onValueChange, style, value, ...props}: FluxFormPinInputProps) {
    const field = useFluxFormField(), scopedDisabled = useFluxDisabled(disabled), refs = useRef<Array<HTMLInputElement | null>>([]), lastEmitted = useRef<string | undefined>(undefined);
    const translate = useFluxTranslate();
    const split = (current: string) => Array.from({length: maxLength}, (_, index) => current[index] ?? '');
    const [digits, setDigits] = useState(() => split(value ?? defaultValue));
    useEffect(() => {
        if (value !== undefined && value !== lastEmitted.current) setDigits(split(value));
        else setDigits(current => Array.from({length: maxLength}, (_, index) => current[index] ?? ''));
    }, [maxLength, value]);
    const commit = (next: string[]) => {
        setDigits(next);
        const emitted = next.join('');
        lastEmitted.current = emitted;
        onValueChange?.(emitted);
    };
    const update = (index: number, raw: string) => {const digit = raw.replace(/\D/g, '').slice(-1), next = [...digits]; next[index] = digit; commit(next); if (digit) refs.current[index + 1]?.focus();};
    return <fieldset {...props} className={clsx(scopedDisabled ? formStyles.formPinInputDisabled : formStyles.formPinInputEnabled, (error || field?.error) && formStyles.isInvalid, className)} style={{...style, '--max-length': maxLength} as FluxStyle} aria-describedby={props['aria-describedby'] ?? field?.describedBy} aria-disabled={scopedDisabled || undefined} aria-label={ariaLabel ?? props['aria-label']} aria-invalid={Boolean(error || field?.error) || undefined}>
        {digits.map((digit, index) => <input key={index} ref={element => {refs.current[index] = element;}} className={formStyles.formPinInputField} maxLength={1} aria-label={translate('flux.pinDigit', {index: index + 1, total: maxLength})} autoComplete={index === 0 ? autoComplete : undefined} autoFocus={index === 0 && props.autoFocus} disabled={scopedDisabled} readOnly={isReadonly} tabIndex={index === Math.max(0, digits.findIndex(value => !value)) ? 0 : -1} type={isPrivate ? 'password' : 'text'} inputMode="numeric" value={digit} onFocus={event => event.currentTarget.select()} onChange={event => update(index, event.currentTarget.value)} onKeyDown={event => {if (event.key === 'Backspace' && !digit) refs.current[index - 1]?.focus(); else if (event.key === 'ArrowLeft') refs.current[index - 1]?.select(); else if (event.key === 'ArrowRight') refs.current[index + 1]?.select(); else if (event.key.length === 1 && !/\d/.test(event.key)) event.preventDefault();}} onPaste={event => {const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, maxLength); if (pasted) {event.preventDefault(); commit(split(pasted)); refs.current[Math.min(pasted.length, maxLength) - 1]?.focus();}}} />)}
    </fieldset>;
}

export interface RadioContextValue {disabled: boolean; error?: string | boolean; isReadonly: boolean; name: string; select(value: FormValue): void; value?: FormValue}
export const RadioContext = createContext<RadioContextValue | null>(null);
export function FluxFormRadioGroup({ariaLabel, children, className, defaultValue, disabled, error, isConnected, isInline, isReadonly, name, onValueChange, value, ...props}: HTMLAttributes<HTMLDivElement> & {ariaLabel?: string; defaultValue?: FormValue; disabled?: boolean; error?: string | boolean; isConnected?: boolean; isInline?: boolean; isReadonly?: boolean; name?: string; onValueChange?: (value: FormValue) => void; value?: FormValue}) {
    const generated = useId(), scopedDisabled = useFluxDisabled(disabled), [current, select] = useControllable<FormValue | undefined>(value, defaultValue, next => {if (next !== undefined) onValueChange?.(next);});
    const context = useMemo(() => ({disabled: scopedDisabled, error, isReadonly: Boolean(isReadonly), name: name ?? generated, select, value: current}), [current, error, generated, isReadonly, name, scopedDisabled, select]);
    return <RadioContext.Provider value={context}><div {...props} className={clsx(formStyles.formRadioGroup, isInline && formStyles.isInline, isConnected && formStyles.isConnected, className)} role="radiogroup" aria-label={ariaLabel} aria-invalid={Boolean(error) || undefined}>{children}</div></RadioContext.Provider>;
}
export interface FluxFormRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'value'> {label?: ReactNode; subLabel?: ReactNode; value: FormValue}
export const FluxFormRadio = forwardRef<HTMLInputElement, FluxFormRadioProps>(function FluxFormRadio({children, className, disabled, label, subLabel, value, ...props}, ref) {const generated = useId(); const id = props.id ?? generated; const Tag = useItemControl(id) ? 'span' : 'label'; const group = useContext(RadioContext); if (!group) throw new Error('FluxFormRadio must be used inside FluxFormRadioGroup'); const isDisabled = disabled || group.disabled; return <Tag className={clsx(formStyles.formRadio, isDisabled && formStyles.isDisabled, group.isReadonly && formStyles.isReadonly, group.error && formStyles.isInvalid, className)}><input {...props} id={id} ref={ref} type="radio" className={formStyles.formRadioNative} name={group.name} checked={group.value === value} disabled={isDisabled} aria-readonly={group.isReadonly || undefined} aria-invalid={Boolean(group.error) || undefined} onClick={event => {if (group.isReadonly) event.preventDefault(); props.onClick?.(event);}} onChange={() => {if (!isDisabled && !group.isReadonly) group.select(value);}} /><span aria-hidden="true" className={formStyles.formRadioElement} />{subLabel ? <span className={formStyles.formRadioText}><span className={formStyles.formRadioLabel}>{children ?? label}</span><span className={formStyles.formRadioSubLabel}>{subLabel}</span></span> : (children || label) && <span className={formStyles.formRadioLabel}>{children ?? label}</span>}</Tag>;});
export function FluxFormRadioTile({children, className, disabled, icon, label, subLabel, value, ...props}: FluxFormRadioProps & {icon?: FluxIconName}) {const group = useContext(RadioContext); if (!group) throw new Error('FluxFormRadioTile must be used inside FluxFormRadioGroup'); const isDisabled = disabled || group.disabled; return <label className={clsx(formStyles.formRadioTile, isDisabled && formStyles.isDisabled, group.isReadonly && formStyles.isReadonly, group.error && formStyles.isInvalid, className)}><input {...props} type="radio" className={formStyles.formRadioNative} name={group.name} checked={group.value === value} disabled={isDisabled} onClick={event => {if (group.isReadonly) event.preventDefault();}} onChange={() => {if (!isDisabled && !group.isReadonly) group.select(value);}} /><span aria-hidden="true" className={formStyles.formRadioElement} />{icon && <FluxIcon className={formStyles.formRadioIcon} name={icon} size={15} />}<span className={formStyles.formRadioText}><span className={formStyles.formRadioLabel}>{children ?? label}</span>{subLabel && <span className={formStyles.formRadioSubLabel}>{subLabel}</span>}</span></label>;}

export interface CheckboxContextValue {disabled: boolean; error?: string | boolean; isReadonly: boolean; has(value: FormValue): boolean; toggle(value: FormValue): void}
export const CheckboxContext = createContext<CheckboxContextValue | null>(null);
export function useFluxCheckboxGroup() {return useContext(CheckboxContext);}
export function FluxFormCheckboxGroup({ariaLabel, children, className, defaultValue = [], disabled, error, isConnected, isInline, isReadonly, onValueChange, value, ...props}: HTMLAttributes<HTMLDivElement> & {ariaLabel?: string; defaultValue?: FormValue[]; disabled?: boolean; error?: string | boolean; isConnected?: boolean; isInline?: boolean; isReadonly?: boolean; onValueChange?: (value: FormValue[]) => void; value?: FormValue[]}) {const scopedDisabled = useFluxDisabled(disabled), [current, setCurrent] = useControllable(value, defaultValue, onValueChange); const context = useMemo(() => ({disabled: scopedDisabled, error, isReadonly: Boolean(isReadonly), has: (item: FormValue) => current.includes(item), toggle: (item: FormValue) => setCurrent(current.includes(item) ? current.filter(value => value !== item) : [...current, item])}), [current, error, isReadonly, scopedDisabled, setCurrent]); return <CheckboxContext.Provider value={context}><div {...props} className={clsx(formStyles.formCheckboxGroup, isInline && formStyles.isInline, isConnected && formStyles.isConnected, className)} role="group" aria-label={ariaLabel} aria-invalid={Boolean(error) || undefined}>{children}</div></CheckboxContext.Provider>;}
export function FluxFormCheckboxTile({children, className, disabled, icon, label, subLabel, value, ...props}: Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {icon?: FluxIconName; label?: ReactNode; subLabel?: ReactNode; value: FormValue}) {const group = useContext(CheckboxContext), scopedDisabled = useFluxDisabled(disabled || group?.disabled), checked = group?.has(value) ?? false, readonly = group?.isReadonly ?? false; return <label className={clsx(formStyles.formCheckboxTile, scopedDisabled && formStyles.isDisabled, readonly && formStyles.isReadonly, group?.error && formStyles.isInvalid, className)}><input {...props} type="checkbox" className={formStyles.formCheckboxNative} checked={checked} disabled={scopedDisabled} onClick={event => {if (readonly) event.preventDefault();}} onChange={() => {if (!scopedDisabled && !readonly) group?.toggle(value);}} /><span aria-hidden="true" className={formStyles.formCheckboxElement}><FluxIcon name="check" size={12} /></span>{icon && <FluxIcon className={formStyles.formCheckboxIcon} name={icon} size={15} />}<span className={formStyles.formCheckboxText}><span className={formStyles.formCheckboxLabel}>{children ?? label}</span>{subLabel && <span className={formStyles.formCheckboxSubLabel}>{subLabel}</span>}</span></label>;}

export function FluxFormStep({children, className, end, subtitle, title, ...props}: HTMLAttributes<HTMLDivElement> & {end?: ReactNode; subtitle?: string; title: string}) {const id = useId(); return <div {...props} className={clsx(formStyles.formStep, className)} role="group" aria-labelledby={id}><div className={formStyles.formStepHeader}><span aria-hidden="true" className={formStyles.formStepNumber} /><span className={formStyles.formStepHeading}><span id={id} className={formStyles.formStepTitle}>{title}</span>{subtitle && <span className={formStyles.formStepSubtitle}>{subtitle}</span>}</span>{end && <span className={formStyles.formStepEnd}>{end}</span>}</div>{children && <div className={formStyles.formStepContent}>{children}</div>}</div>;}

export {FluxFormSlider, FluxFormRangeSlider, FluxTicks} from './Sliders';
export type {FluxFormSliderProps, FluxFormRangeSliderProps} from './Sliders';

export function FluxFormRating({allowHalf, className, clearable, count = 5, defaultValue = null, disabled, error, icon = 'star', isReadonly, name, onChange, onValueChange, size, style, value}: {allowHalf?: boolean; className?: string; clearable?: boolean; count?: number; defaultValue?: number | null; disabled?: boolean; error?: string | boolean; icon?: FluxIconName; isReadonly?: boolean; name?: string; onChange?: (value: number | null) => void; onValueChange?: (value: number | null) => void; size?: number; style?: CSSProperties; value?: number | null}) {
    const scopedDisabled = useFluxDisabled(disabled);
    const [current, setCurrent] = useControllable(value, defaultValue, onValueChange);
    const [hover, setHover] = useState<number | null>(null);
    const interactive = !scopedDisabled && !isReadonly;
    const displayed = hover ?? current ?? 0;
    const commit = (next: number | null) => {setCurrent(next); onChange?.(next);};
    const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!interactive) return;
        const amount = allowHalf ? .5 : 1, now = current ?? 0;
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') commit(Math.min(count, now + amount));
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') commit(Math.max(0, now - amount));
        else if (event.key === 'Home') commit(0);
        else if (event.key === 'End') commit(count);
        else if (clearable && (event.key === 'Delete' || event.key === 'Backspace')) commit(null);
        else return;
        event.preventDefault();
    };
    return <div className={clsx(ratingStyles.formRating, scopedDisabled && ratingStyles.isDisabled, error && ratingStyles.isInvalid, className)} style={{...style, fontSize: size && `${size}px`}} role="slider" aria-disabled={scopedDisabled || undefined} aria-readonly={isReadonly || undefined} aria-valuemin={0} aria-valuemax={count} aria-valuenow={current ?? 0} aria-valuetext={`${current ?? 0} / ${count}`} tabIndex={interactive ? 0 : undefined} onKeyDown={keyboard} onPointerLeave={() => setHover(null)}>
        {name && <input type="hidden" name={name} value={current ?? ''} />}
        {Array.from({length: count}, (_, index) => {
            const star = index + 1, fill = Math.min(1, Math.max(0, displayed-index));
            return <button key={star} className={ratingStyles.formRatingStar} type="button" tabIndex={-1} aria-hidden="true" disabled={!interactive} style={{'--fill': fill} as FluxStyle} onPointerMove={event => {if (interactive) {const rect = event.currentTarget.getBoundingClientRect(); setHover(allowHalf && event.clientX-rect.left < rect.width/2 ? star-.5 : star);}}} onClick={event => {const rect = event.currentTarget.getBoundingClientRect(), next = allowHalf && event.clientX-rect.left < rect.width/2 ? star-.5 : star; commit(clearable && current === next ? null : next);}}><FluxIcon className={ratingStyles.formRatingStarEmpty} name={icon} size={size} /><FluxIcon className={ratingStyles.formRatingStarFull} name={icon} size={size} /></button>;
        })}
    </div>;
}

export {FluxFormTagsInput} from './TagsInput';
export type {FluxTagsSuggestion, FluxFormTagsInputProps} from './TagsInput';
