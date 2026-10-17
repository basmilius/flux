import {clsx} from 'clsx';
import {useId, useState} from 'react';
import {createPortal} from 'react-dom';
import type {HTMLAttributes, KeyboardEvent} from 'react';
import type {FluxColor, FluxIconName, FluxStyle} from '../types';
import {FluxTag} from './Display';
import {useFluxDisabled} from './DisplayExtended';
import {useFluxFormField} from './Forms';
import {FluxMenu, FluxMenuItem} from './Menus';
import {FluxFadeTransition} from './Transitions';
import {useDropdownPopup} from './dropdown';
import styles from '~flux/components/css/component/Form.module.scss';

export interface FluxTagsSuggestion {icon?: FluxIconName; label: string; value?: string | number | boolean | null}
export interface FluxFormTagsInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    allowDuplicates?: boolean;
    defaultValue?: string[];
    delimiters?: string[];
    disabled?: boolean;
    error?: string | boolean;
    isCondensed?: boolean;
    isReadonly?: boolean;
    isSecondary?: boolean;
    max?: number;
    name?: string;
    onAdd?: (value: string) => void;
    onRemove?: (value: string) => void;
    onSearchQueryChange?: (value: string) => void;
    onValueChange?: (value: string[]) => void;
    placeholder?: string;
    searchQuery?: string;
    suggestions?: FluxTagsSuggestion[];
    tagColor?: FluxColor;
    validate?: (value: string) => boolean;
    value?: string[];
}

export function FluxFormTagsInput({allowDuplicates, className, defaultValue = [], delimiters = ['Enter', ','], disabled, error, isCondensed, isReadonly, isSecondary, max, name, onAdd, onRemove, onSearchQueryChange, onValueChange, placeholder, searchQuery, suggestions = [], tagColor, validate, value, ...props}: FluxFormTagsInputProps) {
    const scopedDisabled = useFluxDisabled(disabled);
    const field = useFluxFormField();
    const popupId = useId();
    const {anchor, search: input, setPopup, open, setOpen, position} = useDropdownPopup(scopedDisabled, isReadonly);
    const [inner, setInner] = useState(defaultValue);
    const [localQuery, setLocalQuery] = useState('');
    const [highlighted, setHighlighted] = useState(-1);
    const tags = value ?? inner;
    const query = searchQuery ?? localQuery;
    const filtered = suggestions.filter(option => !tags.includes(option.label) && !(option.value != null && tags.includes(String(option.value))) && option.label.toLowerCase().includes(query.trim().toLowerCase()));
    const setQuery = (next: string) => {setLocalQuery(next); onSearchQueryChange?.(next);};
    const update = (next: string[]) => {if (value === undefined) setInner(next); onValueChange?.(next);};
    const add = (raw: string, current = tags) => {
        const item = raw.trim();
        if (scopedDisabled || isReadonly || !item || (max !== undefined && current.length >= max)) return current;
        if (!allowDuplicates && current.includes(item)) {setQuery(''); return current;}
        if (validate && !validate(item)) return current;
        const next = [...current, item];
        update(next);
        onAdd?.(item);
        setQuery(''); setHighlighted(-1); setOpen(false);
        return next;
    };
    const remove = (index: number) => {
        if (scopedDisabled || isReadonly) return;
        update(tags.filter((_, i) => i !== index));
        onRemove?.(tags[index]);
    };
    const addSuggestion = (option: FluxTagsSuggestion) => {add(String(option.value ?? option.label)); input.current?.focus();};
    const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (scopedDisabled || isReadonly) return;
        if (event.key === 'Escape' && open) {event.preventDefault(); setOpen(false);}
        else if (open && (event.key === 'ArrowDown' || event.key === 'ArrowUp') && filtered.length) {
            event.preventDefault();
            setHighlighted(index => event.key === 'ArrowDown' ? (index + 1) % filtered.length : index <= 0 ? filtered.length - 1 : index - 1);
        } else if (event.key === 'Enter' && open && highlighted >= 0 && filtered[highlighted]) {event.preventDefault(); addSuggestion(filtered[highlighted]);}
        else if (delimiters.includes(event.key)) {event.preventDefault(); add(query);}
        else if (event.key === 'Backspace' && !query && tags.length) remove(tags.length - 1);
    };
    return <>
        <div {...props} ref={anchor} id={props.id ?? field?.id} className={clsx(scopedDisabled ? styles.formTagsInputDisabled : styles.formTagsInputEnabled, isCondensed && styles.isCondensed, isSecondary && styles.isSecondary, (error || field?.error) && styles.isInvalid, className)} role="group" onClick={() => input.current?.focus()}>
            {tags.map((tag, index) => <FluxTag key={`${tag}-${index}`} color={tagColor} dot={Boolean(tagColor)} label={tag} isDeletable={!scopedDisabled && !isReadonly} onDelete={() => remove(index)} />)}
            <input ref={input} className={styles.formTagsInputField} name={name} autoComplete="off" disabled={scopedDisabled} placeholder={!tags.length ? placeholder : undefined} readOnly={isReadonly} role="combobox" type="text" aria-expanded={open} aria-haspopup="menu" aria-controls={open ? popupId : undefined} aria-activedescendant={open && highlighted >= 0 ? `${popupId}-option-${highlighted}` : undefined} aria-describedby={field?.describedBy} value={query} onChange={event => {
                const next = event.currentTarget.value;
                setQuery(next); setHighlighted(-1);
                setOpen(Boolean(next.trim() && suggestions.some(option => !tags.includes(option.label) && !(option.value != null && tags.includes(String(option.value))) && option.label.toLowerCase().includes(next.trim().toLowerCase()))));
            }} onKeyDown={keyDown} onPaste={event => {
                let parts = [event.clipboardData.getData('text')];
                for (const separator of [...delimiters.filter(value => value !== 'Enter'), '\n']) parts = parts.flatMap(part => part.split(separator));
                parts = parts.map(part => part.trim()).filter(Boolean);
                if (parts.length > 1) {event.preventDefault(); parts.reduce((current, part) => add(part, current), tags);}
            }} />
        </div>
        {typeof document !== 'undefined' && createPortal(<FluxFadeTransition show={open && filtered.length > 0}><div ref={setPopup} id={popupId} className={styles.formTagsInputPopup} style={{'--x': `${position.x}px`, '--y': `${position.y}px`, '--width': `${position.width}px`} as FluxStyle}>
            <FluxMenu>{filtered.map((option, index) => <FluxMenuItem key={String(option.value ?? index)} id={`${popupId}-option-${index}`} iconLeading={option.icon} isHighlighted={highlighted === index} label={option.label} onClick={() => addSuggestion(option)} />)}</FluxMenu>
        </div></FluxFadeTransition>, document.body)}
    </>;
}
