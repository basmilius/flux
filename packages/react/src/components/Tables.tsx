import { clsx } from "clsx";
import { Children, createContext, isValidElement, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, KeyboardEvent, MouseEvent, PointerEvent as ReactPointerEvent, ReactElement, ReactNode } from "react";
import type { FluxColor, FluxIconName, FluxStyle } from "../types";
import { FluxActionStack } from "./Composition";
import { FluxSpinner } from "./Feedback";
import { FluxIcon } from "./Icon";
import { FluxPaginationBar } from "./Navigation";
import tableStyles from "../../../components/src/css/component/Table.module.scss";

export type FluxTableSort = "ascending" | "descending" | null;
export interface FluxTableColumnDef {
    align?: "start" | "center" | "end";
    isNumeric?: boolean;
    isShrinking?: boolean;
    maxWidth?: number;
    minWidth?: number;
    noWrap?: boolean;
    pinned?: "start" | "end" | null;
    width?: number;
}

interface TableContextValue {
    activeRow: HTMLElement | null;
    columns: FluxTableColumnDef[];
    setActiveRow(row: HTMLElement | null): void;
}
const TableContext = createContext<TableContextValue | null>(null);

function useTableColumnIndex(ref: React.RefObject<HTMLElement | null>, columns: FluxTableColumnDef[]) {
    const [columnIndex, setColumnIndex] = useState(0);
    useLayoutEffect(() => {
        const element = ref.current;
        if (!element?.parentElement) return;
        let next = 0;
        for (const sibling of Array.from(element.parentElement.children)) {
            if (sibling === element) break;
            next += Math.max(1, Number(sibling.getAttribute("aria-colspan") ?? 1));
        }
        setColumnIndex(current => current === next ? current : next);
    }, [columns, ref]);
    return columnIndex;
}

function columnTrack(column: FluxTableColumnDef) {
    if (column.width !== undefined) return `${column.width}px`;
    if (column.isShrinking) return "auto";
    if (column.minWidth === undefined && column.maxWidth === undefined) return "1fr";
    return `minmax(${column.minWidth === undefined ? "auto" : `${column.minWidth}px`}, ${column.maxWidth === undefined ? "1fr" : `${column.maxWidth}px`})`;
}

function inferColumns(node: ReactNode, result: FluxTableColumnDef[] = []): FluxTableColumnDef[] {
    Children.forEach(node, child => {
        if (!isValidElement(child)) return;
        if (child.type === FluxTableHeader) {
            const props = child.props as FluxTableHeaderProps;
            result.push({
                align: props.align,
                isNumeric: props.isNumeric,
                isShrinking: props.isShrinking,
                maxWidth: props.maxWidth,
                minWidth: props.minWidth,
                noWrap: props.noWrap,
                pinned: props.pinned === true ? "start" : props.pinned || undefined,
                width: props.width,
            });
            return;
        }
        inferColumns((child.props as { children?: ReactNode }).children, result);
    });
    return result;
}

function inferFallbackColumnCount(node: ReactNode): number {
    let count = 0;
    let foundRow = false;
    const visit = (value: ReactNode) => {
        Children.forEach(value, child => {
            if (foundRow || !isValidElement(child)) return;
            if (child.type === FluxTableRow) {
                foundRow = true;
                Children.forEach((child.props as { children?: ReactNode }).children, cell => {
                    if (!isValidElement(cell)) return;
                    const props = cell.props as { colspan?: number };
                    count += props.colspan ?? 1;
                });
                return;
            }
            visit((child.props as { children?: ReactNode }).children);
        });
    };
    visit(node);
    return count;
}

export interface FluxTableProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    ariaRowcount?: number;
    caption?: ReactNode;
    captionSide?: "top" | "bottom";
    children?: ReactNode;
    columns?: FluxTableColumnDef[];
    empty?: ReactNode;
    footer?: ReactNode;
    header?: ReactNode;
    isFilled?: boolean;
    isHoverable?: boolean;
    isLoading?: boolean;
    isSticky?: boolean;
    loading?: ReactNode;
    pagination?: ReactNode;
}
export function FluxTable({ ariaRowcount, caption, captionSide = "bottom", children, className, columns = [], empty, footer, header, isFilled, isHoverable, isLoading, isSticky, loading, pagination, style, ...props }: FluxTableProps) {
    const captionId = useId();
    const [activeRow, setActiveRow] = useState<HTMLElement | null>(null);
    const inferredColumns = useMemo(() => inferColumns(header), [header]);
    const resolvedColumns = columns.length ? columns : inferredColumns;
    const fallbackColumnCount = resolvedColumns.length ? 0 : inferFallbackColumnCount(children);
    const template = resolvedColumns.length
        ? resolvedColumns.map(columnTrack).join(" ")
        : fallbackColumnCount > 0 ? `repeat(${fallbackColumnCount}, auto)` : "none";
    const context = useMemo(() => ({ activeRow, columns: resolvedColumns, setActiveRow }), [activeRow, resolvedColumns]);
    return (
        <TableContext.Provider value={context}>
            <div {...props} className={clsx(tableStyles.table, isHoverable && tableStyles.isHoverable, isSticky && tableStyles.isSticky, className)} style={{ ...style, "--flux-table-columns": template } as FluxStyle}>
                <div className={tableStyles.tableBase} role="table" aria-busy={isLoading || undefined} aria-describedby={caption ? captionId : undefined} aria-rowcount={ariaRowcount}>
                    {header && (
                        <div className={clsx(tableStyles.tableHead, isSticky && tableStyles.tableHeadSticky)} role="rowgroup">
                            {header}
                        </div>
                    )}
                    <div className={tableStyles.tableBody} role="rowgroup">
                        {isLoading && loading ? loading : children}
                    </div>
                    {isFilled && (
                        <FluxTableRow className={tableStyles.tableFill} aria-hidden="true">
                            {resolvedColumns.map((_, index) => (
                                <FluxTableCell key={index} />
                            ))}
                        </FluxTableRow>
                    )}
                    {empty && <FluxTableRow className={tableStyles.tableEmptyFill}>{empty}</FluxTableRow>}
                    {footer && (
                        <div className={tableStyles.tableFoot} role="rowgroup">
                            {footer}
                        </div>
                    )}
                </div>
                {caption && (
                    <div id={captionId} className={clsx(tableStyles.tableCaption, captionSide === "top" && tableStyles.isTop)}>
                        {caption}
                    </div>
                )}
                {isLoading && !loading && (
                    <div className={tableStyles.tableLoader}>
                        <FluxSpinner />
                    </div>
                )}
                {pagination && <div className={tableStyles.tablePagination}>{pagination}</div>}
            </div>
        </TableContext.Provider>
    );
}

const INTERACTIVE_SELECTOR = "a, button, input, label, select, textarea, [role=button]";
export interface FluxTableRowProps extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "onClick"> {
    color?: FluxColor;
    isClickable?: boolean;
    isHidden?: boolean;
    isSelected?: boolean;
    onRowClick?: (columnIndex: number, event: MouseEvent<HTMLDivElement>) => void;
}
export function FluxTableRow({ children, className, color, isClickable, isHidden, isSelected, onKeyDown, onRowClick, style, ...props }: FluxTableRowProps) {
    const context = useContext(TableContext);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(
        () => () => {
            if (context?.activeRow === ref.current) context.setActiveRow(null);
        },
        [context],
    );
    const tabIndex = isClickable && !isHidden ? (context?.activeRow === null || context?.activeRow === ref.current ? 0 : -1) : undefined;
    const activate = (event: MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.closest(INTERACTIVE_SELECTOR)) return;
        const cell = target.closest('[role="cell"], [role="columnheader"]');
        const siblings = cell?.parentElement ? Array.from(cell.parentElement.children) : [];
        onRowClick?.(Math.max(0, siblings.indexOf(cell as Element)), event);
    };
    const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.currentTarget.click();
            return;
        }
        if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const rows = Array.from(event.currentTarget.closest('[role="table"]')?.querySelectorAll<HTMLElement>('[role="row"][tabindex]') ?? []);
        const index = rows.indexOf(event.currentTarget);
        const target = event.key === "Home" ? rows[0] : event.key === "End" ? rows.at(-1) : rows[index + (event.key === "ArrowUp" ? -1 : 1)];
        target?.focus();
    };
    return (
        <div {...props} ref={ref} className={clsx(tableStyles.tableRow, isClickable && tableStyles.isClickable, isSelected && tableStyles.isSelected, color && tableStyles.isColored, color && tableStyles[`tableRow${color[0].toUpperCase()}${color.slice(1)}`], className)} role="row" tabIndex={tabIndex} aria-selected={isSelected || undefined} hidden={isHidden} style={style} onFocus={(event) => event.target === event.currentTarget && context?.setActiveRow(event.currentTarget)} onClick={activate} onKeyDown={keyboard}>
            {children}
        </div>
    );
}

export interface FluxTableCellProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
    align?: "start" | "center" | "end";
    colspan?: number;
    content?: ReactNode;
    contentDirection?: "column" | "row";
    contentGap?: number;
    isNumeric?: boolean;
    noWrap?: boolean;
    pinned?: boolean | "start" | "end";
    rowspan?: number;
}
export function FluxTableCell({ align, children, className, colspan, content, contentDirection = "row", contentGap, isNumeric, noWrap, pinned, rowspan, style, ...props }: FluxTableCellProps) {
    const context = useContext(TableContext);
    const ref = useRef<HTMLDivElement>(null);
    const columnIndex = useTableColumnIndex(ref, context?.columns ?? []);
    const column = colspan ? undefined : context?.columns[columnIndex];
    const effectiveAlign = align ?? column?.align;
    const effectiveIsNumeric = isNumeric || column?.isNumeric;
    const effectiveNoWrap = noWrap || column?.noWrap;
    const pinnedSide = pinned === true ? "start" : pinned || column?.pinned;
    return (
        <div
            {...props}
            ref={ref}
            className={clsx(tableStyles.tableCell, content !== undefined && tableStyles.isRaw, effectiveIsNumeric && tableStyles.isNumeric, effectiveNoWrap && tableStyles.isNoWrap, rowspan && tableStyles.hasRowspan, pinnedSide === "start" && tableStyles.isPinnedStart, pinnedSide === "end" && tableStyles.isPinnedEnd, className)}
            role="cell"
            aria-colspan={colspan}
            aria-rowspan={rowspan}
            style={{
                ...style,
                alignItems: contentDirection === "column" ? effectiveAlign : undefined,
                flexFlow: content === undefined ? contentDirection : undefined,
                gap: contentGap,
                gridColumn: colspan ? `span ${colspan}` : undefined,
                gridRow: rowspan ? `span ${rowspan}` : undefined,
                justifyContent: contentDirection === "row" ? effectiveAlign : undefined,
                textAlign: effectiveAlign,
            }}
        >
            {content ?? children}
        </div>
    );
}

export interface FluxTableHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "onResize"> {
    align?: "start" | "center" | "end";
    dataType?: "text" | "numeric" | "date";
    isNumeric?: boolean;
    isResizable?: boolean;
    isShrinking?: boolean;
    isSortable?: boolean;
    maxWidth?: number;
    minWidth?: number;
    noWrap?: boolean;
    onResize?: (width: number | null) => void;
    onSort?: (sort: FluxTableSort) => void;
    pinned?: boolean | "start" | "end";
    sort?: Exclude<FluxTableSort, null>;
    width?: number;
}
function sortIcon(sort: FluxTableSort, dataType: "text" | "numeric" | "date"): FluxIconName {
    if (!sort) return "arrow-up-arrow-down";
    if (dataType === "numeric") return sort === "ascending" ? "arrow-down-1-9" : "arrow-up-9-1";
    if (dataType === "date") return sort === "ascending" ? "arrow-down-short-wide" : "arrow-up-wide-short";
    return sort === "ascending" ? "arrow-down-a-z" : "arrow-up-a-z";
}
export function FluxTableHeader({ align, children, className, dataType = "text", isNumeric, isResizable, isShrinking, isSortable, maxWidth, minWidth = 48, onResize, onSort, pinned, sort, style, width, ...props }: FluxTableHeaderProps) {
    const [resizedWidth, setResizedWidth] = useState<number | undefined>(width);
    useEffect(() => setResizedWidth(width), [width]);
    const pinnedSide = pinned === true ? "start" : pinned;
    const clamp = (value: number) => Math.round(Math.max(minWidth, Math.min(maxWidth ?? Number.POSITIVE_INFINITY, value)));
    const cycleSort = () => onSort?.(sort === "ascending" ? "descending" : sort === "descending" ? null : "ascending");
    const startDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
        const header = event.currentTarget.parentElement!;
        const startX = event.clientX;
        const startWidth = header.getBoundingClientRect().width;
        const move = (moveEvent: PointerEvent) => setResizedWidth(clamp(startWidth + moveEvent.clientX - startX));
        const up = (upEvent: PointerEvent) => {
            const next = clamp(startWidth + upEvent.clientX - startX);
            setResizedWidth(next);
            onResize?.(next);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
    };
    return (
        <div {...props} className={clsx(tableStyles.tableHeader, isResizable && tableStyles.isResizable, isShrinking && tableStyles.isShrinking, pinnedSide === "start" && tableStyles.isPinnedStart, pinnedSide === "end" && tableStyles.isPinnedEnd, className)} role="columnheader" aria-sort={isSortable ? (sort ?? "none") : undefined} style={{ ...style, justifyContent: align, textAlign: align, width: resizedWidth }}>
            {children}
            {isSortable && (
                <button className={tableStyles.tableSort} type="button" aria-label="Sort" onClick={cycleSort}>
                    <FluxIcon name={sortIcon(sort ?? null, dataType)} size={12} />
                </button>
            )}
            {isResizable && (
                <button
                    className={tableStyles.tableResize}
                    role="separator"
                    type="button"
                    aria-label="Resize column"
                    aria-orientation="vertical"
                    aria-valuemin={minWidth}
                    aria-valuemax={maxWidth}
                    aria-valuenow={resizedWidth}
                    onPointerDown={startDrag}
                    onDoubleClick={() => {
                        setResizedWidth(width);
                        onResize?.(null);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Home") {
                            event.preventDefault();
                            setResizedWidth(width);
                            onResize?.(null);
                            return;
                        }
                        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                        event.preventDefault();
                        const next = clamp((resizedWidth ?? event.currentTarget.parentElement!.getBoundingClientRect().width) + (event.key === "ArrowLeft" ? -1 : 1) * (event.shiftKey ? 48 : 12));
                        setResizedWidth(next);
                        onResize?.(next);
                    }}
                />
            )}
        </div>
    );
}

export function FluxTableActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <FluxActionStack {...props} className={clsx(tableStyles.tableActions, className)} />;
}
export function FluxTableBar({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={tableStyles.tableRow} role="row">
            <div {...props} className={clsx(tableStyles.tableBar, className)} role="cell">
                <div className={tableStyles.tableBarContent}>{children}</div>
            </div>
        </div>
    );
}
export function FluxTableGroup({ after, children, className, defaultExpanded = true, icon, isExpandable, isExpanded, label, onExpandedChange }: Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & { after?: ReactNode; defaultExpanded?: boolean; icon?: FluxIconName; isExpandable?: boolean; isExpanded?: boolean; label: ReactNode; onExpandedChange?: (expanded: boolean) => void }) {
    const controlled = isExpanded !== undefined;
    const [inner, setInner] = useState(defaultExpanded);
    const expanded = controlled ? isExpanded : inner;
    const setExpanded = (next: boolean) => {
        if (!controlled) setInner(next);
        onExpandedChange?.(next);
    };
    const content = (
        <>
            {isExpandable && <FluxIcon className={clsx(tableStyles.tableGroupChevron, expanded && tableStyles.isExpanded)} name="angle-right" size={16} />}
            {icon && <FluxIcon className={tableStyles.tableGroupIcon} name={icon} size={16} />}
            <span className={tableStyles.tableGroupLabel}>{label}</span>
            {after && <span className={tableStyles.tableGroupAfter}>{after}</span>}
        </>
    );
    return (
        <div className={clsx(tableStyles.tableGroupSection, className)} role="presentation">
            <div className={clsx(tableStyles.tableRow, tableStyles.tableGroupRow)} role="row">
                <div className={clsx(tableStyles.tableGroup, isExpandable && tableStyles.isHoverable)} role="cell">
                    {isExpandable ? (
                        <button className={tableStyles.tableGroupContent} type="button" aria-expanded={expanded} aria-label={expanded ? "Collapse group" : "Expand group"} onClick={() => setExpanded(!expanded)}>
                            {content}
                        </button>
                    ) : (
                        <div className={tableStyles.tableGroupContent}>{content}</div>
                    )}
                </div>
            </div>
            {(!isExpandable || expanded) && children}
        </div>
    );
}
export function FluxTableTreeCell({ children, className, color = "gray", isExpandable, isExpanded, level, onToggle, ...props }: Omit<HTMLAttributes<HTMLDivElement>, "color"> & { color?: FluxColor | string; isExpandable?: boolean; isExpanded?: boolean; level: number; onToggle?: () => void }) {
    const known = ["gray", "primary", "danger", "info", "success", "warning"].includes(color);
    const colorClass = known ? tableStyles[`treeMarker${color[0].toUpperCase()}${color.slice(1)}`] : tableStyles.treeMarkerCustom;
    const markerStyle = { left: level * 34 + 6, "--tree-marker-color": known ? undefined : color } as FluxStyle;
    return (
        <div {...props} className={clsx(tableStyles.tableTreeCell, className)} role="cell">
            <div className={tableStyles.treeBranch} style={{ width: (level + 1) * 34 }}>
                {isExpandable ? (
                    <button type="button" className={clsx(tableStyles.treeMarker, colorClass, tableStyles.isToggle, isExpanded && tableStyles.isExpanded)} style={markerStyle} aria-expanded={isExpanded} aria-label={isExpanded ? "Collapse row" : "Expand row"} onClick={onToggle}>
                        <FluxIcon name="angle-right" size={14} />
                    </button>
                ) : (
                    <span className={clsx(tableStyles.treeMarker, colorClass)} style={markerStyle} />
                )}
            </div>
            {children}
        </div>
    );
}

export type FluxDataTableId = string | number;
export interface FluxDataTableColumn<T> extends FluxTableColumnDef {
    dataType?: "text" | "numeric" | "date";
    header: ReactNode;
    key: string;
    render?: (item: T, index: number) => ReactNode;
    sortable?: boolean;
}
export interface FluxDataTableRenderProps<T> {
    index: number;
    isSelected: boolean;
    item: T;
    items: T[];
    page: number;
    perPage: number;
    total: number;
}
export interface FluxDataTableProps<T extends Record<string, unknown>> {
    canExpand?: (item: T) => boolean;
    caption?: ReactNode;
    className?: string;
    collapsedGroups?: FluxDataTableId[];
    columns: FluxDataTableColumn<T>[];
    empty?: ReactNode;
    expandMode?: "single" | "multiple";
    expandable?: (props: FluxDataTableRenderProps<T> & { isExpanded: boolean; toggle(): void }) => ReactNode;
    expanded?: FluxDataTableId[];
    filter?: ReactNode;
    footer?: ReactNode;
    group?: (props: { id: FluxDataTableId; index: number; isExpanded: boolean; items: T[]; toggle(): void }) => ReactNode;
    groupBy?: (item: T) => FluxDataTableId;
    isFilled?: boolean;
    isHoverable?: boolean;
    isLoading?: boolean;
    isSticky?: boolean;
    items: T[];
    limits?: number[];
    loading?: ReactNode;
    onCollapsedGroupsChange?: (ids: FluxDataTableId[]) => void;
    onExpandedChange?: (ids: FluxDataTableId[]) => void;
    onLimit?: (limit: number) => void;
    onNavigate?: (page: number) => void;
    onRowClick?: (item: T, columnIndex: number, event: MouseEvent<HTMLDivElement>) => void;
    onSelectedChange?: (selected: FluxDataTableId | FluxDataTableId[] | null) => void;
    page: number;
    pagination?: ReactNode;
    perPage: number;
    rowColor?: (item: T) => FluxColor | undefined;
    selected?: FluxDataTableId | FluxDataTableId[] | null;
    selection?: (props: { clear(): void; count: number; selected: FluxDataTableId[] }) => ReactNode;
    selectionMode?: "single" | "multiple";
    sort?: { key: string; direction: Exclude<FluxTableSort, null> } | null;
    onSortChange?: (sort: { key: string; direction: Exclude<FluxTableSort, null> } | null) => void;
    total: number;
    uniqueKey?: keyof T;
}
export function FluxDataTable<T extends Record<string, unknown>>({ canExpand, caption, className, collapsedGroups = [], columns, empty, expandMode = "multiple", expandable, expanded = [], filter, footer, group, groupBy, isFilled, isHoverable, isLoading, isSticky, items, limits = [5, 10, 25, 50, 100], loading, onCollapsedGroupsChange, onExpandedChange, onLimit, onNavigate, onRowClick, onSelectedChange, page, pagination, perPage, rowColor, selected = null, selection, selectionMode, sort, onSortChange, total, uniqueKey }: FluxDataTableProps<T>) {
    const visible = items.slice(0, perPage);
    const idOf = (item: T, index: number): FluxDataTableId => (uniqueKey ? (item[uniqueKey] as FluxDataTableId) : index);
    const selectedIds = Array.isArray(selected) ? selected : selected == null ? [] : [selected];
    const select = (id: FluxDataTableId) => {
        if (selectionMode === "multiple") onSelectedChange?.(selectedIds.includes(id) ? selectedIds.filter((value) => value !== id) : [...selectedIds, id]);
        else if (selectionMode === "single") onSelectedChange?.(selectedIds.includes(id) ? null : id);
    };
    const toggleExpanded = (id: FluxDataTableId) => onExpandedChange?.(expanded.includes(id) ? expanded.filter((value) => value !== id) : expandMode === "single" ? [id] : [...expanded, id]);
    const toggleGroup = (id: FluxDataTableId) => onCollapsedGroupsChange?.(collapsedGroups.includes(id) ? collapsedGroups.filter((value) => value !== id) : [...collapsedGroups, id]);
    const buckets = new Map<FluxDataTableId, Array<{ item: T; index: number }>>();
    visible.forEach((item, index) => {
        const key = groupBy?.(item) ?? "__all";
        buckets.set(key, [...(buckets.get(key) ?? []), { item, index }]);
    });
    const header = (
        <>
            {selection && selectedIds.length > 0 ? <FluxTableBar>{selection({ selected: selectedIds, count: selectedIds.length, clear: () => onSelectedChange?.(selectionMode === "multiple" ? [] : null) })}</FluxTableBar> : filter}
            <FluxTableRow aria-rowindex={1}>
                {selectionMode && (
                    <FluxTableHeader isShrinking>
                        <input
                            type="checkbox"
                            aria-label="Select all rows"
                            checked={selectionMode === "multiple" && visible.length > 0 && visible.every((item, index) => selectedIds.includes(idOf(item, index)))}
                            ref={(input) => {
                                if (input) input.indeterminate = selectionMode === "multiple" && selectedIds.length > 0 && !visible.every((item, index) => selectedIds.includes(idOf(item, index)));
                            }}
                            disabled={selectionMode !== "multiple"}
                            onChange={(event) => onSelectedChange?.(event.target.checked ? Array.from(new Set([...selectedIds, ...visible.map(idOf)])) : selectedIds.filter((id) => !visible.some((item, index) => idOf(item, index) === id)))}
                        />
                    </FluxTableHeader>
                )}
                {expandable && <FluxTableHeader isShrinking />}
                {columns.map(({ header: columnHeader, key, pinned, render: _render, sortable, ...column }) => (
                    <FluxTableHeader
                        key={key}
                        {...column}
                        pinned={pinned ?? undefined}
                        isSortable={sortable}
                        sort={sort?.key === key ? sort.direction : undefined}
                        onSort={(direction) => onSortChange?.(direction ? { key, direction } : null)}
                    >
                        {columnHeader}
                    </FluxTableHeader>
                ))}
            </FluxTableRow>
        </>
    );
    const body = Array.from(buckets, ([groupId, entries]) => {
        const collapsed = collapsedGroups.includes(groupId);
        return (
            <div key={String(groupId)} className={groupBy ? tableStyles.tableGroupSection : undefined} role="presentation">
                {groupBy && group?.({ id: groupId, index: entries[0].index, items: entries.map((entry) => entry.item), isExpanded: !collapsed, toggle: () => toggleGroup(groupId) })}
                {!collapsed &&
                    entries.map(({ item, index }) => {
                        const id = idOf(item, index),
                            isSelected = selectedIds.includes(id),
                            isExpanded = expanded.includes(id),
                            expandableRow = Boolean(expandable && (canExpand?.(item) ?? true));
                        const renderProps = { item, index, items: visible, page, perPage, total, isSelected };
                        return (
                            <div key={String(id)} role="presentation">
                                <FluxTableRow aria-rowindex={(page - 1) * perPage + index + 2} color={rowColor?.(item)} isClickable={Boolean(selectionMode || onRowClick)} isSelected={isSelected} onRowClick={(columnIndex, event) => (selectionMode ? select(id) : onRowClick?.(item, columnIndex, event))}>
                                    {selectionMode && (
                                        <FluxTableCell>
                                            <input type={selectionMode === "multiple" ? "checkbox" : "radio"} aria-label={`Select row ${index + 1}`} checked={isSelected} onChange={() => select(id)} onClick={(event) => event.stopPropagation()} />
                                        </FluxTableCell>
                                    )}
                                    {expandable && (
                                        <FluxTableCell>
                                            {expandableRow && (
                                                <button type="button" aria-label={isExpanded ? "Collapse row" : "Expand row"} aria-expanded={isExpanded} onClick={() => toggleExpanded(id)}>
                                                    <FluxIcon name="angle-right" />
                                                </button>
                                            )}
                                        </FluxTableCell>
                                    )}
                                    {columns.map((column) => (
                                        <FluxTableCell key={column.key} align={column.align} isNumeric={column.isNumeric} noWrap={column.noWrap} pinned={column.pinned ?? undefined}>
                                            {column.render ? column.render(item, index) : (item[column.key] as ReactNode)}
                                        </FluxTableCell>
                                    ))}
                                </FluxTableRow>
                                {expandableRow && isExpanded && (
                                    <FluxTableRow color={rowColor?.(item)}>
                                        <FluxTableCell colspan={columns.length + (selectionMode ? 1 : 0) + 1} content={<div className={tableStyles.tableExpandContent}>{expandable!({ ...renderProps, isExpanded: true, toggle: () => toggleExpanded(id) })}</div>} />
                                    </FluxTableRow>
                                )}
                            </div>
                        );
                    })}
            </div>
        );
    });
    const emptyContent =
        !isLoading && visible.length === 0 ? (
            <div className={tableStyles.tableCellBase} role="cell" style={{ gridColumn: "1 / -1" }}>
                <div className={tableStyles.tableEmpty}>{empty ?? "No items"}</div>
            </div>
        ) : undefined;
    const paginationContent = total > limits[0] ? (pagination ?? <FluxPaginationBar limits={limits} page={page} perPage={perPage} total={total} onLimitChange={(value) => onLimit?.(value)} onNavigate={(value) => onNavigate?.(value)} />) : undefined;
    return (
        <FluxTable ariaRowcount={total + 1} caption={caption} className={className} columns={[...(selectionMode ? [{ isShrinking: true }] : []), ...(expandable ? [{ isShrinking: true }] : []), ...columns]} empty={emptyContent} footer={footer} header={header} isFilled={visible.length > 0 && isFilled} isHoverable={isHoverable} isLoading={isLoading} isSticky={isSticky} loading={loading} pagination={paginationContent}>
            {body}
        </FluxTable>
    );
}
