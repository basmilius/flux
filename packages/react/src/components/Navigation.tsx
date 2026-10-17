import {useFluxTranslate} from '../i18n';
import {clsx} from 'clsx';
import {Children, cloneElement, createContext, Fragment, isValidElement, useContext, useId, useLayoutEffect, useRef, useState} from 'react';
import type {ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactElement, ReactNode} from 'react';
import type {FluxIconName, FluxPressableType, FluxSize, FluxStyle, FluxTo} from '../types';
import {FluxPressable} from './Actions';
import {FluxIcon} from './Icon';
import {FluxSpacer} from './Layout';
import {FluxFormSelect} from './SelectionForms';
import {flattenElements} from './children';
import {FluxFlyout} from './Overlays';
import {FluxMenu, FluxMenuItem} from './Menus';
import {useFluxDisabled} from './DisplayExtended';
import {FluxFadeTransition, FluxWindowTransition} from './Transitions';
import breadcrumbStyles from '../../../components/src/css/component/Breadcrumb.module.scss';
import paginationStyles from '../../../components/src/css/component/Pagination.module.scss';
import segmentedStyles from '../../../components/src/css/component/SegmentedControl.module.scss';
import tabStyles from '../../../components/src/css/component/Tab.module.scss';

export const BreadcrumbContext = createContext<FluxIconName>('angle-right');

export function useFluxBreadcrumbSeparator() {
    return useContext(BreadcrumbContext);
}

export const BreadcrumbCollapsedContext = createContext(false);

export function useFluxBreadcrumbCollapsed() {
    return useContext(BreadcrumbCollapsedContext);
}

export interface FluxBreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, 'aria-label'> {
    ariaLabel?: string;
    collapse?: 'none' | 'start' | 'middle';
    collapseLabel?: string;
    separator?: FluxIconName;
}
export function FluxBreadcrumb({ariaLabel = 'Breadcrumb', children, className, collapse = 'none', collapseLabel = 'Show more', separator = 'angle-right', ...props}: FluxBreadcrumbProps) {
    const list = useRef<HTMLOListElement>(null);
    const measurer = useRef<HTMLOListElement>(null);
    const ellipsis = useRef<HTMLOListElement>(null);
    const [tailStart, setTailStart] = useState<number | null>(null);
    const items = flattenElements(children);
    const start = collapse === 'middle' ? 1 : 0;
    useLayoutEffect(() => {
        if (collapse === 'none') {setTailStart(null); return;}
        let frame = 0;
        const reflow = () => {
            if (!list.current || !measurer.current || !ellipsis.current) return;
            const widths = Array.from(measurer.current.children, child => (child as HTMLElement).offsetWidth);
            const count = widths.length;
            const available = list.current.clientWidth;
            // The shared stylesheet uses a 3px gap between trail items.
            if (count <= start + 1 || widths.reduce((sum, width) => sum + width, 0) + (count - 1) * 3 <= available) {setTailStart(null); return;}
            const ellipsisWidth = (ellipsis.current.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
            const selectionWidth = (from: number) => ellipsisWidth + widths.slice(0, start).reduce((sum, width) => sum + width, 0) + widths.slice(from).reduce((sum, width) => sum + width, 0) + (start + count - from) * 3;
            let from = count - 1;
            while (from - 1 >= start && selectionWidth(from - 1) <= available) from--;
            setTailStart(from);
        };
        const schedule = () => {cancelAnimationFrame(frame); frame = requestAnimationFrame(reflow);};
        reflow();
        const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule);
        if (list.current) observer?.observe(list.current);
        if (measurer.current) observer?.observe(measurer.current);
        observer?.observe(document.documentElement);
        return () => {observer?.disconnect(); cancelAnimationFrame(frame);};
    }, [children, collapse, start]);
    return <BreadcrumbContext.Provider value={separator}><nav {...props} className={clsx(breadcrumbStyles.breadcrumb, className)} aria-label={ariaLabel}>
        <ol ref={list} className={clsx(breadcrumbStyles.breadcrumbList, collapse !== 'none' && breadcrumbStyles.isCollapsible)}>
            {collapse === 'none' || tailStart === null ? children : <>{items.slice(0, start)}<BreadcrumbCollapsed label={collapseLabel}>{items.slice(start, tailStart)}</BreadcrumbCollapsed>{items.slice(tailStart)}</>}
        </ol>
        {collapse !== 'none' && <>
            <ol ref={measurer} className={breadcrumbStyles.breadcrumbMeasurer} aria-hidden="true">{children}</ol>
            <ol ref={ellipsis} className={breadcrumbStyles.breadcrumbMeasurer} aria-hidden="true"><BreadcrumbCollapsed label={collapseLabel} /><li className={breadcrumbStyles.breadcrumbItem} /></ol>
        </>}
    </nav></BreadcrumbContext.Provider>;
}
function BreadcrumbCollapsed({children, label}: {children?: ReactNode; label: string}) {
    const separator = useFluxBreadcrumbSeparator();
    return <li className={breadcrumbStyles.breadcrumbItem}>
        <FluxFlyout label={label} opener={({isOpen, toggle}) => <FluxPressable componentType="button" className={clsx(breadcrumbStyles.breadcrumbLink, breadcrumbStyles.breadcrumbCollapse, isOpen && breadcrumbStyles.isOpen)} aria-label={label} aria-haspopup="menu" aria-expanded={isOpen} onClick={toggle}><FluxIcon name="ellipsis-h" size={15} /></FluxPressable>}>
            {() => <FluxMenu><BreadcrumbCollapsedContext.Provider value>{children}</BreadcrumbCollapsedContext.Provider></FluxMenu>}
        </FluxFlyout>
        <FluxIcon className={breadcrumbStyles.breadcrumbSeparator} name={separator} size={12} aria-hidden="true" />
    </li>;
}

export interface FluxBreadcrumbItemProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
    href?: string;
    icon?: FluxIconName;
    isCurrent?: boolean;
    label?: ReactNode;
    leading?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
    to?: FluxTo;
    trailing?: ReactNode;
}

export function FluxBreadcrumbItem({children, className, href, icon, isCurrent: currentProp, label, leading, to, trailing, ...props}: FluxBreadcrumbItemProps) {
    const separator = useContext(BreadcrumbContext);
    const type: FluxPressableType = to ? 'route' : href ? 'link' : 'none';
    const isCurrent = currentProp ?? false;
    const collapsed = useFluxBreadcrumbCollapsed();
    if (collapsed) return <FluxMenuItem {...props} className={className} href={href} to={to} iconLeading={icon} label={label ?? children} before={leading} />;
    return <li className={clsx(breadcrumbStyles.breadcrumbItem, className)}>
        <FluxPressable {...props} className={clsx(breadcrumbStyles.breadcrumbLink, isCurrent && breadcrumbStyles.isCurrent)} componentType={type} href={href} to={to} aria-current={isCurrent ? 'page' : undefined}>
            {leading}{icon && <FluxIcon className={breadcrumbStyles.breadcrumbIcon} name={icon} size={15} />}
            {(label || children) && <span className={breadcrumbStyles.breadcrumbLabel}>{children ?? label}</span>}{trailing}
        </FluxPressable>
        <FluxIcon className={breadcrumbStyles.breadcrumbSeparator} name={separator} size={12} />
    </li>;
}

export interface FluxPaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onNavigate'> {
    arrows?: boolean;
    isCompact?: boolean;
    onNavigate: (page: number) => void;
    page: number;
    perPage: number;
    total: number;
}

export function FluxPagination({arrows, className, isCompact, onNavigate, page, perPage, total, ...props}: FluxPaginationProps) {
    const translate = useFluxTranslate();

    const pages = Math.ceil(total / Math.max(1, perPage));
    const visible = visiblePages(page, pages);
    const button = (target: number, label?: string) => <button className={clsx(paginationStyles.paginationButton, target === page && paginationStyles.paginationButtonCurrent)} type="button" aria-current={target === page ? 'page' : undefined} aria-label={label ?? `Go to page ${target}`} onClick={() => target !== page && onNavigate(target)}><span className={paginationStyles.paginationButtonLabel}>{target}</span></button>;
    return <nav {...props} className={clsx(paginationStyles.pagination, className)} aria-label={translate('flux.pagination')}>
        {(arrows || isCompact) && <button className={clsx(paginationStyles.paginationButton, paginationStyles.paginationButtonArrow)} disabled={page <= 1} type="button" aria-label={translate('flux.previous')} onClick={() => onNavigate(page - 1)}><FluxIcon className={paginationStyles.paginationButtonIcon} name="angle-left" /></button>}
        {!isCompact ? visible.map((entry, index) => entry === 'dots' ? <span key={`dots-${index}`} className={paginationStyles.paginationDots} aria-hidden="true">…</span> : <span key={entry}>{button(entry)}</span>) : <span>{button(page, `Page ${page} of ${pages}`)}<span aria-hidden="true"> / {pages}</span></span>}
        {(arrows || isCompact) && <button className={clsx(paginationStyles.paginationButton, paginationStyles.paginationButtonArrow)} disabled={page >= pages} type="button" aria-label={translate('flux.next')} onClick={() => onNavigate(page + 1)}><FluxIcon className={paginationStyles.paginationButtonIcon} name="angle-right" /></button>}
    </nav>;
}

export function FluxPaginationBar({limits = [5, 10, 25, 50, 100], onLimitChange, onNavigate, page, perPage, total, ...props}: HTMLAttributes<HTMLDivElement> & {limits?: number[]; onLimitChange: (limit: number) => void; onNavigate: (page: number) => void; page: number; perPage: number; total: number}) {
    const translate = useFluxTranslate();
    const from = total === 0 ? 0 : (page - 1) * perPage + 1;
    const to = Math.min(total, page * perPage);
    return <div {...props} className={clsx(paginationStyles.paginationBar, props.className)}>
        {total > perPage && <FluxPagination arrows page={page} perPage={perPage} total={total} onNavigate={onNavigate}/>}
        <FluxSpacer/>
        <div className={paginationStyles.paginationBarLimit}>
            <span className={paginationStyles.paginationBarLimitDisplayingOf}>{translate('flux.displayingOf', {from, to, total})}</span>
            <FluxFormSelect className={paginationStyles.paginationBarLimitSelect} value={perPage} options={limits.map(value => ({label: translate('flux.showN', {n: value}), value}))} onValueChange={value => {if (typeof value === 'number' && value !== perPage) onLimitChange(value);}}/>
        </div>
    </div>;
}

type SegmentValue = string | number;
export interface SegmentContextValue {size: FluxSize; value?: SegmentValue; select(value: SegmentValue): void;}
export const SegmentContext = createContext<SegmentContextValue | undefined>(undefined);

export function FluxSegmentedControl({children, className, isFill, onValueChange, size = 'medium', value, ...props}: HTMLAttributes<HTMLDivElement> & {isFill?: boolean; onValueChange: (value: SegmentValue) => void; size?: FluxSize; value?: SegmentValue}) {
    const ref = useRef<HTMLDivElement>(null);
    const [highlight, setHighlight] = useState({left: 0, width: 0});
    useLayoutEffect(() => {
        const control = ref.current;
        if (!control) return;
        const update = () => {
            const active = control.querySelector<HTMLElement>('[role=radio][aria-checked=true]');
            const width = active?.offsetWidth ?? 0;
            setHighlight(current => current.left === (active?.offsetLeft ?? 0) && current.width === width ? current : {left: active?.offsetLeft ?? 0, width});
        };
        update();
        const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
        resize?.observe(control);
        const mutation = typeof MutationObserver === 'undefined' ? undefined : new MutationObserver(update);
        mutation?.observe(control, {attributes: true, childList: true, subtree: true});
        return () => { resize?.disconnect(); mutation?.disconnect(); };
    }, [children, size, value]);
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => rove(event, '[role=radio]:not(:disabled)', false);
    return <SegmentContext.Provider value={{size, value, select: onValueChange}}><div {...props} ref={ref} className={clsx(isFill ? segmentedStyles.segmentedControlFill : segmentedStyles.segmentedControlInline, className)} role="radiogroup" onKeyDown={onKeyDown}>{highlight.width > 0 && <div className={segmentedStyles.segmentedControlHighlight} style={{left: highlight.left, width: highlight.width}} />}{children}</div></SegmentContext.Provider>;
}

export function FluxSegmentedControlItem({children, className, icon, label, value, ...props}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {icon?: FluxIconName; label?: ReactNode; value: SegmentValue}) {
    const disabled = useFluxDisabled(props.disabled);
    const control = useContext(SegmentContext);
    if (!control) throw new Error('FluxSegmentedControlItem must be inside FluxSegmentedControl');
    const active = control.value === value;
    const iconSize = {small: 14, medium: 16, large: 18}[control.size];
    return <button {...props} disabled={disabled} aria-disabled={disabled || undefined} className={clsx(segmentedStyles.segmentedControlItem, segmentedStyles[`is${capitalize(control.size)}`], active && segmentedStyles.isActive, className)} role="radio" aria-checked={active} tabIndex={active || control.value === undefined ? 0 : -1} type="button" onClick={event => {props.onClick?.(event); if (!event.defaultPrevented) control.select(value);}}>{children ?? <>{icon && <FluxIcon name={icon} size={iconSize} />}{label && <span>{label}</span>}</>}</button>;
}

export const TabBarContext = createContext(false);

export function FluxTabBar({children, className, isPills, onKeyDown, ...props}: HTMLAttributes<HTMLElement> & {isPills?: boolean}) {
    const scroller = useRef<HTMLDivElement>(null);
    const previousActive = useRef<HTMLElement | null>(null);
    const [layout, setLayout] = useState({left: 0, width: 0, start: false, end: false});

    useLayoutEffect(() => {
        const element = scroller.current;
        if (!element) return;
        const update = () => {
            const tabs = Array.from(element.querySelectorAll<HTMLElement>('[role=tab]'));
            const enabled = tabs.filter(tab => !tab.matches(':disabled,[aria-disabled=true]'));
            const active = tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
            const first = active ?? enabled[0];
            for (const tab of tabs) {
                if (!tab.hasAttribute('data-explicit-tabindex')) tab.tabIndex = tab === first && enabled.includes(tab) ? 0 : -1;
            }
            const next = {
                left: active?.offsetLeft ?? 0,
                width: active?.offsetWidth ?? 0,
                start: element.scrollLeft > 1,
                end: element.scrollWidth - element.clientWidth - element.scrollLeft > 1
            };
            setLayout(current => Object.keys(next).every(key => current[key as keyof typeof next] === next[key as keyof typeof next]) ? current : next);
            if (active && active !== previousActive.current && element.scrollWidth > element.clientWidth) {
                active.scrollIntoView?.({behavior: 'smooth', block: 'nearest', inline: 'center'});
            }
            previousActive.current = active ?? null;
        };
        update();
        const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
        resize?.observe(element);
        element.querySelectorAll<HTMLElement>('[role=tab]').forEach(tab => resize?.observe(tab));
        const mutation = new MutationObserver(update);
        mutation.observe(element, {attributes: true, attributeFilter: ['aria-selected', 'aria-disabled', 'disabled'], childList: true, characterData: true, subtree: true});
        element.addEventListener('scroll', update, {passive: true});
        return () => {
            resize?.disconnect();
            mutation.disconnect();
            element.removeEventListener('scroll', update);
        };
    }, [children, isPills]);

    const scroll = (direction: number) => scroller.current?.scrollBy({left: direction * scroller.current.clientWidth / 1.5, behavior: 'smooth'});
    return <TabBarContext.Provider value={Boolean(isPills)}>
        <nav {...props} className={clsx(isPills ? tabStyles.tabBarPills : tabStyles.tabBarDefault, className)} role="tablist" aria-orientation="horizontal" onKeyDown={event => {onKeyDown?.(event); if (!event.defaultPrevented) rove(event, '[role=tab]:not(:disabled):not([aria-disabled=true])', true);}}>
            <FluxFadeTransition show={layout.start}><button className={tabStyles.tabBarArrowStart} type="button" aria-hidden="true" tabIndex={-1} onClick={() => scroll(-1)}><FluxIcon name="angle-left" /></button></FluxFadeTransition>
            <div ref={scroller} className={clsx(isPills ? tabStyles.tabBarTabsPills : tabStyles.tabBarTabsDefault, layout.start && tabStyles.isStartMasked, layout.end && tabStyles.isEndMasked)}>
                <div className={isPills ? tabStyles.tabBarHighlightPills : tabStyles.tabBarHighlightDefault} style={{left: layout.left, width: layout.width}} aria-hidden="true" />
                {children}
            </div>
            <FluxFadeTransition show={layout.end}><button className={tabStyles.tabBarArrowEnd} type="button" aria-hidden="true" tabIndex={-1} onClick={() => scroll(1)}><FluxIcon name="angle-right" /></button></FluxFadeTransition>
        </nav>
    </TabBarContext.Provider>;
}

export function FluxTabBarItem({children, className, disabled, end, icon, isActive, label, start, tabIndex, type = 'button', ...props}: Omit<React.ComponentProps<typeof FluxPressable>, 'children'> & {children?: ReactNode; end?: ReactNode; icon?: FluxIconName; isActive?: boolean; label?: ReactNode; start?: ReactNode; type?: FluxPressableType}) {
    const isPills = useContext(TabBarContext);
    const isDisabled = useFluxDisabled(disabled);
    return <FluxPressable {...props} className={clsx(isPills ? (isActive ? tabStyles.tabBarItemPillsActive : tabStyles.tabBarItemPills) : (isActive ? tabStyles.tabBarItemDefaultActive : tabStyles.tabBarItemDefault), className)} componentType={type} disabled={isDisabled} role="tab" aria-disabled={isDisabled || undefined} aria-selected={Boolean(isActive)} data-explicit-tabindex={tabIndex !== undefined ? '' : undefined} tabIndex={isDisabled ? -1 : tabIndex ?? (isActive ? 0 : -1)}>{start}{icon && <FluxIcon name={icon} size={15} />}{label && <span>{label}</span>}{children}{end}</FluxPressable>;
}

export interface FluxTabProps extends HTMLAttributes<HTMLDivElement> {icon?: FluxIconName; label?: string;}
export function FluxTab({className, icon: _icon, label: _label, ...props}: FluxTabProps) {
    return <div {...props} className={clsx(tabStyles.tab, className)} role="tabpanel" tabIndex={props.tabIndex ?? 0} />;
}

export interface FluxTabsState {
    activate(index: number): void;
    children: ReactElement<FluxTabProps>[];
    value: number;
    tabs: {icon?: FluxIconName; label?: string}[];
}
export function FluxTabs({children, className, content, defaultValue = 0, isPills, onValueChange, tabs: renderTabs, value: controlled, ...props}: HTMLAttributes<HTMLDivElement> & {content?: (state: FluxTabsState) => ReactNode; defaultValue?: number; isPills?: boolean; onValueChange?: (index: number) => void; tabs?: (state: FluxTabsState) => ReactNode; value?: number}) {
    const id = useId().replace(/:/g, '');
    const [local, setLocal] = useState(defaultValue);
    const value = controlled ?? local;
    const previous = useRef(value);
    const direction = useRef(false);
    if (previous.current !== value) {direction.current = value < previous.current; previous.current = value;}
    const flatten = (nodes: ReactNode): ReactElement<FluxTabProps>[] => Children.toArray(nodes).flatMap(child => !isValidElement(child) ? [] : child.type === Fragment ? flatten((child.props as {children?: ReactNode}).children) : [child as ReactElement<FluxTabProps>]);
    const panels = flatten(children).map((child, index) => cloneElement(child, {key: child.key ?? index, id: `${id}-panel-${index}`, 'aria-labelledby': `${id}-tab-${index}`}));
    const state: FluxTabsState = {activate: index => {setLocal(index); onValueChange?.(index);}, children: panels, value, tabs: panels.map(child => ({icon: child.props.icon, label: child.props.label}))};
    return <div {...props} className={clsx(tabStyles.tabs, className)}>
        {renderTabs ? renderTabs(state) : <FluxTabBar className={tabStyles.tabsBar} isPills={isPills}>{state.tabs.map((tab, index) => <FluxTabBarItem key={index} id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} icon={tab.icon} label={tab.label} isActive={value === index} onClick={() => state.activate(index)} />)}</FluxTabBar>}
        {content ? content(state) : <FluxWindowTransition isBack={direction.current}>{panels[value]}</FluxWindowTransition>}
    </div>;
}

function visiblePages(page: number, total: number): Array<number | 'dots'> {
    const result: Array<number | 'dots'> = [];
    let previous = 0;
    for (let current = 1; current <= total; current++) {
        if (!(current <= 1 || current > total - 1 || (current >= page - 2 && current <= page + 2))) continue;
        const gap = current - previous - 1;
        if (gap === 1) result.push(current - 1); else if (gap > 1) result.push('dots');
        result.push(current); previous = current;
    }
    return result;
}

function rove(event: KeyboardEvent<HTMLElement>, selector: string, wrap: boolean): void {
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(selector));
    if (!items.length || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const current = Math.max(0, items.indexOf(document.activeElement as HTMLElement));
    let next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : current + (event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1);
    next = wrap ? (next + items.length) % items.length : Math.max(0, Math.min(items.length - 1, next));
    items[next]?.focus(); items[next]?.click(); event.preventDefault();
}

function capitalize(value: string): string { return value.charAt(0).toUpperCase() + value.slice(1); }
