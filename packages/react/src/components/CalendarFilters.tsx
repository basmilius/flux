import {useFluxTranslate} from '../i18n';
import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { Children, createContext, isValidElement, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { FluxIconName } from '../types';
import { FluxButtonGroup, FluxSecondaryButton } from './Actions';
import { FluxActionBar } from './Composition';
import { FluxLayerPane } from './DisplayExtended';
import { FluxPane, FluxPaneBody } from './Display';
import { FluxSpinner } from './Feedback';
import { FluxFormColumn, FluxFormField, FluxFormInput } from './Forms';
import { FluxFormSlider } from './AdvancedForms';
import { FluxIcon } from './Icon';
import {FluxFadeTransition, FluxVerticalWindowTransition, FluxWindowTransition} from './Transitions';
import calendarStyles from '../../../components/src/css/component/Calendar.module.scss';
import pickerStyles from '../../../components/src/css/component/DatePicker.module.scss';
import filterStyles from '../../../components/src/css/component/Filter.module.scss';

function sameDay(a: DateTime, b: DateTime) {
    return a.hasSame(b, 'day');
}
function within(date: DateTime, min?: DateTime, max?: DateTime) {
    return (!min || date.endOf('day') >= min.startOf('day')) && (!max || date.startOf('day') <= max.endOf('day'));
}
function monthGrid(view: DateTime) {
    const start = view.startOf('month').startOf('week');
    return Array.from({ length: 42 }, (_, index) => start.plus({ days: index }));
}

export type FluxDatePickerValue = DateTime | DateTime[] | null;
export function FluxDatePicker({ className, defaultValue = null, max, min, onValueChange, rangeMode, value }: Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> & { defaultValue?: FluxDatePickerValue; max?: DateTime; min?: DateTime; onValueChange?: (value: FluxDatePickerValue) => void; rangeMode?: 'range' | 'week' | 'month'; value?: FluxDatePickerValue }) {
    const translate = useFluxTranslate();

    const controlled = value !== undefined,
        [inner, setInner] = useState<FluxDatePickerValue>(defaultValue),
        current = controlled ? value : inner,
        initial = Array.isArray(current) ? current.at(-1) : current,
        [view, setView] = useState((initial ?? DateTime.now()).startOf('month')),
        [mode, setMode] = useState<'date' | 'month' | 'year'>('date'),
        [isBack, setBack] = useState(false),
        [start, setStart] = useState<DateTime | null>(null),
        [hovered, setHovered] = useState<DateTime | null>(null),
        [focusDate, setFocusDate] = useState(initial ?? DateTime.now()),
        id = useId(),
        dates = monthGrid(view);
    const dayRefs = useRef(new Map<string, HTMLButtonElement>()),
        requestedFocus = useRef<string | null>(null),
        monthAvailable = (month: DateTime) => within(month.startOf('month'), min, max) || within(month.endOf('month'), min, max) || Boolean(min && max && min < month.startOf('month') && max > month.endOf('month')),
        focusTarget = focusDate.hasSame(view, 'month') && within(focusDate, min, max) ? focusDate : dates.find((date) => date.hasSame(view, 'month') && within(date, min, max));
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
            if (rangeMode === 'week') emit([DateTime.max(date.startOf('week'), min?.startOf('day') ?? date.startOf('week')), DateTime.min(date.endOf('week'), max?.endOf('day') ?? date.endOf('week'))]);
            else if (rangeMode === 'month') emit([DateTime.max(date.startOf('month'), min?.startOf('day') ?? date.startOf('month')), DateTime.min(date.endOf('month'), max?.endOf('day') ?? date.endOf('month'))]);
            else if (rangeMode === 'range') {
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
            if (event.key === 'ArrowLeft') next = date.minus({ days: 1 });
            else if (event.key === 'ArrowRight') next = date.plus({ days: 1 });
            else if (event.key === 'ArrowUp') next = date.minus({ days: 7 });
            else if (event.key === 'ArrowDown') next = date.plus({ days: 7 });
            else if (event.key === 'Home') next = date.startOf('week');
            else if (event.key === 'End') next = date.endOf('week').startOf('day');
            else if (event.key === 'PageUp') next = date.minus({ months: 1 });
            else if (event.key === 'PageDown') next = date.plus({ months: 1 });
            if (!next || !within(next, min, max)) return;
            event.preventDefault();
            requestedFocus.current = next.toISODate();
            setFocusDate(next);
            if (!next.hasSame(view, 'month')) setView(next.startOf('month'));
        },
        navigateMonth = (amount: number) => {
            setBack(amount < 0);
            const nextView = view.plus({ months: amount }).startOf('month'),
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
                <FluxFadeTransition show={mode === 'date'}><FluxSecondaryButton disabled={!monthAvailable(view.minus({ months: 1 }))} iconLeading="angle-left" aria-label={translate('flux.previous')} onClick={() => navigateMonth(-1)} /></FluxFadeTransition>
                <div className={pickerStyles.datePickerHeaderView} id={id} aria-live="polite">
                    <button className={pickerStyles.datePickerHeaderViewButton} type="button" onClick={() => setMode(mode === 'month' ? 'date' : 'month')}>
                        {view.toFormat('LLLL')}
                    </button>
                    <button className={pickerStyles.datePickerHeaderViewButton} type="button" onClick={() => setMode(mode === 'year' ? 'date' : 'year')}>
                        {view.year}
                    </button>
                </div>
                <FluxFadeTransition show={mode === 'date'}><FluxSecondaryButton disabled={!monthAvailable(view.plus({ months: 1 }))} iconLeading="angle-right" aria-label={translate('flux.next')} onClick={() => navigateMonth(1)} /></FluxFadeTransition>
            </div>
            <FluxVerticalWindowTransition isBack={mode === 'date'}>{mode === 'date' ? (
                <div key="date" className={pickerStyles.datePickerDates} aria-labelledby={id} onMouseLeave={() => setHovered(null)}>
                    <FluxWindowTransition isBack={isBack}><div key={view.toISODate()} className={pickerStyles.datePickerDatesGrid}>
                        {Array.from({ length: 7 }, (_, index) => (
                            <span key={index} className={pickerStyles.datePickerDay}>
                                {DateTime.now().startOf('week').plus({ days: index }).toFormat('ccc')}
                            </span>
                        ))}
                        {dates.map((date) => {
                            const disabled = date.month !== view.month || !within(date, min, max),
                                inRange = range && date >= range[0].startOf('day') && date <= range[1].endOf('day'),
                                preview = start && hovered && date >= DateTime.min(start, hovered) && date <= DateTime.max(start, hovered),
                                isFocusTarget = Boolean(focusTarget && sameDay(date, focusTarget));
                            return (
                                <button key={date.toISODate()} ref={element => {const key = date.toISODate()!; if (element) dayRefs.current.set(key, element); else dayRefs.current.delete(key);}} className={clsx(pickerStyles.datePickerDate, disabled && pickerStyles.isDisabled, selected(date) && pickerStyles.isSelected, inRange && pickerStyles.isRangeEntry, range && sameDay(date, range[0]) && pickerStyles.isRangeStart, range && sameDay(date, range[1]) && pickerStyles.isRangeEnd, preview && pickerStyles.isSelectionEntry, start && hovered && sameDay(date, DateTime.min(start, hovered)) && pickerStyles.isSelectionStart, start && hovered && sameDay(date, DateTime.max(start, hovered)) && pickerStyles.isSelectionEnd)} tabIndex={disabled || !isFocusTarget ? -1 : 0} disabled={disabled} type="button" onFocus={() => setFocusDate(date)} onKeyDown={event => moveFocus(event, date)} onMouseEnter={() => {if (start && !disabled) setHovered(date);}} onClick={() => select(date)}>
                                    {date.day}
                                </button>
                            );
                        })}
                    </div></FluxWindowTransition>
                </div>
            ) : mode === 'month' ? (
                <div key="month" className={pickerStyles.datePickerMonths}>
                    {Array.from({ length: 12 }, (_, month) => (
                        <FluxSecondaryButton
                            key={month}
                            label={view.set({ month: month + 1 }).toFormat('LLL')}
                            disabled={!monthAvailable(view.set({month: month + 1}))}
                            onClick={() => {
                                setView(view.set({ month: month + 1 }));
                                setMode('date');
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div key="year" className={pickerStyles.datePickerYears}>
                    <FluxSecondaryButton iconLeading="angle-left" onClick={() => setView(view.minus({ years: 12 }))} />
                    {Array.from({ length: 12 }, (_, index) => view.year - 5 + index).map((year) => (
                        <FluxSecondaryButton
                            key={year}
                            label={String(year)}
                            onClick={() => {
                                setView(view.set({ year }));
                                setMode('date');
                            }}
                        />
                    ))}
                    <FluxSecondaryButton iconLeading="angle-right" onClick={() => setView(view.plus({ years: 12 }))} />
                </div>
            )}</FluxVerticalWindowTransition>
        </div>
    );
}

export {FluxCalendar, FluxCalendarItem, type FluxCalendarItemProps, type FluxCalendarView, type FluxCalendarProps, type FluxCalendarReschedule, type FluxCalendarResize} from './Calendar';

export {FilterContext, FluxFilter, FluxFilterBar, FluxFilterOption, FluxFilterOptions, FluxFilterOptionAsync, FluxFilterOptionsAsync, FluxFilterDate, FluxFilterDateRange, FluxFilterRange} from './Filters';
export type {FilterContextValue, FluxFilterValueSingle, FluxFilterValue, FluxFilterState, FluxFilterCommonProps, FluxFilterOptionItem, FluxFilterOptionHeader, FluxFilterOptionRow} from './Filters';
