import {useFluxTranslate} from '../i18n';
import {useDropdownPopup} from './dropdown';
import {FluxFormInputGroup} from './AdvancedForms';
import {FluxFlex} from './Layout';
import {FluxDatePicker} from './CalendarFilters';
import {FluxFlyout} from './Overlays';
import {clsx} from 'clsx';
import {DateTime} from 'luxon';
import {createPortal} from 'react-dom';
import {Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useLayoutEffect, useId, useMemo, useRef, useState} from 'react';
import type {HTMLAttributes, InputHTMLAttributes, KeyboardEvent, ReactElement, ReactNode} from 'react';
import type {FluxColor, FluxDirection, FluxIconName, FluxStyle} from '../types';
import {FluxPrimaryButton, FluxSecondaryButton} from './Actions';
import {useFluxDisabled} from './DisplayExtended';
import {FluxFormInput, useFluxFormField} from './Forms';
import {FluxIcon} from './Icon';
import {FluxTag} from './Display';
import {FluxSpinner} from './Feedback';
import {FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader} from './Menus';
import {FluxFadeTransition} from './Transitions';
import formStyles from '../../../components/src/css/component/Form.module.scss';
import faderStyles from '../../../components/src/css/component/Fader.module.scss';
import repeaterStyles from '../../../components/src/css/component/FormRepeater.module.scss';

function snapValue(value: number, min: number, step: number) {if (step <= 0) return value; const places=(String(step).split('.')[1]??'').length; const next=min+Math.round((value-min)/step)*step; return places?Number(next.toFixed(places)):next;}

export type FluxFormSelectValueSingle = string | number | null;
export type FluxFormSelectValue = FluxFormSelectValueSingle | FluxFormSelectValueSingle[];
export interface FluxFormSelectOption {command?: string; commandIcon?: FluxIconName; imageSrc?: string; imageAlt?: string; disabled?: boolean; icon?: FluxIconName; label: string; value: FluxFormSelectValueSingle}
export interface FluxFormSelectGroup {icon?: FluxIconName; label?: string; options?: FluxFormSelectOption[]; value?: never}
export type FluxFormSelectEntry = FluxFormSelectOption | FluxFormSelectGroup;

function isGroup(entry: FluxFormSelectEntry): entry is FluxFormSelectGroup {return !('value' in entry);}
function flattenOptions(entries: FluxFormSelectEntry[]): FluxFormSelectOption[] {return entries.flatMap(entry => isGroup(entry) ? entry.options ?? [] : [entry]);}
function optionGroups(entries: FluxFormSelectEntry[]) {
    const groups: {label?: string; icon?: FluxIconName; options: FluxFormSelectOption[]}[] = [];
    let current: typeof groups[number] | undefined;
    for (const entry of entries) {
        if (isGroup(entry)) {current = {label: entry.label, icon: entry.icon, options: [...entry.options ?? []]}; groups.push(current);}
        else {
            if (!current) {current = {options: []}; groups.push(current);}
            current.options.push(entry);
        }
    }
    return groups;
}
function valueKey(value: FluxFormSelectValueSingle) {return `${typeof value}:${value}`;}

export interface FluxFormSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    autoFocus?: boolean; defaultValue?: FluxFormSelectValue; disabled?: boolean; error?: string | boolean; isCondensed?: boolean; isLoading?: boolean;
    isCreatable?: boolean; isMultiple?: boolean; isReadonly?: boolean; isSearchable?: boolean; isSecondary?: boolean; name?: string; onSearchQueryChange?: (value: string) => void;
    onPopupOpen?: () => void; filterOptions?: boolean; onValueChange?: (value: FluxFormSelectValue) => void; options: FluxFormSelectEntry[]; selectedOptions?: FluxFormSelectEntry[]; placeholder?: string; searchQuery?: string; value?: FluxFormSelectValue;
}

export function FluxFormSelect({autoFocus, className, defaultValue, disabled, error, isCondensed, isCreatable, isLoading, isMultiple, isReadonly, isSearchable, isSecondary, name, onKeyDown, onSearchQueryChange, onValueChange, onPopupOpen, filterOptions = true, options, selectedOptions: optionSelection = [], placeholder, searchQuery, value, 'aria-label': ariaLabel, ...props}: FluxFormSelectProps) {
    const translate = useFluxTranslate();
    const field = useFluxFormField();
    const scopedDisabled = useFluxDisabled(disabled);
    const id = useId();
    const popupId = `${id}-popup`;
    const {anchor, search, popup, setPopup, open, setOpen, position} = useDropdownPopup(scopedDisabled, isReadonly, autoFocus);
    const [inner, setInner] = useState<FluxFormSelectValue>(defaultValue ?? (isMultiple ? [] : null));
    const [created, setCreated] = useState<FluxFormSelectOption[]>([]);
    const [localSearch, setLocalSearch] = useState('');
    const [highlight, setHighlight] = useState(-1);
    const [keyboardAction, setKeyboardAction] = useState(false);
    const current = value !== undefined ? value : inner;
    const query = searchQuery ?? localSearch;
    const allOptions = flattenOptions([...options, ...created, ...optionSelection]);
    const selected = Array.isArray(current) ? current : [current];
    const selectedOptions = selected.map(value => allOptions.find(option => option.value === value)).filter((option): option is FluxFormSelectOption => Boolean(option));
    const visible = optionGroups([...options, ...created]).map(group => ({...group, options: group.options.filter(option => (!filterOptions || option.label.toLowerCase().includes(query.trim().toLowerCase())) && (!isMultiple || !selected.includes(option.value)))})).filter(group => group.options.length);
    const enabled = visible.flatMap(group => group.options).filter(option => !option.disabled);
    const canCreate = Boolean(isCreatable && query.trim() && !allOptions.some(option => option.label.toLowerCase() === query.trim().toLowerCase()));
    const setQuery = (next: string) => {setLocalSearch(next); onSearchQueryChange?.(next); setHighlight(-1);};
    const update = (next: FluxFormSelectValue) => {if (value === undefined) setInner(next); onValueChange?.(next);};
    const close = () => {setOpen(false); anchor.current?.focus();};
    const select = (option: FluxFormSelectOption) => {
        if (scopedDisabled || isReadonly || option.disabled) return;
        update(isMultiple ? selected.includes(option.value) ? selected.filter(item => item !== option.value) : [...selected, option.value] : option.value);
        setQuery('');
        if (!isMultiple) close();
    };
    const create = () => {
        const option = {label: query.trim(), value: query.trim()};
        setCreated(items => [...items, option]);
        select(option);
    };
    const callbacks = useRef({onPopupOpen});
    callbacks.current = {onPopupOpen};
    useEffect(() => {
        setHighlight(-1);
        if (open) callbacks.current.onPopupOpen?.();
    }, [open]);
    useLayoutEffect(() => {
        if (!open) return;
        const index = highlight >= 0 ? highlight : isMultiple ? -1 : enabled.findIndex(option => selected.includes(option.value));
        popup?.querySelector<HTMLElement>(`[data-option-index="${index}"]`)?.scrollIntoView?.({block: 'center'});
    }, [open, highlight, popup]);
    const keyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (scopedDisabled || isReadonly) return;
        if (!open) {if (event.key === 'Enter') {event.preventDefault(); setOpen(true);} return;}
        setKeyboardAction(true);
        if (event.key === 'Escape' || event.key === 'Tab') {if (event.key === 'Escape') {event.preventDefault(); close();} else setOpen(false); return;}
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            setHighlight(index => {
                const current = index === -1 ? enabled.findIndex(option => selected.includes(option.value)) : index;
                return event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : event.key === 'ArrowUp' ? Math.max(0, current - 1) : Math.min(enabled.length - 1, current + 1);
            });
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (enabled[highlight]) select(enabled[highlight]);
            else if (canCreate) create();
        } else if (event.key === 'Backspace' && !query && isMultiple) {
            event.preventDefault(); update(selected.slice(0, -1));
        } else if (!isSearchable && event.key.length === 1 && !event.metaKey && !event.ctrlKey) setHighlight(enabled.findIndex(option => option.label.toLowerCase().startsWith(event.key.toLowerCase())));
    };
    const optionNode = (option: FluxFormSelectOption) => {
        const index = enabled.indexOf(option);
        return <FluxMenuItem key={valueKey(option.value)} id={`${id}-option-${index}`} data-option-index={index} command={option.command} commandIcon={option.commandIcon} imageSrc={option.imageSrc} imageAlt={option.imageAlt} iconLeading={option.icon} disabled={option.disabled} isActive={selected.includes(option.value)} isHighlighted={index === highlight} label={option.label} role="option" aria-selected={selected.includes(option.value)} tabIndex={-1} onMouseDown={event => event.preventDefault()} onClick={() => select(option)} />;
    };
    return <>
        <div {...props} ref={anchor} id={field?.id ?? props.id} className={clsx(formStyles.formSelect, scopedDisabled && formStyles.isDisabled, open && formStyles.isFocused, isSearchable && formStyles.isSearchable, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, (error || field?.error) && formStyles.isInvalid, className)} role="combobox" tabIndex={scopedDisabled ? -1 : 0} aria-label={ariaLabel} aria-controls={open ? popupId : undefined} aria-activedescendant={open && enabled[highlight] ? `${id}-option-${highlight}` : undefined} aria-expanded={open} aria-haspopup="listbox" aria-readonly={isReadonly || undefined} aria-disabled={scopedDisabled || undefined} aria-describedby={field?.describedBy} aria-invalid={Boolean(error || field?.error) || undefined} aria-busy={isLoading || undefined} onClick={() => {if (!scopedDisabled && !isReadonly) setOpen(!open);}} onKeyUp={() => setKeyboardAction(false)} onKeyDown={event => {onKeyDown?.(event); if (!event.defaultPrevented) keyDown(event);}}>
            {selectedOptions.length ? isMultiple ? selectedOptions.map(option => <FluxTag key={valueKey(option.value)} label={option.label} isDeletable={!scopedDisabled && !isReadonly} onDelete={() => update(selected.filter(item => item !== option.value))} />) : <FluxMenuItem className={formStyles.formSelectSelected} label={selectedOptions[0].label} iconLeading={selectedOptions[0].icon} imageSrc={selectedOptions[0].imageSrc} imageAlt={selectedOptions[0].imageAlt} command={selectedOptions[0].command} commandIcon={selectedOptions[0].commandIcon} tabIndex={-1} aria-hidden="true" /> : <span className={formStyles.formSelectPlaceholder}>{placeholder}</span>}
            {isLoading ? <FluxSpinner className={formStyles.formSelectIcon} size={15} /> : <FluxIcon className={formStyles.formSelectIcon} name="angles-up-down" size={15} />}
            {name && selected.map((item, index) => <input key={index} type="hidden" name={name} value={item ?? ''} disabled={scopedDisabled} />)}
        </div>
        {typeof document !== 'undefined' && createPortal(<FluxFadeTransition show={open && !scopedDisabled}><div ref={setPopup} id={popupId} className={clsx(formStyles.formSelectPopup, keyboardAction && formStyles.isKeyboardAction, isSearchable && formStyles.isSearchable)} style={{'--x': `${position.x}px`, '--y': `${position.y}px`, '--width': `${position.width}px`} as FluxStyle}>
            {isSearchable && <div className={formStyles.formSelectSearch}><FluxFormInput ref={search} isSecondary type="search" iconLeading="magnifying-glass" autoComplete="off" aria-label={ariaLabel ? `${ariaLabel} search` : 'Search options'} aria-controls={popupId} aria-activedescendant={enabled[highlight] ? `${id}-option-${highlight}` : undefined} placeholder={translate('flux.search')} value={query} onValueChange={next => setQuery(String(next ?? ''))} onKeyDown={keyDown} /></div>}
            <FluxMenu role="listbox" aria-multiselectable={isMultiple || undefined} aria-label={ariaLabel}>
                {canCreate && <FluxMenuItem iconLeading="plus" label={translate('flux.createOption', {value: query.trim()})} onClick={create} />}
                {!visible.length && !canCreate && !isLoading && <FluxMenuSubHeader label={translate('flux.noItems')} />}
                {visible.map((group, index) => <FluxMenuGroup key={index}>{group.label && <FluxMenuSubHeader iconLeading={group.icon} label={group.label}/>} {group.options.map(optionNode)}</FluxMenuGroup>)}
            </FluxMenu>
        </div></FluxFadeTransition>, document.body)}
    </>;
}

export interface FluxFormComboboxProps extends Omit<FluxFormSelectProps, 'isSearchable'> {isCreatable?: boolean}
export function FluxFormCombobox(props: FluxFormComboboxProps) {return <FluxFormSelect {...props} isSearchable />;}

export interface FluxFormSelectAsyncProps extends Omit<FluxFormSelectProps, 'isSearchable' | 'options'> {fetchOptions(ids: FluxFormSelectValueSingle[]): Promise<FluxFormSelectEntry[]>; fetchRelevant(): Promise<FluxFormSelectEntry[]>; fetchSearch(query: string): Promise<FluxFormSelectEntry[]>}
export function FluxFormSelectAsync({fetchOptions, fetchRelevant, fetchSearch, searchQuery, value, defaultValue, onValueChange, ...props}: FluxFormSelectAsyncProps) {
    const [inner, setInner] = useState<FluxFormSelectValue>(defaultValue ?? (props.isMultiple ? [] : null));
    const current = value === undefined ? inner : value;
    const [selectedOptions, setSelectedOptions] = useState<FluxFormSelectEntry[]>([]);
    const [visibleOptions, setVisibleOptions] = useState<FluxFormSelectEntry[]>([]);
    const [localQuery, setLocalQuery] = useState('');
    const query = searchQuery ?? localQuery;
    const [loadingSelected, setLoadingSelected] = useState(false);
    const [loadingVisible, setLoadingVisible] = useState(false);
    const generation = useRef(0);
    const callbacks = useRef({fetchOptions, fetchRelevant, fetchSearch});
    callbacks.current = {fetchOptions, fetchRelevant, fetchSearch};
    const selectedKey = JSON.stringify((Array.isArray(current) ? current : [current]).filter(value => value !== null));
    useEffect(() => {
        let active = true;
        const ids: FluxFormSelectValueSingle[] = JSON.parse(selectedKey);
        if (!ids.length) {setSelectedOptions([]); setLoadingSelected(false); return;}
        setLoadingSelected(true);
        callbacks.current.fetchOptions(ids).then(options => {if (active) setSelectedOptions(options);}).catch(() => {if (active) setSelectedOptions([]);}).finally(() => {if (active) setLoadingSelected(false);});
        return () => {active = false;};
    }, [selectedKey]);
    const load = async (term: string) => {
        const id = ++generation.current;
        setLoadingVisible(true);
        try {
            const options = await (term.trim() ? callbacks.current.fetchSearch(term) : callbacks.current.fetchRelevant());
            if (id === generation.current) setVisibleOptions(options);
        } catch {if (id === generation.current) setVisibleOptions([]);}
        finally {if (id === generation.current) setLoadingVisible(false);}
    };
    const previousQuery = useRef(query);
    useEffect(() => {
        if (previousQuery.current === query) return;
        previousQuery.current = query;
        ++generation.current;
        const timer = setTimeout(() => void load(query), 300);
        return () => clearTimeout(timer);
    }, [query]);
    useEffect(() => () => {++generation.current;}, []);
    return <FluxFormSelect {...props} defaultValue={defaultValue} value={current} options={visibleOptions} selectedOptions={selectedOptions} filterOptions={false} isSearchable isLoading={props.isLoading || loadingSelected || loadingVisible} searchQuery={query} onPopupOpen={() => void load(query)} onValueChange={next => {if (value === undefined) setInner(next); onValueChange?.(next);}} onSearchQueryChange={next => {setLocalQuery(next); props.onSearchQueryChange?.(next);}}/>;
}

export interface FluxDateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'max' | 'min' | 'onChange' | 'type' | 'value'> {defaultValue?: DateTime | null; error?: string | boolean; isCondensed?: boolean; isLoading?: boolean; isReadonly?: boolean; isSecondary?: boolean; max?: DateTime; min?: DateTime; onValueChange?: (value: DateTime | null) => void; value?: DateTime | null}
export function FluxFormDateInput({className, defaultValue = null, disabled, isReadonly, max, min, onValueChange, value, ...props}: FluxDateInputProps) {
    const controlled = value !== undefined;
    const [inner, setInner] = useState(defaultValue);
    const current = controlled ? value : inner;
    const isDisabled = useFluxDisabled(disabled);
    const set = (next: DateTime | null) => {
        if (!controlled) setInner(next);
        onValueChange?.(next);
    };
    return <FluxFormInputGroup className={className}>
        <FluxFormInput {...props} className={formStyles.formDateInput} disabled={isDisabled} isReadonly={isReadonly} type="date" min={min?.toISODate() ?? undefined} max={max?.toISODate() ?? undefined} value={current?.toISODate() ?? ''} onChange={event => set(event.currentTarget.value ? DateTime.fromISO(event.currentTarget.value).startOf('day') : null)} />
        <FluxFlyout width={300} opener={({open}) => <FluxSecondaryButton className={formStyles.formDateInputButton} disabled={isDisabled || isReadonly} iconLeading="calendar" aria-label="Choose date" onClick={open} />}>
            {({close}) => <FluxDatePicker value={current} min={min} max={max} onValueChange={date => {if (!Array.isArray(date)) {set(date); close();}}} />}
        </FluxFlyout>
    </FluxFormInputGroup>;
}
export interface FluxFormDateRangeInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    defaultValue?: [DateTime, DateTime] | null;
    disabled?: boolean;
    error?: string | boolean;
    isCondensed?: boolean;
    isLoading?: boolean;
    name?: string;
    isReadonly?: boolean;
    isSecondary?: boolean;
    max?: DateTime;
    min?: DateTime;
    onValueChange?: (value: [DateTime, DateTime] | null) => void;
    placeholder?: string;
    rangeMode?: 'range' | 'week' | 'month';
    value?: [DateTime, DateTime] | null;
}
export function FluxFormDateRangeInput({className, defaultValue = null, disabled, error, isCondensed, isLoading: _isLoading, isReadonly, isSecondary, max, min, name, onValueChange, placeholder, rangeMode = 'range', value, ...props}: FluxFormDateRangeInputProps) {
    const [inner, setInner] = useState(defaultValue);
    const current = value === undefined ? inner : value;
    const scopedDisabled = useFluxDisabled(disabled);
    let label = '';
    if (current) {
        const [start, end] = current;
        const endLabel = end.toLocaleString({day: 'numeric', month: 'short', year: 'numeric'});
        const startLabel = start.toLocaleString({day: 'numeric', month: start.hasSame(end, 'month') ? undefined : 'short', year: start.hasSame(end, 'year') ? undefined : 'numeric'});
        label = start.hasSame(end, 'day') ? endLabel : `${startLabel} – ${endLabel}`;
    }
    return <FluxFlyout width={300} opener={({open}) => <FluxFormInputGroup {...props} className={className} aria-disabled={scopedDisabled || undefined} aria-readonly={isReadonly || undefined} aria-invalid={Boolean(error) || undefined}>
        <div className={clsx(formStyles.formDateRangeInput, scopedDisabled && formStyles.isDisabled, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, error && formStyles.isInvalid)} role="presentation">
            {label ? <span>{label}</span> : placeholder && <span className={formStyles.formSelectPlaceholder}>{placeholder}</span>}
        </div>
        {name && <input type="hidden" name={name} value={current?.map(date => date.toISODate()).join('/') ?? ''} disabled={scopedDisabled} />}
        <FluxSecondaryButton disabled={scopedDisabled || isReadonly} iconLeading="calendar" aria-label="Choose date range" onClick={open} />
    </FluxFormInputGroup>}>
        {({close}) => <FluxDatePicker value={current} min={min} max={max} rangeMode={rangeMode} onValueChange={next => {
            if (!Array.isArray(next) || next.length !== 2) return;
            const range: [DateTime, DateTime] = [next[0], next[1]];
            if (value === undefined) setInner(range);
            onValueChange?.(range);
            close();
        }} />}
    </FluxFlyout>;
}

export function FluxFormDateTimeInput({className, defaultValue = null, disabled, isHourOnly, isReadonly, name, onValueChange, value, ...props}: FluxDateInputProps & {isHourOnly?: boolean}) {
    const [inner, setInner] = useState(defaultValue);
    const current = value === undefined ? inner : value;
    const set = (next: DateTime | null) => {if (value === undefined) setInner(next); onValueChange?.(next);};
    const base = () => current ?? DateTime.now().startOf('day');
    const scopedDisabled = useFluxDisabled(disabled);
    return <FluxFlex className={clsx(formStyles.formDateTimeInput, className)} gap={15} aria-disabled={scopedDisabled || undefined}>
        <FluxFormDateInput {...props} disabled={scopedDisabled} isReadonly={isReadonly} name={name} value={current} onValueChange={date => set(date ? base().set({year: date.year, month: date.month, day: date.day}) : null)} />
        <FluxFormInput className={formStyles.formTimeInput} disabled={scopedDisabled} error={props.error} isCondensed={props.isCondensed} isReadonly={isReadonly} isSecondary={props.isSecondary} name={name ? `${name}-time` : undefined} type="time" step={isHourOnly ? 3600 : 60} value={current?.toFormat(isHourOnly ? 'HH:00' : 'HH:mm') ?? ''} onChange={event => {
            if (!event.currentTarget.value) return set(null);
            const [hour, minute] = event.currentTarget.value.split(':').map(Number);
            set(base().set({hour, minute: isHourOnly ? 0 : minute, second: 0, millisecond: 0}));
        }} />
    </FluxFlex>;
}

export {FluxFormFader, FluxFormRangeFader} from './Faders';
export type {FluxFormFaderProps} from './Faders';


interface CarouselContextValue {current: number; ids: string[]; register(id: string): () => void;}
const CarouselContext = createContext<CarouselContextValue | null>(null);
export interface FluxFaderState {current: number; next(): void; previous(): void;}
export function FluxFader({autoplay = true, children, className, interval = 9000, isPaused, onMouseEnter, onMouseLeave, onUpdate, pauseOnHover = true, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {autoplay?: boolean; children?: ReactNode | ((state: FluxFaderState) => ReactNode); interval?: number; isPaused?: boolean; onUpdate?: (value: number) => void; pauseOnHover?: boolean}) {
    const [ids, setIds] = useState<string[]>([]);
    const [current, setCurrent] = useState(0);
    const [hovering, setHovering] = useState(false);
    const previous = useRef(current);
    const count = ids.length;
    const register = useCallback((id: string) => {
        setIds(items => items.includes(id) ? items : [...items, id]);
        return () => {setIds(items => items.filter(item => item !== id));};
    }, []);
    const advance = useCallback((direction: number) => {if (count) setCurrent(value => (value + direction + count) % count);}, [count]);
    useEffect(() => {setCurrent(value => Math.min(value, Math.max(0, count - 1)));}, [count]);
    useEffect(() => {
        if (previous.current === current) return;
        previous.current = current;
        onUpdate?.(current);
    }, [current, onUpdate]);
    useEffect(() => {
        if (!autoplay || isPaused || (pauseOnHover && hovering) || count < 2) return;
        const timer = setInterval(() => advance(1), interval);
        return () => clearInterval(timer);
    }, [advance, autoplay, count, hovering, interval, isPaused, pauseOnHover]);
    return <CarouselContext.Provider value={{current, ids, register}}><div {...props} className={clsx(faderStyles.fader, className)} role="group" aria-roledescription="carousel" onMouseEnter={event => {setHovering(true); onMouseEnter?.(event);}} onMouseLeave={event => {setHovering(false); onMouseLeave?.(event);}}>
        {typeof children === 'function' ? children({current, next: () => advance(1), previous: () => advance(-1)}) : children}
    </div></CarouselContext.Provider>;
}
export function FluxFaderItem({className, index: _index, ...props}: HTMLAttributes<HTMLDivElement> & {index?: number}) {
    const id = useId();
    const fader = useContext(CarouselContext);
    const register = fader?.register;
    useLayoutEffect(() => register?.(id), [register, id]);
    const current = fader ? fader.ids.indexOf(id) === fader.current : true;
    return <div {...props} className={clsx(faderStyles.faderItem, current && faderStyles.isCurrent, className)} role="group" aria-roledescription="slide" aria-hidden={!current || undefined} />;
}

export {FluxFormRepeater, type FluxFormRepeaterProps} from './Repeater';
