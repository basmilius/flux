import {clsx} from 'clsx';
import {Children, cloneElement, createContext, isValidElement, useContext, useId, useLayoutEffect, useRef, useState} from 'react';
import type {ButtonHTMLAttributes, HTMLAttributes, KeyboardEvent, ReactElement, ReactNode} from 'react';
import type {FluxIconName, FluxPressableType, FluxSize, FluxStyle, FluxTo} from '../types';
import {FluxPressable} from './Actions';
import {FluxIcon} from './Icon';
import breadcrumbStyles from '../../../components/src/css/component/Breadcrumb.module.scss';
import paginationStyles from '../../../components/src/css/component/Pagination.module.scss';
import segmentedStyles from '../../../components/src/css/component/SegmentedControl.module.scss';
import tabStyles from '../../../components/src/css/component/Tab.module.scss';

const BreadcrumbContext = createContext<FluxIconName>('angle-right');

export function useFluxBreadcrumbSeparator() {
    return useContext(BreadcrumbContext);
}

export function FluxBreadcrumb({ariaLabel = 'Breadcrumb', children, className, separator = 'angle-right', ...props}: Omit<HTMLAttributes<HTMLElement>, 'aria-label'> & {ariaLabel?: string; separator?: FluxIconName}) {
    return <BreadcrumbContext.Provider value={separator}><nav {...props} className={clsx(breadcrumbStyles.breadcrumb, className)} aria-label={ariaLabel}><ol className={breadcrumbStyles.breadcrumbList}>{children}</ol></nav></BreadcrumbContext.Provider>;
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
    const isCurrent = currentProp ?? type === 'none';
    return <li className={clsx(breadcrumbStyles.breadcrumbItem, className)}>
        <FluxPressable {...props} className={clsx(breadcrumbStyles.breadcrumbLink, isCurrent && breadcrumbStyles.isCurrent)} componentType={type} href={href} to={to} aria-current={isCurrent ? 'page' : undefined}>
            {leading}{icon && <FluxIcon className={breadcrumbStyles.breadcrumbIcon} name={icon} size={16} />}
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
    const pages = Math.ceil(total / Math.max(1, perPage));
    const visible = visiblePages(page, pages);
    const button = (target: number, label?: string) => <button className={clsx(paginationStyles.paginationButton, target === page && paginationStyles.paginationButtonCurrent)} type="button" aria-current={target === page ? 'page' : undefined} aria-label={label ?? `Go to page ${target}`} onClick={() => target !== page && onNavigate(target)}><span className={paginationStyles.paginationButtonLabel}>{target}</span></button>;
    return <nav {...props} className={clsx(paginationStyles.pagination, className)} aria-label="Pagination">
        {(arrows || isCompact) && <button className={clsx(paginationStyles.paginationButton, paginationStyles.paginationButtonArrow)} disabled={page <= 1} type="button" aria-label="Previous" onClick={() => onNavigate(page - 1)}><FluxIcon className={paginationStyles.paginationButtonIcon} name="angle-left" /></button>}
        {!isCompact ? visible.map((entry, index) => entry === 'dots' ? <span key={`dots-${index}`} className={paginationStyles.paginationDots} aria-hidden="true">…</span> : <span key={entry}>{button(entry)}</span>) : <span>{button(page, `Page ${page} of ${pages}`)}<span aria-hidden="true"> / {pages}</span></span>}
        {(arrows || isCompact) && <button className={clsx(paginationStyles.paginationButton, paginationStyles.paginationButtonArrow)} disabled={page >= pages} type="button" aria-label="Next" onClick={() => onNavigate(page + 1)}><FluxIcon className={paginationStyles.paginationButtonIcon} name="angle-right" /></button>}
    </nav>;
}

export function FluxPaginationBar({limits = [5, 10, 25, 50, 100], onLimitChange, onNavigate, page, perPage, total, ...props}: HTMLAttributes<HTMLDivElement> & {limits?: number[]; onLimitChange: (limit: number) => void; onNavigate: (page: number) => void; page: number; perPage: number; total: number}) {
    const from = total === 0 ? 0 : (page - 1) * perPage + 1;
    const to = Math.min(total, page * perPage);
    return <div {...props} className={clsx(paginationStyles.paginationBar, props.className)}>{total > perPage && <FluxPagination arrows page={page} perPage={perPage} total={total} onNavigate={onNavigate} />}<div className={paginationStyles.paginationBarLimit}><span className={paginationStyles.paginationBarLimitDisplayingOf}>{from}–{to} of {total}</span><select className={paginationStyles.paginationBarLimitSelect} value={perPage} aria-label="Items per page" onChange={event => onLimitChange(Number(event.target.value))}>{limits.map(limit => <option key={limit} value={limit}>Show {limit}</option>)}</select></div></div>;
}

type SegmentValue = string | number;
interface SegmentContextValue {size: FluxSize; value?: SegmentValue; select(value: SegmentValue): void;}
const SegmentContext = createContext<SegmentContextValue | undefined>(undefined);

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
    const control = useContext(SegmentContext);
    if (!control) throw new Error('FluxSegmentedControlItem must be inside FluxSegmentedControl');
    const active = control.value === value;
    const iconSize = {small: 14, medium: 16, large: 18}[control.size];
    return <button {...props} className={clsx(segmentedStyles.segmentedControlItem, segmentedStyles[`is${capitalize(control.size)}`], active && segmentedStyles.isActive, className)} role="radio" aria-checked={active} tabIndex={active || control.value === undefined ? 0 : -1} type="button" onClick={event => {props.onClick?.(event); if (!event.defaultPrevented) control.select(value);}}>{children ?? <>{icon && <FluxIcon name={icon} size={iconSize} />}{label && <span>{label}</span>}</>}</button>;
}

const TabBarContext = createContext(false);

export function FluxTabBar({children, className, isPills, onKeyDown, ...props}: HTMLAttributes<HTMLElement> & {isPills?: boolean}) {
    return <TabBarContext.Provider value={Boolean(isPills)}><nav {...props} className={clsx(isPills ? tabStyles.tabBarPills : tabStyles.tabBarDefault, className)} role="tablist" aria-orientation="horizontal" onKeyDown={event => {onKeyDown?.(event); if (!event.defaultPrevented) rove(event, '[role=tab]:not([aria-disabled=true])', true);}}><div className={isPills ? tabStyles.tabBarTabsPills : tabStyles.tabBarTabsDefault}>{children}</div></nav></TabBarContext.Provider>;
}

export function FluxTabBarItem({children, className, disabled, end, icon, isActive, label, start, type = 'button', ...props}: Omit<React.ComponentProps<typeof FluxPressable>, 'children'> & {children?: ReactNode; end?: ReactNode; icon?: FluxIconName; isActive?: boolean; label?: ReactNode; start?: ReactNode; type?: FluxPressableType}) {
    const isPills = useContext(TabBarContext);
    return <FluxPressable {...props} className={clsx(isPills ? (isActive ? tabStyles.tabBarItemPillsActive : tabStyles.tabBarItemPills) : (isActive ? tabStyles.tabBarItemDefaultActive : tabStyles.tabBarItemDefault), className)} componentType={type} disabled={disabled} role="tab" aria-selected={Boolean(isActive)} tabIndex={disabled ? -1 : isActive ? 0 : -1}>{start}{icon && <FluxIcon name={icon} size={16} />}{label && <span>{label}</span>}{children}{end}</FluxPressable>;
}

export interface FluxTabProps extends HTMLAttributes<HTMLDivElement> {icon?: FluxIconName; label?: string;}
export function FluxTab({className, icon: _icon, label: _label, ...props}: FluxTabProps) {
    return <div {...props} className={clsx(tabStyles.tab, className)} role="tabpanel" tabIndex={props.tabIndex ?? 0} />;
}

export function FluxTabs({children, className, isPills, onValueChange, value = 0, ...props}: HTMLAttributes<HTMLDivElement> & {isPills?: boolean; onValueChange: (index: number) => void; value?: number}) {
    const id = useId().replace(/:/g, '');
    const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<FluxTabProps>[];
    const active = tabs[value];
    return <div {...props} className={clsx(tabStyles.tabs, className)}><FluxTabBar className={tabStyles.tabsBar} isPills={isPills}>{tabs.map((tab, index) => <FluxTabBarItem key={tab.key ?? index} id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} icon={tab.props.icon} label={tab.props.label} isActive={value === index} onClick={() => onValueChange(index)} />)}</FluxTabBar>{active && cloneElement(active, {id: `${id}-panel-${value}`, 'aria-labelledby': `${id}-tab-${value}`})}</div>;
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
