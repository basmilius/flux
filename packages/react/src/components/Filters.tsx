import {clsx} from 'clsx';
import {DateTime} from 'luxon';
import {createContext, Fragment, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import type {HTMLAttributes, ReactElement, ReactNode} from 'react';
import type {FluxIconName} from '../types';
import {useFluxTranslate} from '../i18n';
import {FluxSeparator} from './Layout';
import {FluxSecondaryButton} from './Actions';
import {FluxBadge, FluxPaneBody} from './Display';
import {FluxFormColumn, FluxFormField, FluxFormInput} from './Forms';
import {FluxFormSlider} from './Sliders';
import {FluxDatePicker} from './CalendarFilters';
import {FluxFlyout} from './Overlays';
import {FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader} from './Menus';
import {FluxOverflowBar} from './Utilities';
import {FluxWindowTransition} from './Transitions';
import {useHeightTransition} from './heightTransition';
import {flattenElements} from './children';
import styles from '~flux/components/css/component/Filter.module.scss';

export type FluxFilterValueSingle = DateTime | string | boolean | number | null;
export type FluxFilterValue = FluxFilterValueSingle | FluxFilterValueSingle[];
export type FluxFilterState = Record<string, FluxFilterValue>;
export interface FluxFilterCommonProps {
    defaultValue?: FluxFilterValue;
    disabled?: boolean;
    icon?: FluxIconName;
    label: string;
    name: string;
    onChange?: (value: FluxFilterValue) => void;
    onClear?: () => void;
}
export interface FluxFilterOptionItem {icon?: FluxIconName; label: string; value: FluxFilterValueSingle}
export interface FluxFilterOptionHeader {title: string}
export type FluxFilterOptionRow = FluxFilterOptionItem | FluxFilterOptionHeader;
interface SearchProps {searchQuery?: string; onSearchQueryChange?: (value: string) => void; searchPlaceholder?: string}
interface OptionProps extends FluxFilterCommonProps, SearchProps {isSearchable?: boolean; options: FluxFilterOptionRow[]}
interface AsyncProps extends FluxFilterCommonProps, SearchProps {
    fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>;
    fetchRelevant(): Promise<FluxFilterOptionRow[]>;
    fetchSearch(query: string): Promise<FluxFilterOptionRow[]>;
}
type Definition = FluxFilterCommonProps & {type: string; getValueLabel(value: FluxFilterValue | undefined): Promise<string | null>};
export interface FilterContextValue {
    state: FluxFilterState;
    back(): void;
    clear(name: string): void;
    reset(name: string): void;
    setValue(name: string, value: FluxFilterValue): void;
    getValue(name: string): FluxFilterValue | undefined;
    hasValue(name: string): boolean;
    getDefinition(name: string): Definition | undefined;
}
export const FilterContext = createContext<FilterContextValue | null>(null);
function useFilter() {
    const context = useContext(FilterContext);
    if (!context) throw new Error('Filter controls must be used inside FluxFilter or FluxFilterBar');
    return context;
}
function isOption(row: FluxFilterOptionRow): row is FluxFilterOptionItem {return 'value' in row;}
function equal(a: FluxFilterValue | undefined, b: FluxFilterValue | undefined): boolean {
    return a === b || DateTime.isDateTime(a) && DateTime.isDateTime(b) && a.equals(b) || Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((entry, index) => equal(entry, b[index]));
}
function canReset(definition: Definition, value: FluxFilterValue | undefined) {return definition.defaultValue !== undefined && !equal(value, definition.defaultValue);}
function rangeLabel(start: DateTime, end: DateTime, translate: ReturnType<typeof useFluxTranslate>) {
    if (start.year !== end.year) return translate('flux.customPeriod');
    const endLabel = end.toLocaleString({day: 'numeric', month: 'short', year: 'numeric'});
    return start.hasSame(end, 'day') ? endLabel : `${start.toLocaleString({day: 'numeric', month: start.month === end.month ? undefined : 'short'})} – ${endLabel}`;
}
function resolveDefinition(node: ReactElement, translate: ReturnType<typeof useFluxTranslate>): Definition | undefined {
    const props = node.props as OptionProps & AsyncProps & {formatter?: (value: number) => string};
    const factory = (node.type as {filterDefinition?: (props: FluxFilterCommonProps, context: {translate: ReturnType<typeof useFluxTranslate>}) => Definition}).filterDefinition;
    if (factory) return factory(props, {translate});
    const kind = node.type === FluxFilterOption || node.type === FluxFilterOptionAsync ? 'option' : node.type === FluxFilterOptions || node.type === FluxFilterOptionsAsync ? 'options' : node.type === FluxFilterDate ? 'date' : node.type === FluxFilterDateRange ? 'dateRange' : node.type === FluxFilterRange ? 'range' : undefined;
    if (!kind) return;
    return {...props, type: kind, async getValueLabel(value) {
        if (value == null) return null;
        if (kind === 'date') return DateTime.isDateTime(value) ? value.toLocaleString({day: 'numeric', month: 'short', year: 'numeric'}) : null;
        if (kind === 'dateRange') return Array.isArray(value) && DateTime.isDateTime(value[0]) && DateTime.isDateTime(value[1]) ? rangeLabel(value[0], value[1], translate) : null;
        if (kind === 'range') return Array.isArray(value) && value.length === 2 ? value.map(item => (props.formatter ?? ((n: number) => new Intl.NumberFormat().format(n)))(Number(item))).join(' – ') : null;
        if (kind === 'options' && !Array.isArray(value)) return null;
        const values = Array.isArray(value) ? value : [value];
        const options = (props.options ?? await props.fetchOptions(values)).filter(isOption);
        const selected = options.filter(option => values.includes(option.value));
        return selected.length > 1 ? translate('flux.nSelected', {n: selected.length}) : selected[0]?.label ?? null;
    }};
}

interface FilterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onReset' | 'content'> {
    onClear?: (name: string) => void;
    onReset?: (name: string) => void;
    onValueChange?: (value: FluxFilterState) => void;
    value: FluxFilterState;
}
interface FilterContent {definitions: Definition[]; filters: Record<string, ReactElement>; groups: (Definition | ReactElement)[][]}
function FilterProvider({children, render, onClear, onReset, onValueChange, value}: FilterProps & {render(content: FilterContent): ReactNode}) {
    const translate = useFluxTranslate();
    const definitions: Definition[] = [];
    const filters: Record<string, ReactElement> = {};
    const groups: (Definition | ReactElement)[][] = [[]];
    for (const child of flattenElements(children)) {
        if (child.type === FluxSeparator) {groups.push([]); continue;}
        const definition = resolveDefinition(child, translate);
        if (definition) {definitions.push(definition); filters[definition.name] = child;}
        groups.at(-1)!.push(definition ?? child);
    }
    const latest = useRef(value);
    latest.current = value;
    const update = (next: FluxFilterState) => {latest.current = next; onValueChange?.(next);};
    const context: FilterContextValue = {
        state: value,
        back() {},
        getDefinition: name => definitions.find(item => item.name === name),
        getValue: name => value[name] ?? undefined,
        hasValue: name => value[name] != null,
        setValue(name, next) {update({...latest.current, [name]: next}); context.getDefinition(name)?.onChange?.(next);},
        clear(name) {
            const next = {...latest.current}; delete next[name]; update(next);
            context.getDefinition(name)?.onClear?.(); onClear?.(name);
        },
        reset(name) {
            const definition = context.getDefinition(name);
            if (definition?.defaultValue !== undefined) context.setValue(name, definition.defaultValue);
            else {const next = {...latest.current}; delete next[name]; update(next); definition?.onClear?.();}
            onReset?.(name);
        }
    };
    const seeded = useRef(new Set<string>());
    const defaults = definitions.filter(item => item.defaultValue !== undefined && value[item.name] === undefined && !seeded.current.has(item.name));
    useEffect(() => {
        for (const definition of definitions) seeded.current.add(definition.name);
        if (defaults.length) update({...latest.current, ...Object.fromEntries(defaults.map(item => [item.name, item.defaultValue!]))});
    }, [JSON.stringify(defaults.map(item => [item.name, item.defaultValue]))]);
    return <FilterContext.Provider value={context}>{render({definitions, filters, groups: groups.filter(group => group.length)})}</FilterContext.Provider>;
}

function ValueLabel({definition, value, children}: {definition: Definition; value: FluxFilterValue | undefined; children(label: string | undefined, loading: boolean): ReactNode}) {
    const [label, setLabel] = useState<string>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        let active = true;
        setLoading(true);
        definition.getValueLabel(value).then(label => {if (active) setLabel(label ?? undefined);}).catch(() => {if (active) setLabel(undefined);}).finally(() => {if (active) setLoading(false);});
        return () => {active = false;};
    }, [definition.name, value, (definition as unknown as OptionProps).options, (definition as unknown as AsyncProps).fetchOptions]);
    return children(label, loading);
}

function FilterWindow({content, className, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'content'> & {content: FilterContent}) {
    const context = useFilter();
    const translate = useFluxTranslate();
    const [view, setView] = useState('default');
    const [isBack, setBack] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const heightRef = useHeightTransition();
    const setRoot = useCallback((element: HTMLDivElement | null) => {root.current = element; heightRef(element);}, [heightRef]);
    const navigate = (next: string) => {setBack(next === 'default'); setView(next);};
    const back = () => navigate('default');
    const definition = content.definitions.find(item => item.name === view);
    const focus = () => root.current?.querySelector<HTMLElement>('input:not(:disabled), button:not(:disabled), a[href]')?.focus({preventScroll: true});
    return <div {...props} ref={setRoot} className={clsx(styles.filter, className)}><FluxWindowTransition isBack={isBack} onAfterEnter={focus}>
        <FluxMenu key={view} isPersistent>{view === 'default' ? content.groups.map((group, index) => <Fragment key={index}>{index > 0 && <FluxSeparator />}<FluxMenuGroup>{group.map((item, index) => 'name' in item ? <ValueLabel key={item.name} definition={item} value={context.state[item.name]}>{(label, loading) => <FluxMenuItem command={label} commandIcon="angle-right" commandLoading={loading} disabled={item.disabled} iconLeading={item.icon} label={item.label} onClick={() => navigate(item.name)} />}</ValueLabel> : <Fragment key={index}>{item}</Fragment>)}</FluxMenuGroup></Fragment>) : <>
            <FluxMenuGroup className={styles.filterHeader} isHorizontal>
                <FluxMenuItem className={styles.filterBack} label={translate('flux.back')} iconLeading="angle-left" onClick={back} />
                {definition && canReset(definition, context.state[view]) && <FluxMenuItem className={styles.filterAction} iconLeading="rotate-left" aria-label={translate('flux.filterReset')} onClick={() => {back(); context.reset(view);}} />}
                <FluxMenuItem className={styles.filterAction} iconLeading="trash" aria-label={translate('flux.filterRemove')} isDestructive onClick={() => {back(); context.clear(view);}} />
            </FluxMenuGroup>
            {content.filters[view]}
        </>}</FluxMenu>
    </FluxWindowTransition></div>;
}

export function FluxFilter({children, className, onClear, onReset, onValueChange, value, ...props}: FilterProps) {
    return <FilterProvider {...{children, onClear, onReset, onValueChange, value}} render={content => <FilterWindow {...props} className={className} content={content} />} />;
}
export function FluxFilterBar({children, className, end, isSearchable, onClear, onReset, onSearchChange, onValueChange, search = '', searchPlaceholder, start, value, ...props}: FilterProps & {end?: ReactNode; isSearchable?: boolean; onSearchChange?: (value: string) => void; search?: string; searchPlaceholder?: string; start?: ReactNode}) {
    return <FilterProvider {...{children, onClear, onReset, onValueChange, value}} render={content => <FilterBarContent {...{className, content, end, isSearchable, onSearchChange, search, searchPlaceholder, start, ...props}} />} />;
}
function FilterBarContent({content, end, isSearchable, onSearchChange, search, searchPlaceholder, start, className, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'content'> & {content: FilterContent; end?: ReactNode; isSearchable?: boolean; onSearchChange?: (value: string) => void; search?: string; searchPlaceholder?: string; start?: ReactNode}) {
    const context = useFilter();
    const translate = useFluxTranslate();
    const active = content.definitions.filter(item => context.state[item.name] != null && (!Array.isArray(context.state[item.name]) || (context.state[item.name] as unknown[]).length));
    return <div {...props} className={clsx(styles.filterBar, className)}>{start}
        {isSearchable && <FluxFormInput className={styles.filterBarSearch} iconLeading="magnifying-glass" placeholder={searchPlaceholder} type="search" value={search} onValueChange={value => onSearchChange?.(String(value ?? ''))} />}
        <FluxOverflowBar alignment="end" overflow={() => <>{active.length > 0 && <FluxSeparator direction="vertical" style={{marginTop: 9, marginBottom: 9}} />}{content.definitions.length > 0 && <FluxFlyout opener={({open}) => <FluxSecondaryButton iconLeading="sliders-simple" label={translate('flux.filter')} after={active.length ? <FluxBadge label={String(active.length)} /> : undefined} onClick={open} />}>{() => <FilterWindow {...props} className={className} content={content} />}</FluxFlyout>}</>}>
            {active.map(item => <FluxFlyout key={item.name} opener={({open}) => <ValueLabel definition={item} value={context.state[item.name]}>{(label, loading) => <FluxSecondaryButton className={styles.filterButton} disabled={item.disabled} iconLeading={item.icon} label={item.label} after={label ? <FluxBadge className={styles.filterBadge} isLoading={loading} label={label} /> : undefined} onClick={open} />}</ValueLabel>}>
                {({close}) => <div className={styles.filter}><FluxMenu isPersistent>{content.filters[item.name]}<FluxSeparator /><FluxMenuGroup>
                    {canReset(item, context.state[item.name]) && <FluxMenuItem className={styles.filterAction} iconLeading="rotate-left" label={translate('flux.filterReset')} onClick={() => {close(); context.reset(item.name);}} />}
                    <FluxMenuItem className={styles.filterAction} iconLeading="trash" isDestructive label={translate('flux.filterRemove')} onClick={() => {close(); context.clear(item.name);}} />
                </FluxMenuGroup></FluxMenu></div>}
            </FluxFlyout>)}
        </FluxOverflowBar>{end}
    </div>;
}

function useQuery(searchQuery: string | undefined, onSearchQueryChange?: (value: string) => void) {
    const [local, setLocal] = useState('');
    return [searchQuery ?? local, (next: string) => {setLocal(next); onSearchQueryChange?.(next);}] as const;
}
function OptionList({disabled, isMultiple, isSearchable, isLoading, name, options, query, setQuery, searchPlaceholder}: {disabled?: boolean; isMultiple?: boolean; isSearchable?: boolean; isLoading?: boolean; name: string; options: FluxFilterOptionRow[]; query: string; setQuery(value: string): void; searchPlaceholder?: string}) {
    const context = useFilter();
    const current = context.state[name];
    const selected = isMultiple ? Array.isArray(current) ? current : [] : [current];
    const search = useRef<HTMLInputElement>(null);
    useEffect(() => {const frame = requestAnimationFrame(() => search.current?.focus()); return () => cancelAnimationFrame(frame);}, []);
    const select = (value: FluxFilterValueSingle) => {
        if (disabled) return;
        if (isMultiple) {const next = selected.includes(value) ? selected.filter(entry => entry !== value) : [...selected, value]; context.setValue(name, next.length ? next as FluxFilterValue : null);}
        else {context.setValue(name, current === value ? null : value); context.back();}
    };
    return <FluxMenuGroup>
        {isSearchable && <div className={styles.filterSearch}><FluxFormInput ref={search} autoComplete="off" isSecondary iconLeading="magnifying-glass" placeholder={searchPlaceholder} type="search" value={query} onValueChange={value => setQuery(String(value ?? ''))} /></div>}
        {isLoading && !options.length ? <FluxMenuItem disabled isLoading /> : options.map((option, index) => isOption(option) ? <FluxMenuItem key={String(option.value)} disabled={disabled} isSelectable isSelected={selected.includes(option.value)} label={option.label} onClick={() => select(option.value)} /> : <FluxMenuSubHeader key={`${option.title}-${index}`} label={option.title} />)}
    </FluxMenuGroup>;
}
function Options({multiple, searchQuery, onSearchQueryChange, ...props}: OptionProps & {multiple?: boolean}) {
    const [query, setQuery] = useQuery(searchQuery, onSearchQueryChange);
    const options = props.options.filter(option => !isOption(option) || option.label.toLowerCase().includes(query.toLowerCase()));
    return <OptionList {...props} options={options} isMultiple={multiple} query={query} setQuery={setQuery} />;
}
export function FluxFilterOption(props: OptionProps) {return <Options {...props} />;}
export function FluxFilterOptions(props: OptionProps) {return <Options {...props} multiple />;}
function AsyncOptions({multiple, searchQuery, onSearchQueryChange, fetchOptions, fetchRelevant, fetchSearch, ...props}: AsyncProps & {multiple?: boolean}) {
    const [query, setQuery] = useQuery(searchQuery, onSearchQueryChange);
    const {state} = useFilter();
    const value = state[props.name];
    const [selected, setSelected] = useState<FluxFilterOptionRow[]>([]);
    const [visible, setVisible] = useState<FluxFilterOptionRow[]>([]);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [visibleLoading, setVisibleLoading] = useState(false);
    const initial = useRef(true);
    useEffect(() => {
        let active = true;
        const ids = Array.isArray(value) ? value : value == null ? [] : [value];
        if (!ids.length) {setSelected([]); setSelectedLoading(false); return;}
        setSelectedLoading(true);
        fetchOptions(ids).then(options => {if (active) setSelected(options);}).finally(() => {if (active) setSelectedLoading(false);});
        return () => {active = false;};
    }, [value, fetchOptions]);
    useEffect(() => {
        let active = true;
        const timer = setTimeout(() => {
            setVisibleLoading(true);
            (query ? fetchSearch(query) : fetchRelevant()).then(options => {if (active) setVisible(options);}).finally(() => {if (active) setVisibleLoading(false);});
        }, initial.current ? 0 : 150);
        initial.current = false;
        return () => {active = false; clearTimeout(timer);};
    }, [query, fetchRelevant, fetchSearch]);
    const options = [...visible, ...selected.filter(option => !isOption(option) || !visible.some(entry => isOption(entry) && entry.value === option.value) && option.label.toLowerCase().includes(query.toLowerCase()))];
    return <OptionList {...props} isMultiple={multiple} isSearchable isLoading={selectedLoading || visibleLoading} options={options} query={query} setQuery={setQuery} />;
}
export function FluxFilterOptionAsync(props: AsyncProps) {return <AsyncOptions {...props} />;}
export function FluxFilterOptionsAsync(props: AsyncProps) {return <AsyncOptions {...props} multiple />;}
export function FluxFilterDate({max, min, name}: FluxFilterCommonProps & {max?: DateTime; min?: DateTime}) {
    const {state, setValue, back} = useFilter();
    const current = state[name];
    const date = DateTime.isDateTime(current) ? current : typeof current === 'string' ? DateTime.fromISO(current) : null;
    return <FluxDatePicker className={styles.filterDatePicker} max={max} min={min} value={date} onValueChange={next => {if (DateTime.isDateTime(next)) {setValue(name, next); back();}}} />;
}
export function FluxFilterDateRange({max, min, name, rangeMode = 'range'}: FluxFilterCommonProps & {max?: DateTime; min?: DateTime; rangeMode?: 'range' | 'week' | 'month'}) {
    const {state, setValue, back} = useFilter();
    const current = state[name];
    const dates = Array.isArray(current) && current.length === 2 && current.every(DateTime.isDateTime) ? current as DateTime[] : null;
    return <FluxDatePicker className={styles.filterDatePicker} max={max} min={min} rangeMode={rangeMode} value={dates} onValueChange={next => {if (Array.isArray(next)) {setValue(name, next); back();}}} />;
}
export function FluxFilterRange({formatter = value => new Intl.NumberFormat().format(value), isTicksVisible, max, min, name, step = 1}: FluxFilterCommonProps & {formatter?: (value: number) => string; isTicksVisible?: boolean; max: number; min: number; step?: number}) {
    const {state, setValue} = useFilter();
    const translate = useFluxTranslate();
    const values = (state[name] ?? [min, max]) as number[];
    return <FluxPaneBody><FluxFormColumn>{[0, 1].map(index => <FluxFormField key={index} label={translate(index ? 'flux.max' : 'flux.min')} valueLabel={formatter(values[index])}>
        <FluxFormSlider formatter={formatter} isTicksVisible={isTicksVisible} value={values[index]} max={max} min={min} step={step} onValueChange={value => setValue(name, index === 0 ? [value, Math.max(value, values[1])] : [Math.min(values[0], value), value])} />
    </FluxFormField>)}</FluxFormColumn></FluxPaneBody>;
}
