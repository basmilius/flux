import { clsx } from "clsx";
import { DateTime } from "luxon";
import { Children, createContext, isValidElement, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import type { FluxIconName } from "../types";
import { FluxButtonGroup, FluxSecondaryButton } from "./Actions";
import { FluxActionBar } from "./Composition";
import { FluxLayerPane } from "./DisplayExtended";
import { FluxPane, FluxPaneBody } from "./Display";
import { FluxSpinner } from "./Feedback";
import { FluxFormColumn, FluxFormField, FluxFormInput } from "./Forms";
import { FluxFormSlider } from "./AdvancedForms";
import { FluxIcon } from "./Icon";
import calendarStyles from "../../../components/src/css/component/Calendar.module.scss";
import pickerStyles from "../../../components/src/css/component/DatePicker.module.scss";
import filterStyles from "../../../components/src/css/component/Filter.module.scss";

function sameDay(a: DateTime, b: DateTime) {
    return a.hasSame(b, "day");
}
function within(date: DateTime, min?: DateTime, max?: DateTime) {
    return (!min || date.endOf("day") >= min.startOf("day")) && (!max || date.startOf("day") <= max.endOf("day"));
}
function monthGrid(view: DateTime) {
    const start = view.startOf("month").startOf("week");
    return Array.from({ length: 42 }, (_, index) => start.plus({ days: index }));
}

export type FluxDatePickerValue = DateTime | DateTime[] | null;
export function FluxDatePicker({ className, defaultValue = null, max, min, onValueChange, rangeMode, value }: Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { defaultValue?: FluxDatePickerValue; max?: DateTime; min?: DateTime; onValueChange?: (value: FluxDatePickerValue) => void; rangeMode?: "range" | "week" | "month"; value?: FluxDatePickerValue }) {
    const controlled = value !== undefined,
        [inner, setInner] = useState<FluxDatePickerValue>(defaultValue),
        current = controlled ? value : inner,
        initial = Array.isArray(current) ? current.at(-1) : current,
        [view, setView] = useState((initial ?? DateTime.now()).startOf("month")),
        [mode, setMode] = useState<"date" | "month" | "year">("date"),
        [start, setStart] = useState<DateTime | null>(null),
        [hovered, setHovered] = useState<DateTime | null>(null),
        [focusDate, setFocusDate] = useState(initial ?? DateTime.now()),
        id = useId(),
        dates = monthGrid(view);
    const dayRefs = useRef(new Map<string, HTMLButtonElement>()),
        requestedFocus = useRef<string | null>(null),
        monthAvailable = (month: DateTime) => within(month.startOf("month"), min, max) || within(month.endOf("month"), min, max) || Boolean(min && max && min < month.startOf("month") && max > month.endOf("month")),
        focusTarget = focusDate.hasSame(view, "month") && within(focusDate, min, max) ? focusDate : dates.find((date) => date.hasSame(view, "month") && within(date, min, max));
    useEffect(() => {
        if (!requestedFocus.current) return;
        dayRefs.current.get(requestedFocus.current)?.focus();
        requestedFocus.current = null;
    }, [focusDate, view]);
    const emit = (next: FluxDatePickerValue) => {
            if (!controlled) setInner(next);
            onValueChange?.(next);
        },
        select = (date: DateTime) => {
            if (!within(date, min, max) || date.month !== view.month) return;
            if (rangeMode === "week") emit([DateTime.max(date.startOf("week"), min?.startOf("day") ?? date.startOf("week")), DateTime.min(date.endOf("week"), max?.endOf("day") ?? date.endOf("week"))]);
            else if (rangeMode === "month") emit([DateTime.max(date.startOf("month"), min?.startOf("day") ?? date.startOf("month")), DateTime.min(date.endOf("month"), max?.endOf("day") ?? date.endOf("month"))]);
            else if (rangeMode === "range") {
                if (!start) {setStart(date); setHovered(date);}
                else {
                    emit(date < start ? [date, start] : [start, date]);
                    setStart(null);
                    setHovered(null);
                }
            } else emit(date);
        },
        moveFocus = (event: React.KeyboardEvent<HTMLButtonElement>, date: DateTime) => {
            let next: DateTime | undefined;
            if (event.key === "ArrowLeft") next = date.minus({ days: 1 });
            else if (event.key === "ArrowRight") next = date.plus({ days: 1 });
            else if (event.key === "ArrowUp") next = date.minus({ days: 7 });
            else if (event.key === "ArrowDown") next = date.plus({ days: 7 });
            else if (event.key === "Home") next = date.startOf("week");
            else if (event.key === "End") next = date.endOf("week").startOf("day");
            else if (event.key === "PageUp") next = date.minus({ months: 1 });
            else if (event.key === "PageDown") next = date.plus({ months: 1 });
            if (!next || !within(next, min, max)) return;
            event.preventDefault();
            requestedFocus.current = next.toISODate();
            setFocusDate(next);
            if (!next.hasSame(view, "month")) setView(next.startOf("month"));
        },
        navigateMonth = (amount: number) => {
            const nextView = view.plus({ months: amount }).startOf("month"),
                day = Math.min(focusDate.day, nextView.daysInMonth ?? focusDate.day),
                candidate = nextView.set({ day }),
                next = within(candidate, min, max) ? candidate : min && candidate < min ? min : max && candidate > max ? max : candidate;
            requestedFocus.current = next.toISODate();
            setFocusDate(next);
            setView(nextView);
        };
    const selected = (date: DateTime) => (!Array.isArray(current) && current ? sameDay(current, date) : false),
        range = Array.isArray(current) && current.length === 2 ? current : null;
    return (
        <div className={clsx(pickerStyles.datePicker, className)}>
            <div className={pickerStyles.datePickerHeader}>
                {mode === "date" && <FluxSecondaryButton disabled={!monthAvailable(view.minus({ months: 1 }))} iconLeading="angle-left" aria-label="Previous" onClick={() => navigateMonth(-1)} />}
                <div className={pickerStyles.datePickerHeaderView} id={id} aria-live="polite">
                    <button className={pickerStyles.datePickerHeaderViewButton} type="button" onClick={() => setMode(mode === "month" ? "date" : "month")}>
                        {view.toFormat("LLLL")}
                    </button>
                    <button className={pickerStyles.datePickerHeaderViewButton} type="button" onClick={() => setMode(mode === "year" ? "date" : "year")}>
                        {view.year}
                    </button>
                </div>
                {mode === "date" && <FluxSecondaryButton disabled={!monthAvailable(view.plus({ months: 1 }))} iconLeading="angle-right" aria-label="Next" onClick={() => navigateMonth(1)} />}
            </div>
            {mode === "date" ? (
                <div className={pickerStyles.datePickerDates} aria-labelledby={id} onMouseLeave={() => setHovered(null)}>
                    <div className={pickerStyles.datePickerDatesGrid}>
                        {Array.from({ length: 7 }, (_, index) => (
                            <span key={index} className={pickerStyles.datePickerDay}>
                                {DateTime.now().startOf("week").plus({ days: index }).toFormat("ccc")}
                            </span>
                        ))}
                        {dates.map((date) => {
                            const disabled = date.month !== view.month || !within(date, min, max),
                                inRange = range && date >= range[0].startOf("day") && date <= range[1].endOf("day"),
                                preview = start && hovered && date >= DateTime.min(start, hovered) && date <= DateTime.max(start, hovered),
                                isFocusTarget = Boolean(focusTarget && sameDay(date, focusTarget));
                            return (
                                <button key={date.toISODate()} ref={element => {const key = date.toISODate()!; if (element) dayRefs.current.set(key, element); else dayRefs.current.delete(key);}} className={clsx(pickerStyles.datePickerDate, disabled && pickerStyles.isDisabled, selected(date) && pickerStyles.isSelected, inRange && pickerStyles.isRangeEntry, preview && pickerStyles.isSelectionEntry)} tabIndex={disabled || !isFocusTarget ? -1 : 0} disabled={disabled} type="button" onFocus={() => setFocusDate(date)} onKeyDown={event => moveFocus(event, date)} onMouseEnter={() => {if (start && !disabled) setHovered(date);}} onClick={() => select(date)}>
                                    {date.day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : mode === "month" ? (
                <div className={pickerStyles.datePickerMonths}>
                    {Array.from({ length: 12 }, (_, month) => (
                        <FluxSecondaryButton
                            key={month}
                            label={view.set({ month: month + 1 }).toFormat("LLL")}
                            onClick={() => {
                                setView(view.set({ month: month + 1 }));
                                setMode("date");
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className={pickerStyles.datePickerYears}>
                    <FluxSecondaryButton iconLeading="angle-left" onClick={() => setView(view.minus({ years: 12 }))} />
                    {Array.from({ length: 12 }, (_, index) => view.year - 5 + index).map((year) => (
                        <FluxSecondaryButton
                            key={year}
                            label={String(year)}
                            onClick={() => {
                                setView(view.set({ year }));
                                setMode("date");
                            }}
                        />
                    ))}
                    <FluxSecondaryButton iconLeading="angle-right" onClick={() => setView(view.plus({ years: 12 }))} />
                </div>
            )}
        </div>
    );
}

export interface FluxCalendarItemProps {
    allDay?: boolean;
    children?: ReactNode;
    date: DateTime;
    duration?: number;
    id?: string | number;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
export function FluxCalendarItem(_props: FluxCalendarItemProps) {
    return <span aria-hidden="true" style={{ display: "none" }} />;
}
export type FluxCalendarView = "month" | "week" | "two-days" | "day";
export function FluxCalendar({ children, className, draggable, initialDate = DateTime.now(), isLoading, onNavigate, onReschedule, pixelsPerMinute = 0.8, view = "month" }: { children?: ReactNode; className?: string; draggable?: boolean; initialDate?: DateTime; isLoading?: boolean; onNavigate?: (focus: DateTime, start: DateTime, end: DateTime) => void; onReschedule?: (event: { fromDate: DateTime; id: string | number; toDate: DateTime }) => void; pixelsPerMinute?: number; view?: FluxCalendarView }) {
    const [focus, setFocus] = useState(initialDate.startOf("day")),
        items = Children.toArray(children).filter(isValidElement) as ReactElement<FluxCalendarItemProps>[],
        dayCount = view === "week" ? 7 : view === "two-days" ? 2 : 1,
        dates = view === "month" ? monthGrid(focus) : Array.from({ length: dayCount }, (_, index) => focus.plus({ days: index }));
    useEffect(() => {
        onNavigate?.(focus, dates[0], dates.at(-1)!);
    }, [focus, view]);
    const navigate = (direction: number) => setFocus((date) => (view === "month" ? date.plus({ months: direction }) : date.plus({ days: direction * dayCount })));
    return (
        <FluxLayerPane className={clsx(calendarStyles.calendar, className)}>
            <FluxActionBar
                className={calendarStyles.calendarActions}
                primary={
                    <div className={calendarStyles.calendarCurrent}>
                        <span className={calendarStyles.calendarRangeLabel}>{view === "month" ? focus.toFormat("LLLL yyyy") : `${dates[0].toFormat("d LLL")} – ${dates.at(-1)!.toFormat("d LLL yyyy")}`}</span>
                    </div>
                }
                actionsEnd={
                    <>
                        <FluxSecondaryButton label="Today" onClick={() => setFocus(DateTime.now().startOf("day"))} />
                        <FluxButtonGroup>
                            <FluxSecondaryButton iconLeading="angle-left" aria-label="Previous" onClick={() => navigate(-1)} />
                            <FluxSecondaryButton iconLeading="angle-right" aria-label="Next" onClick={() => navigate(1)} />
                        </FluxButtonGroup>
                    </>
                }
            />
            <FluxPane className={calendarStyles.calendarView}>
                {view === "month" ? (
                    <div className={calendarStyles.calendarCells}>
                        {dates.map((date) => (
                            <div
                                key={date.toISODate()}
                                className={calendarStyles.calendarCell}
                                onDragOver={(event) => draggable && event.preventDefault()}
                                onDrop={(event) => {
                                    const id = event.dataTransfer.getData("text/plain"),
                                        item = items.find((item) => String(item.props.id) === id);
                                    if (item?.props.id !== undefined) onReschedule?.({ id: item.props.id, fromDate: item.props.date, toDate: date });
                                }}
                            >
                                <span className={calendarStyles.calendarDay}>{date.toFormat("ccc")}</span>
                                <span className={calendarStyles.calendarEntryDate}>{date.day}</span>
                                <div className={calendarStyles.calendarEvents}>
                                    {items
                                        .filter((item) => sameDay(item.props.date, date))
                                        .map((item) => (
                                            <button key={item.props.id ?? String(item.props.date.toMillis())} className={calendarStyles.calendarItem} draggable={draggable && item.props.id !== undefined} onDragStart={(event) => event.dataTransfer.setData("text/plain", String(item.props.id))} onClick={item.props.onClick}>
                                                {item.props.children}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={calendarStyles.timeGrid} style={{ "--pixels-per-minute": pixelsPerMinute } as React.CSSProperties}>
                        {dates.map((date) => (
                            <section key={date.toISODate()} className={calendarStyles.timeGridDay}>
                                <strong>{date.toFormat("ccc d")}</strong>
                                {items
                                    .filter((item) => sameDay(item.props.date, date))
                                    .map((item) => (
                                        <button key={item.props.id ?? String(item.props.date.toMillis())} className={calendarStyles.timeGridDayItem} onClick={item.props.onClick}>
                                            {item.props.children}
                                        </button>
                                    ))}
                            </section>
                        ))}
                    </div>
                )}
                {isLoading && (
                    <div className={calendarStyles.calendarLoader}>
                        <FluxSpinner />
                    </div>
                )}
                <div className={calendarStyles.calendarItemRegistry} aria-hidden="true">
                    {children}
                </div>
            </FluxPane>
        </FluxLayerPane>
    );
}

export type FluxFilterValueSingle = DateTime | string | boolean | number | null;
export type FluxFilterValue = FluxFilterValueSingle | FluxFilterValueSingle[];
export type FluxFilterState = Record<string, FluxFilterValue>;
interface FilterContextValue {
    back(): void;
    setValue(name: string, value: FluxFilterValue): void;
    state: FluxFilterState;
}
const FilterContext = createContext<FilterContextValue | null>(null);
export interface FluxFilterCommonProps {
    defaultValue?: FluxFilterValue;
    disabled?: boolean;
    icon?: FluxIconName;
    label: string;
    name: string;
    onChange?: (value: FluxFilterValue) => void;
    onClear?: () => void;
}
function useFilter() {
    const context = useContext(FilterContext);
    if (!context) throw new Error("Filter controls must be used inside FluxFilter or FluxFilterBar");
    return context;
}
function FilterProvider({ children, onValueChange, value }: { children: ReactNode; onValueChange?: (value: FluxFilterState) => void; value: FluxFilterState }) {
    const [active, setActive] = useState<string | null>(null),
        setValue = (name: string, next: FluxFilterValue) => onValueChange?.({ ...value, [name]: next });
    return <FilterContext.Provider value={{ back: () => setActive(null), setValue, state: value }}>{children}</FilterContext.Provider>;
}
export function FluxFilter({ children, className, onClear, onReset, onValueChange, value, ...props }: HTMLAttributes<HTMLDivElement> & { onClear?: (name: string) => void; onReset?: (name: string) => void; onValueChange?: (value: FluxFilterState) => void; value: FluxFilterState }) {
    return (
        <FilterProvider value={value} onValueChange={onValueChange}>
            <div {...props} className={clsx(filterStyles.filter, className)}>
                {children}
            </div>
        </FilterProvider>
    );
}
export function FluxFilterBar({ children, className, end, isSearchable, onSearchChange, onValueChange, search = "", searchPlaceholder, start, value, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & { end?: ReactNode; isSearchable?: boolean; onSearchChange?: (value: string) => void; onValueChange?: (value: FluxFilterState) => void; search?: string; searchPlaceholder?: string; start?: ReactNode; value: FluxFilterState }) {
    return (
        <FilterProvider value={value} onValueChange={onValueChange}>
            <div {...props} className={clsx(filterStyles.filterBar, className)}>
                {start}
                {isSearchable && <FluxFormInput className={filterStyles.filterBarSearch} iconLeading="magnifying-glass" placeholder={searchPlaceholder} type="search" value={search} onValueChange={(value) => onSearchChange?.(String(value ?? ""))} />}
                <div className={filterStyles.filter}>{children}</div>
                {end}
            </div>
        </FilterProvider>
    );
}

export interface FluxFilterOptionItem {
    icon?: FluxIconName;
    label: string;
    value: FluxFilterValueSingle;
}
export interface FluxFilterOptionHeader {
    title: string;
}
export type FluxFilterOptionRow = FluxFilterOptionItem | FluxFilterOptionHeader;
function isOption(row: FluxFilterOptionRow): row is FluxFilterOptionItem {
    return "value" in row;
}
function OptionList({ disabled, isMultiple, isSearchable, name, onChange, onClear, options, searchPlaceholder }: { disabled?: boolean; isMultiple?: boolean; isSearchable?: boolean; name: string; onChange?: (value: FluxFilterValue) => void; onClear?: () => void; options: FluxFilterOptionRow[]; searchPlaceholder?: string }) {
    const { state, setValue, back } = useFilter(),
        [search, setSearch] = useState(""),
        current = state[name],
        selected = Array.isArray(current) ? current : [current],
        visible = options.filter((row) => !isOption(row) || !search || row.label.toLowerCase().includes(search.toLowerCase()));
    const update = (next: FluxFilterValue) => {
        setValue(name, next);
        onChange?.(next);
        if (Array.isArray(next) && next.length === 0) onClear?.();
    };
    return (
        <div>
            {isSearchable && <FluxFormInput className={filterStyles.filterSearch} disabled={disabled} placeholder={searchPlaceholder} type="search" value={search} onValueChange={(value) => setSearch(String(value ?? ""))} />}{" "}
            {visible.map((row, index) =>
                isOption(row) ? (
                    <button
                        key={`${String(row.value)}-${index}`}
                        type="button"
                        role={isMultiple ? "checkbox" : "radio"}
                        disabled={disabled}
                        aria-checked={selected.some((value) => Object.is(value, row.value))}
                        onClick={() => {
                            if (isMultiple) {
                                const exists = selected.some((value) => Object.is(value, row.value));
                                update(exists ? selected.filter((value) => !Object.is(value, row.value)) : [...selected.filter((value) => value != null), row.value]);
                            } else {
                                update(row.value);
                                back();
                            }
                        }}
                    >
                        {row.icon && <FluxIcon name={row.icon} />} {row.label}
                    </button>
                ) : (
                    <strong key={row.title}>{row.title}</strong>
                ),
            )}
        </div>
    );
}
export function FluxFilterOption({ disabled, isSearchable, name, onChange, onClear, options, searchPlaceholder }: FluxFilterCommonProps & { isSearchable?: boolean; options: FluxFilterOptionRow[]; searchPlaceholder?: string }) {
    return <OptionList disabled={disabled} name={name} onChange={onChange} onClear={onClear} options={options} isSearchable={isSearchable} searchPlaceholder={searchPlaceholder} />;
}
export function FluxFilterOptions({ disabled, isSearchable, name, onChange, onClear, options, searchPlaceholder }: FluxFilterCommonProps & { isSearchable?: boolean; options: FluxFilterOptionRow[]; searchPlaceholder?: string }) {
    return <OptionList disabled={disabled} name={name} onChange={onChange} onClear={onClear} options={options} isMultiple isSearchable={isSearchable} searchPlaceholder={searchPlaceholder} />;
}
function AsyncOptions({ fetchOptions, fetchRelevant, fetchSearch, multiple, name, searchPlaceholder }: { fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>; fetchRelevant(): Promise<FluxFilterOptionRow[]>; fetchSearch(query: string): Promise<FluxFilterOptionRow[]>; multiple?: boolean; name: string; searchPlaceholder?: string }) {
    const { state } = useFilter(),
        [options, setOptions] = useState<FluxFilterOptionRow[]>([]),
        [search, setSearch] = useState(""),
        [loading, setLoading] = useState(false);
    useEffect(() => {
        let active = true;
        setLoading(true);
        const selected = Array.isArray(state[name]) ? (state[name] as FluxFilterValue[]) : ([state[name]].filter((value) => value != null) as FluxFilterValue[]);
        Promise.all([search ? fetchSearch(search) : fetchRelevant(), selected.length ? fetchOptions(selected) : []])
            .then(([visible, current]) => active && setOptions([...visible, ...current]))
            .finally(() => active && setLoading(false));
        return () => {
            active = false;
        };
    }, [search, state[name]]);
    return (
        <div>
            <FluxFormInput placeholder={searchPlaceholder} type="search" value={search} onValueChange={(value) => setSearch(String(value ?? ""))} />
            {loading && <FluxSpinner />}
            <OptionList name={name} options={options} isMultiple={multiple} />
        </div>
    );
}
export function FluxFilterOptionAsync({ fetchOptions, fetchRelevant, fetchSearch, name, searchPlaceholder }: FluxFilterCommonProps & { fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>; fetchRelevant(): Promise<FluxFilterOptionRow[]>; fetchSearch(query: string): Promise<FluxFilterOptionRow[]>; searchPlaceholder?: string }) {
    return <AsyncOptions {...{ fetchOptions, fetchRelevant, fetchSearch, name, searchPlaceholder }} />;
}
export function FluxFilterOptionsAsync({ fetchOptions, fetchRelevant, fetchSearch, name, searchPlaceholder }: FluxFilterCommonProps & { fetchOptions(ids: FluxFilterValue[]): Promise<FluxFilterOptionRow[]>; fetchRelevant(): Promise<FluxFilterOptionRow[]>; fetchSearch(query: string): Promise<FluxFilterOptionRow[]>; searchPlaceholder?: string }) {
    return <AsyncOptions {...{ fetchOptions, fetchRelevant, fetchSearch, name, searchPlaceholder }} multiple />;
}
export function FluxFilterDate({ max, min, name }: FluxFilterCommonProps & { max?: DateTime; min?: DateTime }) {
    const { state, setValue, back } = useFilter(),
        value = DateTime.isDateTime(state[name]) ? (state[name] as DateTime) : null;
    return (
        <FluxDatePicker
            className={filterStyles.filterDatePicker}
            max={max}
            min={min}
            value={value}
            onValueChange={(next) => {
                if (DateTime.isDateTime(next)) {
                    setValue(name, next);
                    back();
                }
            }}
        />
    );
}
export function FluxFilterDateRange({ max, min, name, rangeMode = "range" }: FluxFilterCommonProps & { max?: DateTime; min?: DateTime; rangeMode?: "range" | "week" | "month" }) {
    const { state, setValue, back } = useFilter(),
        value = Array.isArray(state[name]) ? (state[name] as DateTime[]) : null;
    return (
        <FluxDatePicker
            className={filterStyles.filterDatePicker}
            max={max}
            min={min}
            rangeMode={rangeMode}
            value={value}
            onValueChange={(next) => {
                if (Array.isArray(next)) {
                    setValue(name, next);
                    back();
                }
            }}
        />
    );
}
export function FluxFilterRange({ formatter = String, isTicksVisible, max, min, name, step = 1 }: FluxFilterCommonProps & { formatter?: (value: number) => string; isTicksVisible?: boolean; max: number; min: number; step?: number }) {
    const { state, setValue } = useFilter(),
        current = Array.isArray(state[name]) ? (state[name] as number[]) : [min, max],
        update = (index: number, value: number) => {
            const next: [number, number] = [Number(current[0]), Number(current[1])];
            next[index] = value;
            if (next[0] > next[1]) next[index ? 0 : 1] = value;
            setValue(name, next);
        };
    return (
        <FluxPaneBody>
            <FluxFormColumn>
                <FluxFormField label="Min" valueLabel={formatter(current[0])}>
                    <FluxFormSlider isTicksVisible={isTicksVisible} min={min} max={max} step={step} value={current[0]} onValueChange={(value) => update(0, value)} />
                </FluxFormField>
                <FluxFormField label="Max" valueLabel={formatter(current[1])}>
                    <FluxFormSlider isTicksVisible={isTicksVisible} min={min} max={max} step={step} value={current[1]} onValueChange={(value) => update(1, value)} />
                </FluxFormField>
            </FluxFormColumn>
        </FluxPaneBody>
    );
}
