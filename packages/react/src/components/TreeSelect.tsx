import {clsx} from 'clsx';
import {useEffect, useId, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import type {HTMLAttributes, KeyboardEvent} from 'react';
import type {FluxColor, FluxStyle} from '../types';
import {useFluxTranslate} from '../i18n';
import {FluxFormCheckbox, FluxFormInput, useFluxFormField} from './Forms';
import {FluxFormRadio, RadioContext} from './AdvancedForms';
import {ItemControlContext} from './Composition';
import {FluxTag} from './Display';
import {useFluxDisabled} from './DisplayExtended';
import {FluxSpinner} from './Feedback';
import {FluxIcon} from './Icon';
import {FluxMenuItem} from './Menus';
import {FluxFadeTransition} from './Transitions';
import {useDropdownPopup} from './dropdown';
import {flattenTree, seededExpansion, TreeNode} from './TreesKanban';
import type {FluxTreeViewOption} from './TreesKanban';
import formStyles from '~flux/components/css/component/Form.module.scss';
import styles from '~flux/components/css/component/TreeViewSelect.module.scss';

export interface FluxFormTreeViewSelectOption extends FluxTreeViewOption {
    selectable?: boolean;
    children?: FluxFormTreeViewSelectOption[];
}
export type FluxFormTreeViewSelectValue = string | number | null | Array<string | number | null>;
export interface FluxFormTreeViewSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
    autoFocus?: boolean;
    defaultValue?: FluxFormTreeViewSelectValue;
    disabled?: boolean;
    error?: string | boolean;
    expandedDepth?: number;
    isCascading?: boolean;
    isCondensed?: boolean;
    isLoading?: boolean;
    isMultiple?: boolean;
    isReadonly?: boolean;
    isSearchable?: boolean;
    isSecondary?: boolean;
    levelColors?: Array<FluxColor | string>;
    name?: string;
    onValueChange?: (value: FluxFormTreeViewSelectValue) => void;
    options: FluxFormTreeViewSelectOption[];
    placeholder?: string;
    value?: FluxFormTreeViewSelectValue;
}

function searchTree(options: FluxFormTreeViewSelectOption[], query: string): FluxFormTreeViewSelectOption[] {
    return options.flatMap(option => {
        const children = searchTree(option.children ?? [], query);
        return option.label.toLowerCase().includes(query) || children.length ? [{...option, children}] : [];
    });
}

const itemControl = {isControl: true, register() {}};

export function FluxFormTreeViewSelect({autoFocus, className, defaultValue, disabled, error, expandedDepth = 1, isCascading, isCondensed, isLoading, isMultiple, isReadonly, isSearchable, isSecondary, levelColors, name, onKeyDown, onValueChange, options, placeholder, value, ...props}: FluxFormTreeViewSelectProps) {
    const id = useId();
    const field = useFluxFormField();
    const translate = useFluxTranslate();
    const scopedDisabled = useFluxDisabled(disabled);
    const {anchor, search, setPopup, open, setOpen, position, toggle} = useDropdownPopup(scopedDisabled, isReadonly, autoFocus);
    const [inner, setInner] = useState<FluxFormTreeViewSelectValue>(defaultValue ?? (isMultiple ? [] : null));
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(new Set<string | number>());
    const [highlight, setHighlight] = useState<string | number | null>(null);
    const current = value === undefined ? inner : value;
    const selected = new Set(Array.isArray(current) ? current : current == null ? [] : [current]);
    const all = flattenTree(options, expanded, true);
    const normalized = query.trim().toLowerCase();
    const nodes = normalized ? flattenTree(searchTree(options, normalized), new Set(), true) : flattenTree(options, expanded);
    const update = (next: FluxFormTreeViewSelectValue) => {if (value === undefined) setInner(next); onValueChange?.(next);};
    const expand = (nodeId: string | number) => setExpanded(old => {const next = new Set(old); next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId); return next;});
    const locked = (node: typeof nodes[number]) => Boolean(isCascading && isMultiple && node.ancestorIds.some(ancestor => selected.has(ancestor)));
    const select = (node: typeof nodes[number]) => {
        if (scopedDisabled || isReadonly || node.disabled || locked(node)) return;
        if (node.selectable !== false) {
            update(isMultiple ? selected.has(node.id) ? [...selected].filter(item => item !== node.id) : [...selected, node.id] : node.id);
            if (!isMultiple) {setOpen(false); anchor.current?.focus();}
            if (node.hasChildren) setExpanded(old => new Set(old).add(node.id));
        } else if (node.hasChildren) expand(node.id);
    };
    const deselect = (nodeId: string | number | null) => {
        if (scopedDisabled || isReadonly) return;
        update([...selected].filter(item => item !== nodeId));
        anchor.current?.focus();
    };
    useEffect(() => {
        if (!open) {setQuery(''); setHighlight(null); return;}
        const next = new Set([...expanded, ...seededExpansion(options, expandedDepth)]);
        for (const node of all) if (selected.has(node.id)) for (const ancestor of node.ancestorIds) next.add(ancestor);
        setExpanded(next);
        setHighlight(all.find(node => selected.has(node.id))?.id ?? null);
    }, [open]);
    useEffect(() => {
        if (highlight !== null) document.getElementById(`${id}-option-${highlight}`)?.scrollIntoView?.({block: 'nearest'});
    }, [highlight, open, id]);
    const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (scopedDisabled || isReadonly || event.defaultPrevented) return;
        if (!open) {
            if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); setOpen(true);}
            return;
        }
        if (event.key === 'Escape' || event.key === 'Tab') {
            setOpen(false);
            if (event.key === 'Escape') {event.preventDefault(); anchor.current?.focus();}
            return;
        }
        if (event.key === 'Backspace' && isMultiple && !query && selected.size) {deselect([...selected].at(-1)!); return;}
        if (isSearchable && event.key.length === 1 && (event.key !== ' ' || event.target === search.current)) return;
        const index = nodes.findIndex(node => node.id === highlight);
        const node = nodes[index];
        if (event.key === 'ArrowDown') setHighlight(nodes[Math.min(nodes.length - 1, index + 1)]?.id ?? null);
        else if (event.key === 'ArrowUp') setHighlight(nodes[index < 0 ? nodes.length - 1 : Math.max(0, index - 1)]?.id ?? null);
        else if (event.key === 'ArrowRight') {
            if (node?.hasChildren) {if (!expanded.has(node.id)) expand(node.id); else if (nodes[index + 1]?.depth > node.depth) setHighlight(nodes[index + 1].id);}
        } else if (event.key === 'ArrowLeft') {
            if (node?.hasChildren && expanded.has(node.id)) expand(node.id);
            else if (node?.depth) setHighlight(node.ancestorIds.at(-1) ?? null);
        } else if (event.key === 'Enter' || event.key === ' ') {if (node) select(node);}
        else if (event.key.length === 1) {
            const matches = nodes.filter(item => item.label.toLowerCase().startsWith(event.key.toLowerCase()));
            const next = matches.find(item => nodes.indexOf(item) > index) ?? matches[0];
            if (next) setHighlight(next.id);
            return;
        } else return;
        event.preventDefault();
    };
    const chosen = all.filter(node => selected.has(node.id));
    const radio = useMemo(() => ({disabled: scopedDisabled, isReadonly: true, name: id, select() {}, value: (Array.isArray(current) ? current[0] : current) ?? undefined}), [current, id, scopedDisabled]);
    return <>
        <div {...props} ref={anchor} id={props.id ?? field?.id} className={clsx(formStyles.formSelect, scopedDisabled && formStyles.isDisabled, open && formStyles.isFocused, isCondensed && formStyles.isCondensed, isSecondary && formStyles.isSecondary, (error || field?.error) && formStyles.isInvalid, className)} role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? `${id}-list` : undefined} aria-activedescendant={open && highlight !== null ? `${id}-option-${highlight}` : undefined} aria-disabled={scopedDisabled || undefined} aria-readonly={isReadonly || undefined} aria-invalid={Boolean(error || field?.error) || undefined} aria-describedby={field?.describedBy} tabIndex={scopedDisabled ? -1 : 0} onKeyDown={event => {onKeyDown?.(event); keyDown(event);}} onClick={toggle}>
            {isMultiple && chosen.length ? chosen.map(node => <FluxTag key={node.id} label={node.label} isDeletable onDelete={() => deselect(node.id)} />) : !isMultiple && chosen[0] ? <FluxMenuItem className={formStyles.formSelectSelected} label={chosen[0].label} iconLeading={chosen[0].icon} tabIndex={-1} /> : placeholder && <span className={formStyles.formSelectPlaceholder}>{placeholder}</span>}
            {isLoading ? <FluxSpinner className={formStyles.formSelectIcon} size={16} /> : <FluxIcon className={formStyles.formSelectIcon} name="angles-up-down" size={16} />}
            {name && [...selected].map((item, index) => <input key={index} type="hidden" name={name} value={item ?? ''} disabled={scopedDisabled} />)}
        </div>
        {typeof document !== 'undefined' && createPortal(<FluxFadeTransition show={open && !scopedDisabled}><div ref={setPopup} className={clsx(formStyles.formSelectPopup, isSearchable && formStyles.isSearchable)} style={{'--x': `${position.x}px`, '--y': `${position.y}px`, '--width': `${position.width}px`} as FluxStyle} onKeyDown={keyDown}>
            {isSearchable && <div className={formStyles.formSelectSearch}><FluxFormInput ref={search} autoComplete="off" isSecondary type="search" iconLeading="magnifying-glass" aria-label={translate('flux.search')} placeholder={translate('flux.search')} value={query} onValueChange={next => {setQuery(String(next)); setHighlight(null);}} /></div>}
            <ItemControlContext.Provider value={itemControl}><RadioContext.Provider value={radio}><div id={`${id}-list`} className={styles.treeViewSelectList} role="listbox" aria-multiselectable={isMultiple || undefined}>
                {!nodes.length && <div className={styles.treeViewSelectEmpty}>{translate('flux.noItems')}</div>}
                {nodes.map(node => {
                    const disabled = Boolean(node.disabled || locked(node));
                    return <div key={node.id} id={`${id}-option-${node.id}`} className={clsx(styles.treeNode, !disabled && node.selectable !== false && styles.isSelectable, !disabled && node.selectable === false && node.hasChildren && styles.isExpandable, disabled && styles.isDisabled, node.id === highlight && styles.isHighlighted)} role={node.selectable === false ? 'presentation' : 'option'} tabIndex={node.selectable === false ? undefined : -1} aria-selected={node.selectable === false ? undefined : selected.has(node.id) || locked(node)} aria-disabled={disabled || undefined} onClick={() => select(node)}>
                        <TreeNode node={node} expanded={Boolean(normalized) || expanded.has(node.id)} levelColors={levelColors} onExpand={() => expand(node.id)} trailing={node.selectable === false ? undefined : isMultiple ? <FluxFormCheckbox className={styles.treeNodeControl} disabled={disabled} checked={selected.has(node.id) || locked(node)} aria-hidden="true" isReadonly tabIndex={-1} /> : <FluxFormRadio className={styles.treeNodeControl} disabled={disabled} value={node.id} aria-hidden="true" tabIndex={-1} />} />
                    </div>;
                })}
            </div></RadioContext.Provider></ItemControlContext.Provider>
        </div></FluxFadeTransition>, document.body)}
    </>;
}
