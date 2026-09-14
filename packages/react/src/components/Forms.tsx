import {clsx} from 'clsx';
import {createContext, forwardRef, useContext, useId, useRef, useState} from 'react';
import type {ChangeEvent, FieldsetHTMLAttributes, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes} from 'react';
import type {FluxIconName, FluxStyle} from '../types';
import {FluxIcon} from './Icon';
import {FluxSpinner} from './Feedback';
import {useFluxDisabled} from './DisplayExtended';
import formStyles from '../../../components/src/css/component/Form.module.scss';

interface FieldContextValue {
    describedBy?: string;
    error?: string;
    id: string;
}

const FieldContext = createContext<FieldContextValue | undefined>(undefined);

export function useFluxFormField() {
    return useContext(FieldContext);
}

export interface FluxFormFieldProps extends HTMLAttributes<HTMLDivElement> {
    as?: 'field' | 'group';
    addition?: ReactNode;
    currentLength?: number;
    error?: string;
    hint?: string;
    isOptional?: boolean;
    label?: ReactNode;
    maxLength?: number;
    valueLabel?: ReactNode;
}

export function FluxFormField({addition, as = 'field', children, className, currentLength, error, hint, isOptional, label, maxLength, valueLabel, ...props}: FluxFormFieldProps) {
    const baseId = useId();
    const id = `flux-${baseId.replace(/:/g, '')}`;
    const labelId = `${id}-label`;
    const errorId = error ? `${id}-error` : undefined;
    const hintId = hint ? `${id}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;
    const Header = as === 'group' ? 'div' : 'label';

    return <FieldContext.Provider value={{describedBy, error, id}}>
        <div {...props} className={clsx(formStyles.formField, className)} role={as === 'group' ? 'group' : undefined} aria-labelledby={as === 'group' && label ? labelId : undefined}>
            <Header className={formStyles.formFieldHeader} htmlFor={as === 'field' ? id : undefined}>
                {label && <span id={as === 'group' ? labelId : undefined} className={formStyles.formFieldLabel}>{label}</span>}
                {isOptional && <span className={formStyles.formFieldOptional}>(optional)</span>}
                {valueLabel && <span className={formStyles.formFieldValue}>{valueLabel}</span>}
            </Header>
            {children}
            {currentLength !== undefined && maxLength !== undefined && maxLength > 0 && <span className={formStyles.formFieldCounter}>{currentLength} / {maxLength}</span>}
            {error && <FluxFormFieldAddition id={errorId} icon="circle-exclamation" mode="error" message={error} />}
            {hint && <FluxFormFieldAddition id={hintId} icon="circle-info" message={hint} />}
            {addition}
        </div>
    </FieldContext.Provider>;
}

export function FluxFormFieldAddition({className, icon, message, mode = 'hint', ...props}: HTMLAttributes<HTMLDivElement> & {icon?: FluxIconName; message?: ReactNode; mode?: 'error' | 'hint'}) {
    return <div {...props} className={clsx(mode === 'error' ? formStyles.formFieldAdditionError : formStyles.formFieldAdditionHint, className)} role={mode === 'error' ? 'alert' : undefined}>{icon && <FluxIcon className={formStyles.formFieldAdditionIcon} name={icon} size={16} />}{message && <span>{message}</span>}</div>;
}

export interface FluxFormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
    error?: string | boolean;
    iconLeading?: FluxIconName;
    iconTrailing?: FluxIconName;
    isCondensed?: boolean;
    isLoading?: boolean;
    isReadonly?: boolean;
    isSecondary?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string | number | null) => void;
}

export const FluxFormInput = forwardRef<HTMLInputElement, FluxFormInputProps>(function FluxFormInput({className, disabled, error, iconLeading, iconTrailing, isCondensed, isLoading, isReadonly, isSecondary, onChange, onValueChange, readOnly, type = 'text', ...props}, ref) {
    const field = useContext(FieldContext);
    const scopedDisabled = useFluxDisabled(disabled);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const nativeType = type === 'password' && passwordVisible ? 'text' : type;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        const value = event.target.value;
        onValueChange?.(value === '' ? null : type === 'number' ? event.target.valueAsNumber : value);
    };

    return <div className={clsx(scopedDisabled ? formStyles.formInputDisabled : formStyles.formInputEnabled, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, (error || field?.error) && formStyles.isInvalid, className)} aria-disabled={scopedDisabled || undefined}>
        <input
            {...props}
            ref={ref}
            className={clsx(formStyles.formInputNative, (iconTrailing || type === 'password' || isLoading) && formStyles.formInputNativeHasIconTrailing, iconLeading && formStyles.formInputNativeHasIconLeading)}
            id={props.id ?? field?.id}
            type={nativeType}
            disabled={scopedDisabled}
            readOnly={isReadonly ?? readOnly}
            aria-describedby={props['aria-describedby'] ?? field?.describedBy}
            aria-disabled={scopedDisabled || undefined}
            aria-invalid={Boolean(error || field?.error) || undefined}
            onChange={handleChange}
        />
        {iconLeading && <FluxIcon className={formStyles.formInputIconLeading} name={iconLeading} size={18} />}
        {type === 'password' ? <button type="button" className={formStyles.formInputIconPasswordToggle} aria-label="Toggle password visibility" aria-pressed={passwordVisible} disabled={scopedDisabled} onClick={() => setPasswordVisible(value => !value)}><FluxIcon name={passwordVisible ? 'eye-slash' : 'eye'} size={18} /></button> : iconTrailing ? <FluxIcon className={formStyles.formInputIconTrailing} name={iconTrailing} size={18} /> : null}
        {isLoading && <FluxSpinner className={formStyles.formInputIconTrailing} size={18} />}
    </div>;
});

export interface FluxFormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string | boolean;
    isCondensed?: boolean;
    isReadonly?: boolean;
    isSecondary?: boolean;
    onValueChange?: (value: string) => void;
}

export const FluxFormTextArea = forwardRef<HTMLTextAreaElement, FluxFormTextAreaProps>(function FluxFormTextArea({className, disabled, error, isCondensed, isReadonly, isSecondary, onChange, onValueChange, readOnly, rows = 3, style, ...props}, ref) {
    const field = useContext(FieldContext);
    const scopedDisabled = useFluxDisabled(disabled);
    return <textarea
        {...props}
        ref={ref}
        className={clsx(scopedDisabled ? formStyles.formTextAreaDisabled : formStyles.formTextAreaEnabled, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, (error || field?.error) && formStyles.isInvalid, className)}
        id={props.id ?? field?.id}
        disabled={scopedDisabled}
        readOnly={isReadonly ?? readOnly}
        rows={rows}
        style={{...style, '--rows': rows} as FluxStyle}
        aria-describedby={props['aria-describedby'] ?? field?.describedBy}
        aria-disabled={scopedDisabled || undefined}
        aria-readonly={(isReadonly ?? readOnly) || undefined}
        aria-invalid={Boolean(error || field?.error) || undefined}
        onChange={event => {onChange?.(event); onValueChange?.(event.target.value);}}
    />;
});

export interface FluxFormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'type'> {
    checked?: boolean | null;
    error?: string | boolean;
    isReadonly?: boolean;
    label?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    subLabel?: ReactNode;
}

export const FluxFormCheckbox = forwardRef<HTMLInputElement, FluxFormCheckboxProps>(function FluxFormCheckbox({checked = false, className, disabled, error, isReadonly, label, onCheckedChange, subLabel, ...props}, forwardedRef) {
    const field = useContext(FieldContext);
    const scopedDisabled = useFluxDisabled(disabled);
    const localRef = useRef<HTMLInputElement | null>(null);
    const setRef = (node: HTMLInputElement | null) => {
        localRef.current = node;
        if (node) node.indeterminate = checked === null;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
    };

    return <label className={clsx(formStyles.formCheckbox, scopedDisabled && formStyles.isDisabled, isReadonly && formStyles.isReadonly, (error || field?.error) && formStyles.isInvalid, className)}>
        <input
            {...props}
            ref={setRef}
            type="checkbox"
            className={formStyles.formCheckboxNative}
            id={props.id ?? field?.id}
            checked={checked === true}
            disabled={scopedDisabled}
            aria-describedby={props['aria-describedby'] ?? field?.describedBy}
            aria-readonly={isReadonly || undefined}
            aria-invalid={Boolean(error || field?.error) || undefined}
            onClick={event => {if (isReadonly) event.preventDefault(); props.onClick?.(event);}}
            onChange={event => {if (!isReadonly && !scopedDisabled) onCheckedChange?.(event.target.checked);}}
        />
        <span aria-hidden="true" className={formStyles.formCheckboxElement}><FluxIcon name={checked === null ? 'minus' : 'check'} size={12} /></span>
        {(label || subLabel) && <span className={formStyles.formCheckboxText}>{label && <span className={formStyles.formCheckboxLabel}>{label}</span>}{subLabel && <span className={formStyles.formCheckboxSubLabel}>{subLabel}</span>}</span>}
    </label>;
});

export interface FluxToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'type'> {
    checked?: boolean;
    error?: string | boolean;
    iconOff?: FluxIconName;
    iconOn?: FluxIconName;
    isReadonly?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export function FluxToggle({checked = false, className, disabled, error, iconOff, iconOn, isReadonly, onCheckedChange, ...props}: FluxToggleProps) {
    const field = useContext(FieldContext);
    const scopedDisabled = useFluxDisabled(disabled);
    return <label className={clsx(formStyles.formToggle, checked && formStyles.isChecked, scopedDisabled && formStyles.isDisabled, isReadonly && formStyles.isReadonly, (error || field?.error) && formStyles.isInvalid, className)}>
        {iconOff && <FluxIcon className={formStyles.formToggleIconOff} name={iconOff} size={14} />}
        {iconOn && <FluxIcon className={formStyles.formToggleIconOn} name={iconOn} size={14} />}
        <input
            {...props}
            className={formStyles.formToggleInput}
            id={props.id ?? field?.id}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={scopedDisabled}
            readOnly={isReadonly}
            aria-checked={checked}
            aria-describedby={props['aria-describedby'] ?? field?.describedBy}
            aria-invalid={Boolean(error || field?.error) || undefined}
            onClick={event => {if (isReadonly) event.preventDefault(); props.onClick?.(event);}}
            onChange={event => {if (!isReadonly && !scopedDisabled) onCheckedChange?.(event.target.checked);}}
        />
    </label>;
}

export function FluxForm(props: FormHTMLAttributes<HTMLFormElement>) {
    return <form {...props} className={clsx(formStyles.form, props.className)} />;
}

export function FluxFormRow(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(formStyles.formRow, props.className)} />;
}

export function FluxFormColumn(props: HTMLAttributes<HTMLDivElement>) {
    return <div {...props} className={clsx(formStyles.formColumn, props.className)} />;
}

export function FluxFormGrid({columns = 2, style, ...props}: HTMLAttributes<HTMLDivElement> & {columns?: number}) {
    return <div {...props} className={clsx(formStyles.formGrid, props.className)} style={{...style, '--columns': Math.max(1, Math.floor(columns))} as FluxStyle} />;
}

export function FluxFormSection({children, className, headingLevel = 3, title, ...props}: HTMLAttributes<HTMLDivElement> & {headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; title: ReactNode}) {
    const titleId = useId();
    const Heading = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;
    return <div {...props} className={clsx(formStyles.formSection, className)} role="group" aria-labelledby={titleId}><Heading id={titleId} className={formStyles.formSectionTitle}>{title}</Heading>{children}</div>;
}

export function FluxFormFieldset(props: FieldsetHTMLAttributes<HTMLFieldSetElement>) {
    return <fieldset {...props} className={clsx(formStyles.form, props.className)} />;
}
