import {clsx} from 'clsx';
import {DateTime} from 'luxon';
import {createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type DragEvent, type KeyboardEvent, type MouseEventHandler, type ReactNode} from 'react';
import {useFluxLocale, useFluxTranslate} from '../i18n';
import {FluxActionBar} from './Composition';
import {FluxButtonGroup} from './Actions';
import {FluxSecondaryButton} from './Actions';
import {FluxPane} from './Display';
import {FluxLayerPane} from './DisplayExtended';
import {FluxSpinner} from './Feedback';
import {FluxFlyout} from './Overlays';
import {FluxDatePicker} from './CalendarFilters';
import {FluxWindowTransition} from './Transitions';
import {positionCalendarItems, type TimedEntry} from './calendarLayout';
import styles from '../../../components/src/css/component/Calendar.module.scss';
import pickerStyles from '../../../components/src/css/component/DatePicker.module.scss';

export type FluxCalendarView = 'month' | 'week' | 'two-days' | 'day';
export interface FluxCalendarItemProps {
    allDay?: boolean;
    children?: ReactNode;
    date: DateTime;
    duration?: number;
    id?: string | number;
    onClick?: MouseEventHandler<HTMLElement>;
}
interface CalendarEntry extends FluxCalendarItemProps {id: string | number;}
export interface CalendarContext {
    isDraggable: boolean;
    resolvedView: FluxCalendarView;
    hourRange: readonly [number, number];
    pixelsPerMinute: number;
    snapMinutes: number;
    grabbedId: string | number | null;
    registerItem(id: string | number, item: CalendarEntry): void;
    unregisterItem(id: string | number): void;
    registerItemElement(element: HTMLElement, id: string | number): void;
    unregisterItemElement(element: HTMLElement): void;
    dragStart(item: CalendarEntry, event: DragEvent): void;
    dragEnd(): void;
    keyboard(item: CalendarEntry, event: KeyboardEvent): void;
}
export const CalendarContext = createContext<CalendarContext | null>(null);
export function FluxCalendarItem(props: FluxCalendarItemProps) {
    const calendar = useContext(CalendarContext);
    const register = calendar?.registerItem;
    const unregister = calendar?.unregisterItem;
    useLayoutEffect(() => {
        if (props.id === undefined) return;
        register?.(props.id, {...props, id: props.id});
    }, [register, props.id, props.date.toMillis(), props.duration, props.allDay, props.children, props.onClick]);
    useLayoutEffect(() => () => {if (props.id !== undefined) unregister?.(props.id);}, [unregister, props.id]);
    return <span aria-hidden="true" style={{display: 'none'}} />;
}
export interface FluxCalendarReschedule {id: string | number; fromDate: DateTime; toDate: DateTime;}
export interface FluxCalendarResize extends FluxCalendarReschedule {fromDuration: number; toDuration: number;}
export interface FluxCalendarProps {
    children?: ReactNode;
    className?: string;
    draggable?: boolean;
    hourRange?: readonly [number, number];
    initialDate?: DateTime;
    isLoading?: boolean;
    onNavigate?: (focus: DateTime, start: DateTime, end: DateTime) => void;
    onReschedule?: (event: FluxCalendarReschedule) => void;
    onResize?: (event: FluxCalendarResize) => void;
    onDragStart?: (event: {id: string | number; fromDate: DateTime}) => void;
    onDragEnd?: (event: {id: string | number}) => void;
    onKeyboardGrab?: (event: {id: string | number; fromDate: DateTime}) => void;
    onKeyboardCommit?: (event: {id: string | number}) => void;
    onKeyboardCancel?: (event: {id: string | number}) => void;
    pixelsPerMinute?: number;
    view?: FluxCalendarView;
}
export function FluxCalendar({children, className, draggable = false, hourRange = [0, 24], initialDate, isLoading, pixelsPerMinute = .8, view, ...events}: FluxCalendarProps) {
    const translate = useFluxTranslate();
    const locale = useFluxLocale();
    const callbacks = useRef(events);
    callbacks.current = events;
    const [width, setWidth] = useState(() => typeof window === 'undefined' ? 1280 : innerWidth);
    const resolvedView = view ?? (width >= 1280 ? 'month' : width >= 1024 ? 'week' : width >= 768 ? 'two-days' : 'day');
    const dayCount = resolvedView === 'week' ? 7 : resolvedView === 'two-days' ? 2 : 1;
    const [monthFocus, setMonthFocus] = useState(() => initialDate ?? DateTime.now());
    const [timeFocus, setTimeFocus] = useState(() => (initialDate ?? DateTime.now()).startOf(dayCount === 7 ? 'week' : 'day'));
    const focus = (resolvedView === 'month' ? monthFocus : timeFocus).setLocale(locale);
    const [back, setBack] = useState(false);
    const [yearPage, setYearPage] = useState(0);
    const [items, setItems] = useState<CalendarEntry[]>([]);
    const [drag, setDrag] = useState<{id: string | number; fromDate: DateTime} | null>(null);
    const dragRef = useRef(drag);
    dragRef.current = drag;
    const [grabbedId, setGrabbed] = useState<string | number | null>(null);
    const [live, setLive] = useState('');
    const [dropDay, setDropDay] = useState<string | null>(null);
    const [dropMinute, setDropMinute] = useState<number | null>(null);
    const [dropAllDay, setDropAllDay] = useState<string | null>(null);
    const [resizePreview, setResizePreview] = useState<TimedEntry | null>(null);
    const resizing = useRef<{item: TimedEntry; edge: 'top' | 'bottom'; startY: number; preview: TimedEntry} | null>(null);
    const resizeCleanup = useRef<() => void>(() => {});
    const navTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const elementRegistry = useRef(new Map<string | number, HTMLElement>());
    const registerItem = useCallback((id: string | number, item: CalendarEntry) => setItems(current => current.some(entry => entry.id === id) ? current.map(entry => entry.id === id ? item : entry) : [...current, item]), []);
    const unregisterItem = useCallback((id: string | number) => setItems(current => current.filter(entry => entry.id !== id)), []);
    const range: readonly [number, number] = hourRange[0] < 0 || hourRange[1] > 24 || hourRange[0] >= hourRange[1] ? [0, 24] : hourRange;
    const dates = useMemo(() => {
        const start = resolvedView === 'month' ? focus.startOf('month').startOf('week') : focus;
        return Array.from({length: resolvedView === 'month' ? 42 : dayCount}, (_, index) => start.plus({days: index}));
    }, [focus.toMillis(), locale, resolvedView]);
    const layout = useMemo(() => dates.map(date => ({date, timed: positionCalendarItems(items, date, range, pixelsPerMinute, resizePreview), allDay: items.filter(item => item.allDay && item.date.hasSame(date, 'day'))})), [dates, items, range[0], range[1], pixelsPerMinute, resizePreview]);
    useEffect(() => {const resize = () => setWidth(innerWidth); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);}, []);
    useEffect(() => {if (initialDate) {setMonthFocus(initialDate); setTimeFocus(initialDate.startOf(dayCount === 7 ? 'week' : 'day'));}}, [initialDate?.toMillis()]);
    useEffect(() => {setTimeFocus(date => date.startOf(dayCount === 7 ? 'week' : 'day'));}, [dayCount]);
    useEffect(() => {callbacks.current.onNavigate?.(focus, dates[0], dates.at(-1)!);}, [focus.toMillis(), resolvedView]);
    useEffect(() => {if (grabbedId !== null) {callbacks.current.onKeyboardCancel?.({id: grabbedId}); setGrabbed(null);}}, [resolvedView]);
    useEffect(() => {setYearPage(0);}, [monthFocus.toMillis()]);
    useEffect(() => {
        const end = () => finishDrag();
        document.addEventListener('dragend', end);
        return () => {document.removeEventListener('dragend', end); clearTimeout(navTimer.current); resizeCleanup.current();};
    }, []);
    function setFocus(date: DateTime) {
        const next = resolvedView === 'month' ? date : date.startOf(dayCount === 7 ? 'week' : 'day');
        setBack(next < focus);
        if (resolvedView === 'month') setMonthFocus(next); else setTimeFocus(next);
    }
    const navigation = useRef<(direction: number) => void>(() => {});
    navigation.current = direction => setFocus(focus.plus(resolvedView === 'month' ? {months: direction} : {days: direction * dayCount}));
    function finishDrag() {
        const current = dragRef.current;
        if (!current) return;
        callbacks.current.onDragEnd?.({id: current.id});
        dragRef.current = null;
        setDrag(null);
        clearTimeout(navTimer.current);
        setDropDay(null); setDropMinute(null); setDropAllDay(null);
    }
    function drop(date: DateTime) {
        const current = dragRef.current;
        if (!current) return;
        callbacks.current.onReschedule?.({...current, toDate: date});
        finishDrag();
    }
    function keyboard(item: CalendarEntry, event: KeyboardEvent) {
        if (!draggable) return;
        const grabbed = item.id === grabbedId;
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault(); event.stopPropagation();
            setGrabbed(grabbed ? null : item.id);
            if (grabbed) callbacks.current.onKeyboardCommit?.({id: item.id}); else callbacks.current.onKeyboardGrab?.({id: item.id, fromDate: item.date});
            setLive(translate(grabbed ? 'flux.releasedAnnounce' : 'flux.grabbedAnnounce'));
        } else if (grabbed && (event.key === 'Escape' || event.key === 'Tab')) {
            event.preventDefault(); event.stopPropagation(); setGrabbed(null);
            callbacks.current.onKeyboardCancel?.({id: item.id});
            setLive(translate('flux.releasedAnnounce'));
        } else if (grabbed && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault(); event.stopPropagation();
            const delta = event.key === 'ArrowLeft' ? {days: -1} : event.key === 'ArrowRight' ? {days: 1} : resolvedView === 'month' ? {days: event.key === 'ArrowUp' ? -7 : 7} : {minutes: event.key === 'ArrowUp' ? -30 : 30};
            const toDate = item.date.plus(delta);
            callbacks.current.onReschedule?.({id: item.id, fromDate: item.date, toDate});
            if (resolvedView === 'month' ? toDate.month !== focus.month : toDate.startOf('day') < dates[0] || toDate.startOf('day') > dates.at(-1)!) setFocus(toDate);
            requestAnimationFrame(() => elementRegistry.current.get(item.id)?.focus());
        }
    }
    const context: CalendarContext = {
        isDraggable: draggable, resolvedView, hourRange: range, pixelsPerMinute, snapMinutes: 30, grabbedId, registerItem, unregisterItem,
        registerItemElement(element, id) {elementRegistry.current.set(id, element);},
        unregisterItemElement(element) {for (const [id, registered] of elementRegistry.current) if (registered === element) elementRegistry.current.delete(id);},
        keyboard,
        dragStart(item, event) {
            if (grabbedId !== null) {setGrabbed(null); callbacks.current.onKeyboardCancel?.({id: grabbedId});}
            const next = {id: item.id, fromDate: item.date};
            dragRef.current = next; setDrag(next);
            event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', String(item.id));
            callbacks.current.onDragStart?.(next);
        },
        dragEnd: finishDrag
    };
    function dragOver(event: DragEvent) {if (!draggable || !drag) return false; event.preventDefault(); event.dataTransfer.dropEffect = 'move'; return true;}
    function navProps(direction: number) {
        return {
            onDragEnter() {if (!dragRef.current) return; clearTimeout(navTimer.current); const tick = () => {navigation.current(direction); navTimer.current = setTimeout(tick, 450);}; navTimer.current = setTimeout(tick, 700);},
            onDragOver: dragOver,
            onDragLeave(event: DragEvent) {if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) clearTimeout(navTimer.current);}
        };
    }
    function minutesAt(event: DragEvent) {return Math.max(range[0] * 60, Math.min(range[1] * 60 - 30, Math.round((range[0] * 60 + (event.clientY - event.currentTarget.getBoundingClientRect().top) / pixelsPerMinute) / 30) * 30));}
    function dateAt(date: DateTime, minutes: number) {return date.startOf('day').plus({minutes});}
    function startResize(item: TimedEntry, edge: 'top' | 'bottom', event: React.MouseEvent) {
        event.preventDefault(); event.stopPropagation();
        resizeCleanup.current();
        const duration = item.duration ?? 60;
        const original = {...item, duration};
        resizing.current = {item: original, edge, startY: event.clientY, preview: original};
        setResizePreview(original);
        const move = (event: MouseEvent) => {
            const state = resizing.current;
            if (!state) return;
            const delta = Math.round((event.clientY - state.startY) / pixelsPerMinute / 30) * 30;
            const start = item.date.hour * 60 + item.date.minute;
            const nextStart = Math.max(range[0] * 60, Math.min(start + duration - 30, start + delta));
            const preview = edge === 'bottom' ? {...item, duration: Math.min(Math.max(30, duration + delta), range[1] * 60 - start)} : {...item, date: dateAt(item.date, nextStart), duration: start + duration - nextStart};
            state.preview = preview; setResizePreview(preview);
        };
        const end = () => {
            const preview = resizing.current?.preview;
            resizeCleanup.current(); resizing.current = null; setResizePreview(null);
            if (preview && (preview.date.toMillis() !== item.date.toMillis() || preview.duration !== duration)) callbacks.current.onResize?.({id: item.id, fromDate: item.date, toDate: preview.date, fromDuration: duration, toDuration: preview.duration!});
        };
        document.addEventListener('mousemove', move); document.addEventListener('mouseup', end);
        resizeCleanup.current = () => {document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', end);};
    }
    const first = dates[0], last = dates.at(-1)!;
    const rangeLabel = dayCount === 1 ? first.toLocaleString({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) : `${first.toLocaleString(first.month === last.month && first.year === last.year ? {weekday: 'short', day: 'numeric'} : {weekday: 'short', day: 'numeric', month: 'short'})} – ${last.toLocaleString({weekday: 'short', day: 'numeric', month: 'short', year: first.year === last.year ? undefined : 'numeric'})}`;
    return <CalendarContext.Provider value={context}><FluxLayerPane className={clsx(styles.calendar, className)}>
        <FluxActionBar className={styles.calendarActions} primary={<div className={styles.calendarCurrent} role="presentation">
            {resolvedView === 'month' ? <>
                <FluxFlyout width={300} opener={({open}) => <button className={styles.calendarCurrentMonth} aria-label={translate('flux.selectMonth')} type="button" onClick={open}>{focus.toLocaleString({month: 'long'})}</button>}>{({close}) => <div className={pickerStyles.datePickerMonths}>{Array.from({length: 12}, (_, index) => focus.set({month: index + 1})).map(month => <FluxSecondaryButton key={month.month} tabIndex={-1} label={month.toLocaleString({month: 'short'})} onClick={() => {setFocus(month); close();}} />)}</div>}</FluxFlyout>
                <FluxFlyout width={300} opener={({open}) => <button className={styles.calendarCurrentYear} aria-label={translate('flux.selectYear')} type="button" onClick={open}>{focus.year}</button>}>{({close}) => <div className={pickerStyles.datePickerYears}><FluxSecondaryButton aria-label={translate('flux.previousYears')} iconLeading="angle-left" tabIndex={-1} onClick={() => setYearPage(value => value - 1)} />{Array.from({length: 10}, (_, index) => focus.year - focus.year % 10 + yearPage * 10 + index).map(year => <FluxSecondaryButton key={year} label={String(year)} tabIndex={-1} onClick={() => {setFocus(focus.set({year})); close();}} />)}<FluxSecondaryButton aria-label={translate('flux.nextYears')} iconLeading="angle-right" tabIndex={-1} onClick={() => setYearPage(value => value + 1)} /></div>}</FluxFlyout>
            </> : <FluxFlyout width={320} opener={({open}) => <button type="button" className={styles.calendarRangeLabel} aria-label={translate('flux.selectDate')} onClick={open}>{rangeLabel}</button>}>{({close}) => <FluxDatePicker value={focus} onValueChange={value => {if (value && !Array.isArray(value)) {setFocus(value); close();}}} />}</FluxFlyout>}
        </div>} actionsEnd={<><FluxSecondaryButton label={translate('flux.today')} aria-label={translate('flux.today')} onClick={() => setFocus(DateTime.now())} /><FluxButtonGroup><FluxSecondaryButton {...navProps(-1)} aria-label={translate('flux.previous')} iconLeading="angle-left" onClick={() => navigation.current(-1)} /><FluxSecondaryButton {...navProps(1)} aria-label={translate('flux.next')} iconLeading="angle-right" onClick={() => navigation.current(1)} /></FluxButtonGroup></>} />
        <FluxPane className={styles.calendarView}>
            {resolvedView === 'month' ? <FluxWindowTransition isBack={back}><div key={`${focus.year}-${focus.month}`} className={styles.calendarCells} role="grid">
                {dates.slice(0, 7).map(date => <div key={date.weekday} className={styles.calendarDay}>{date.toLocaleString({weekday: 'long'})}</div>)}
                {dates.map(date => <div key={date.toISODate()} className={clsx(styles.calendarEntry, date.month !== focus.month && styles.isDisabled, date.hasSame(DateTime.now(), 'day') && styles.isToday, grabbedId !== null && items.some(item => item.id === grabbedId && item.date.hasSame(date, 'day')) && styles.isFocused, draggable && dropDay === date.toSQLDate() && styles.isDropTarget)} role="gridcell" onDragOver={event => {if (dragOver(event)) setDropDay(date.toSQLDate());}} onDragLeave={() => setDropDay(null)} onDrop={event => {if (draggable) {event.preventDefault(); drop(date.startOf('day'));}}}>
                    <div className={styles.calendarEvents}>{items.filter(item => item.date.hasSame(date, 'day')).map(item => <CalendarItem key={item.id} item={item} />)}</div><span className={styles.calendarEntryDate}>{date.toLocaleString({day: 'numeric'})}</span>
                </div>)}
            </div></FluxWindowTransition> : <div className={styles.timeGrid} style={{'--hour-height': `${pixelsPerMinute * 60}px`} as CSSProperties}><FluxWindowTransition isBack={back}><div key={`${dayCount}-${first.toISODate()}`} className={styles.timeGridInner}>
                <div className={styles.timeGridHeader}><div className={styles.timeGridHeaderGutter} /><div className={styles.timeGridHeaderDays}>{dates.map(date => <div key={date.toISODate()} className={clsx(styles.timeGridHeaderDay, date.hasSame(DateTime.now(), 'day') && styles.isToday)}>{date.toLocaleString(dayCount === 1 ? {weekday: 'long', day: 'numeric', month: 'long'} : dayCount === 2 ? {weekday: 'long', day: 'numeric', month: 'short'} : {weekday: 'short', day: 'numeric'})}</div>)}</div></div>
                <div className={styles.timeGridAllDay}><div className={styles.timeGridAllDayLabel}>{translate('flux.allDay')}</div><div className={styles.timeGridAllDayDays}>{layout.map(({date, allDay}) => <div key={date.toISODate()} className={clsx(styles.timeGridAllDayCell, draggable && dropAllDay === date.toSQLDate() && styles.isDropTarget)} onDragOver={event => {if (dragOver(event)) {setDropAllDay(date.toSQLDate()); setDropDay(null); setDropMinute(null);}}} onDragLeave={() => setDropAllDay(null)} onDrop={event => {if (draggable) {event.preventDefault(); drop(date.startOf('day'));}}}>{allDay.map(item => <CalendarItem key={item.id} item={item} />)}</div>)}</div></div>
                <div className={styles.timeGridBody}><div className={styles.timeGridHours}>{Array.from({length: range[1] - range[0]}, (_, index) => range[0] + index).map(hour => <div key={hour} className={styles.timeGridHourLabel} style={{height: pixelsPerMinute * 60}}><span className={styles.timeGridHourLabelText}>{DateTime.fromObject({hour}).toFormat('HH:mm')}</span></div>)}</div><div className={styles.timeGridDays}>
                    {layout.map(({date, timed}) => <div key={date.toISODate()} className={clsx(styles.timeGridDay, draggable && dropDay === date.toSQLDate() && styles.isDropTarget)} style={{height: (range[1] - range[0]) * 60 * pixelsPerMinute}} onDragOver={event => {if (dragOver(event)) {setDropDay(date.toSQLDate()); setDropMinute(minutesAt(event)); setDropAllDay(null);}}} onDragLeave={() => {setDropDay(null); setDropMinute(null);}} onDrop={event => {if (draggable) {event.preventDefault(); drop(dateAt(date, minutesAt(event)));}}}>
                        {timed.map(item => <div key={item.data.id} className={clsx(styles.timeGridDayItem, item.clippedTop && styles.isClippedTop, item.clippedBottom && styles.isClippedBottom, resizePreview?.id === item.data.id && styles.isResizing)} style={{top: item.top, height: item.height, left: `${item.left}%`, width: `${item.width}%`}}><div className={styles.timeGridDayItemBody}><CalendarItem item={item.data} />{draggable && !drag && <><div className={clsx(styles.timeGridDayItemHandle, styles.isTop)} onMouseDown={event => startResize({...item.data, date: item.date, duration: item.duration}, 'top', event)} /><div className={clsx(styles.timeGridDayItemHandle, styles.isBottom)} onMouseDown={event => startResize({...item.data, date: item.date, duration: item.duration}, 'bottom', event)} /></>}</div></div>)}
                        {dropDay === date.toSQLDate() && dropMinute !== null && <div className={styles.timeGridDropIndicator} style={{top: (dropMinute - range[0] * 60) * pixelsPerMinute}} />}
                    </div>)}
                </div></div>
            </div></FluxWindowTransition></div>}
            {isLoading && <div className={styles.calendarLoader}><FluxSpinner /></div>}
            <div className={styles.calendarItemRegistry} aria-hidden="true">{children}</div>
        <span aria-live="polite" style={{position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)'}}>{live}</span>
        </FluxPane>
    </FluxLayerPane></CalendarContext.Provider>;
}
function CalendarItem({item}: {item: CalendarEntry}) {
    const calendar = useContext(CalendarContext)!;
    const ref = useRef<HTMLButtonElement>(null);
    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        calendar.registerItemElement(element, item.id);
        return () => calendar.unregisterItemElement(element);
    }, [item.id]);
    return <button ref={ref} className={clsx(styles.calendarItem, item.onClick && styles.isClickable, calendar.isDraggable && styles.isDraggable, calendar.grabbedId === item.id && styles.isGrabbed, item.allDay && styles.isAllDay)} draggable={calendar.isDraggable} tabIndex={calendar.isDraggable ? 0 : undefined} type="button" onClick={item.onClick} onDragStart={event => {if (calendar.isDraggable) calendar.dragStart(item, event);}} onDragEnd={calendar.dragEnd} onKeyDown={event => calendar.keyboard(item, event)}>{item.children}</button>;
}
