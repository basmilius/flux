import {clsx} from 'clsx';
import {createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore} from 'react';
import type {DragEvent, HTMLAttributes, KeyboardEvent, ReactNode} from 'react';
import type {FluxColor, FluxIconName, FluxStyle} from '../types';
import {useFluxTranslate} from '../i18n';
import {FluxBadge} from './Display';
import {FluxDisabled, useFluxDisabled} from './DisplayExtended';
import {FluxIcon} from './Icon';
import {flattenElements} from './children';
import {createKanbanEngine} from './kanbanEngine';
import type {FluxKanbanKeyboardDirection, FluxKanbanMoveColumnEvent, FluxKanbanMoveEvent} from './kanbanEngine';
import {findKanbanSwimlaneTarget, toKanbanCellId} from './kanbanSwimlane';
import styles from '~flux/components/css/component/Kanban.module.scss';

export type {FluxKanbanMoveColumnEvent, FluxKanbanMoveEvent} from './kanbanEngine';
export type KanbanContextValue = ReturnType<typeof createKanbanEngine>;
export const KanbanContext = createContext<KanbanContextValue | null>(null);
type Cell = {columnId: string | number; swimlaneId?: string | number};
export interface KanbanLayoutContextValue {
    columnCount: number;
    hasSwimlanes: boolean;
    registerCell(id: string | number, cell: Cell): void;
    unregisterCell(id: string | number): void;
    resolveCell(id: string | number): Cell;
}
export const KanbanLayoutContext = createContext<KanbanLayoutContextValue | null>(null);
export const SwimlaneContext = createContext<{swimlaneId: string | number} | null>(null);
function useBoard() {
    const board = useContext(KanbanContext);
    if (!board) throw new Error('Kanban components must be inside FluxKanban');
    return board;
}

export function FluxKanban({canMove, children, className, disabled = false, onMove, onMoveColumn, reorderableColumns = false, style, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDrop'> & {canMove?: (event: FluxKanbanMoveEvent) => boolean; disabled?: boolean; onMove?: (event: FluxKanbanMoveEvent) => void; onMoveColumn?: (event: FluxKanbanMoveColumnEvent) => void; reorderableColumns?: boolean}) {
    const root = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState('');
    const cells = useRef(new Map<string | number, Cell>());
    const [layoutVersion, updateLayout] = useState(0);
    const hasSwimlanes = [...cells.current.values()].some(cell => cell.swimlaneId !== undefined);
    const columnCount = new Set([...cells.current.values()].map(cell => cell.columnId)).size;
    const registerCell = useCallback((id: string | number, cell: Cell) => {cells.current.set(id, cell); updateLayout(value => value + 1);}, []);
    const unregisterCell = useCallback((id: string | number) => {cells.current.delete(id); updateLayout(value => value + 1);}, []);
    const resolveCell = useCallback((id: string | number) => cells.current.get(id) ?? {columnId: id}, []);
    const latest = useRef({canMove, disabled, onMove, onMoveColumn, reorderableColumns: reorderableColumns && !hasSwimlanes});
    latest.current = {canMove, disabled, onMove, onMoveColumn, reorderableColumns: reorderableColumns && !hasSwimlanes};
    const translateMove = (event: FluxKanbanMoveEvent) => {
        const from = resolveCell(event.fromColumnId), to = resolveCell(event.toColumnId);
        return from.swimlaneId === undefined && to.swimlaneId === undefined ? event : {...event, fromColumnId: from.columnId, toColumnId: to.columnId, fromSwimlaneId: from.swimlaneId, toSwimlaneId: to.swimlaneId};
    };
    const [engine] = useState(() => createKanbanEngine({
        get disabled() {return latest.current.disabled;},
        get reorderableColumns() {return latest.current.reorderableColumns;},
        canMove: event => latest.current.canMove?.(translateMove(event)) ?? true,
        onMove: event => latest.current.onMove?.(translateMove(event)),
        onMoveColumn: event => latest.current.onMoveColumn?.(event),
        onAnnounce: setMessage
    }));
    const version = useSyncExternalStore(engine.subscribe, engine.getSnapshot, engine.getSnapshot);
    const context = useMemo(() => ({...engine}), [engine, version, disabled, reorderableColumns, hasSwimlanes]);
    const layout = useMemo(() => ({columnCount, hasSwimlanes, registerCell, unregisterCell, resolveCell}), [layoutVersion, columnCount, hasSwimlanes, registerCell, unregisterCell, resolveCell]);
    useEffect(() => {if (disabled) engine.cancelAll();}, [disabled, engine]);
    useEffect(() => {
        engine.setBoardElement(root.current);
        const move = (event: globalThis.DragEvent) => engine.onPointerMove(event.clientX, event.clientY);
        window.addEventListener('dragover', move);
        window.addEventListener('dragend', engine.cancelAll);
        return () => {window.removeEventListener('dragover', move); window.removeEventListener('dragend', engine.cancelAll); engine.cancelAll(); engine.setBoardElement(null);};
    }, [engine]);
    return <KanbanContext.Provider value={context}><KanbanLayoutContext.Provider value={layout}><FluxDisabled disabled={disabled}>
        <div {...props} ref={root} className={clsx(styles.kanban, (context.dragState || context.columnDragState) && styles.isBoardDragging, className)} style={{...style, '--flux-kanban-columns': hasSwimlanes ? columnCount : undefined} as FluxStyle} role="group" aria-roledescription="Kanban board">
            {children}<div className={styles.kanbanLiveRegion} aria-live="polite" aria-atomic="true">{message}</div>
        </div>
    </FluxDisabled></KanbanLayoutContext.Provider></KanbanContext.Provider>;
}

export function FluxKanbanColumn({actions, children, className, columnId, count, disabled, empty, footer, icon, label, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {actions?: ReactNode; columnId: string | number; count?: string | number; disabled?: boolean; empty?: ReactNode; footer?: ReactNode; icon?: FluxIconName; label: string}) {
    const board = useBoard();
    const layout = useContext(KanbanLayoutContext)!;
    const swimlane = useContext(SwimlaneContext);
    const scopedDisabled = useFluxDisabled(disabled);
    const cellId = toKanbanCellId(columnId, swimlane?.swimlaneId);
    const root = useRef<HTMLDivElement>(null), body = useRef<HTMLDivElement>(null), header = useRef<HTMLElement>(null);
    const reorderable = board.reorderableColumns && !scopedDisabled;
    const isOver = board.isOverColumnId === cellId;
    useLayoutEffect(() => {
        const element = root.current!;
        board.registerColumn(element, cellId);
        board.setColumnBodyElement(cellId, body.current);
        layout.registerCell(cellId, {columnId, swimlaneId: swimlane?.swimlaneId});
        return () => {board.unregisterColumn(element); board.setColumnBodyElement(cellId, null); layout.unregisterCell(cellId);};
    }, [cellId, columnId, swimlane?.swimlaneId, board.registerColumn, board.unregisterColumn, board.setColumnBodyElement, layout.registerCell, layout.unregisterCell]);
    let indicator: number | null = null;
    if (board.dragState?.dropColumnId === cellId && body.current) {
        const items = Array.from(body.current.children).filter(child => board.getItemInfo(child)) as HTMLElement[];
        const before = board.dragState.beforeItemId;
        const last = items.at(-1), target = items.find(item => board.getItemInfo(item)?.itemId === before);
        indicator = before === null ? last ? last.offsetTop + last.offsetHeight + 4 : 4 : target ? target.offsetTop - 5 : null;
    }
    const sibling = (element: Element, direction: 'previousElementSibling' | 'nextElementSibling') => {
        let next = element[direction];
        while (next && !board.getColumnInfo(next)) next = next[direction];
        return next;
    };
    const columnKey = (event: KeyboardEvent<HTMLElement>) => {
        if (!reorderable || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const adjacent = sibling(root.current!, event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling');
        if (!adjacent) return;
        const before = event.key === 'ArrowLeft' ? adjacent : sibling(adjacent, 'nextElementSibling');
        board.startColumnDrag(cellId); board.updateColumnDropTarget(before ? board.getColumnInfo(before)!.columnId : null); board.commitColumnDrop();
        requestAnimationFrame(() => header.current?.focus());
    };
    const columnOver = (event: DragEvent<HTMLElement>) => {
        if (!board.columnDragState || board.columnDragState.columnId === cellId) return;
        event.preventDefault();
        const box = event.currentTarget.getBoundingClientRect();
        const next = sibling(root.current!, 'nextElementSibling');
        board.updateColumnDropTarget(event.clientX < box.left + box.width / 2 ? cellId : next ? board.getColumnInfo(next)!.columnId : null);
    };
    return <FluxDisabled disabled={scopedDisabled}><div {...props} ref={root} className={clsx(styles.kanbanColumn, isOver && styles.isOver, isOver && !board.isDropAllowed && styles.isDropDisallowed, reorderable && styles.isReorderable, board.columnDragState?.columnId === cellId && styles.isColumnDragging, board.columnDragState?.dropBeforeColumnId === cellId && board.columnDragState.columnId !== cellId && styles.isColumnDropBefore, scopedDisabled && styles.isDisabled, className)} role="list" aria-roledescription="Kanban column" aria-label={label} aria-disabled={scopedDisabled || undefined} data-kanban-cell={cellId} data-kanban-column={columnId}>
        <header ref={header} className={styles.kanbanColumnHeader} draggable={reorderable} tabIndex={reorderable ? 0 : undefined} aria-roledescription={reorderable ? 'Draggable column' : undefined} aria-keyshortcuts={reorderable ? 'ArrowLeft ArrowRight' : undefined} onDragStart={event => {if (reorderable) {event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', `column:${columnId}`); board.startColumnDrag(cellId);}}} onDragEnd={board.endColumnDrag} onDragOver={columnOver} onDrop={event => {if (board.columnDragState) {event.preventDefault(); board.commitColumnDrop();}}} onKeyDown={columnKey}>
            <div className={styles.kanbanColumnHeaderCaption}>{icon && <FluxIcon name={icon} />}<span>{label}</span>{count != null && <FluxBadge label={String(count)} />}</div>{actions}
        </header>
        <div ref={body} className={styles.kanbanColumnBody} onDragEnter={() => board.enterColumn(cellId)} onDragLeave={() => board.leaveColumn(cellId)} onDragOver={event => {if (!scopedDisabled && board.dragState) {event.preventDefault(); if (!(event.target as Element).closest('[data-kanban-item]')) board.updateDropTarget(cellId, null);}}} onDrop={event => {if (!scopedDisabled && board.dragState) {event.preventDefault(); board.commitDrop();}}}>
            {children}{empty && !flattenElements(children).length && <div className={styles.kanbanColumnEmpty}>{empty}</div>}
            <div aria-hidden="true" className={clsx(styles.kanbanDropIndicator, indicator !== null && styles.isVisible, indicator !== null && !board.isDropAllowed && styles.isDisallowed)} style={indicator !== null ? {transform: `translateY(${indicator}px)`} : undefined} />
        </div>
        {footer && <footer className={styles.kanbanColumnFooter}>{footer}</footer>}
    </div></FluxDisabled>;
}

export function FluxKanbanItem({children, className, columnId, disabled, itemId, onKeyDown, onFocus, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {columnId: string | number; disabled?: boolean; itemId: string | number}) {
    const board = useBoard(), swimlane = useContext(SwimlaneContext), scopedDisabled = useFluxDisabled(disabled);
    const root = useRef<HTMLDivElement>(null);
    const cellId = toKanbanCellId(columnId, swimlane?.swimlaneId);
    const grabbed = board.grabbedId === itemId;
    useLayoutEffect(() => {
        const element = root.current!;
        board.registerItem(element, itemId);
        if (board.isItemGrabbed(itemId)) element.focus();
        return () => board.unregisterItem(element);
    }, [board.registerItem, board.unregisterItem, board.isItemGrabbed, itemId]);
    const key = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (scopedDisabled || event.defaultPrevented) return;
        if (event.key === ' ' || event.key === 'Enter') {event.preventDefault(); grabbed ? board.commitKeyboardDrop() : board.grabItem(itemId, cellId);}
        else if (grabbed && event.key === 'Escape') {event.preventDefault(); board.cancelKeyboardDrop();}
        else if (grabbed && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            const direction = event.key.slice(5).toLowerCase() as FluxKanbanKeyboardDirection;
            if (swimlane) {
                const target = findKanbanSwimlaneTarget(root.current!, direction, element => board.getItemInfo(element)?.itemId);
                if (target) board.moveKeyboardTo(target.cellId, target.beforeItemId);
            } else board.moveKeyboard(direction);
        }
    };
    return <div {...props} ref={root} className={clsx(styles.kanbanItem, board.dragState?.itemId === itemId && board.dragState.mode === 'pointer' && styles.isDragging, grabbed && styles.isGrabbed, scopedDisabled && styles.isDisabled, className)} data-kanban-item data-kanban-item-id={itemId} role="listitem" aria-roledescription="Kanban item" aria-disabled={scopedDisabled || undefined} draggable={!scopedDisabled} tabIndex={scopedDisabled ? -1 : 0} onKeyDown={key} onFocus={event => {onFocus?.(event); root.current?.scrollIntoView?.({block: 'nearest', inline: 'nearest', behavior: 'smooth'});}} onDragStart={event => {
        if (scopedDisabled) {event.preventDefault(); return;}
        if (grabbed) board.cancelKeyboardDrop();
        board.startDrag(itemId, cellId);
        event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', `item:${itemId}`);
        event.dataTransfer.setDragImage?.(event.currentTarget, event.nativeEvent.offsetX || event.currentTarget.offsetWidth / 2, event.nativeEvent.offsetY || 12);
    }} onDragEnd={board.endDrag} onDragOver={event => {
        event.stopPropagation();
        if (!board.dragState || scopedDisabled) return;
        event.preventDefault();
        const box = event.currentTarget.getBoundingClientRect();
        let next = event.currentTarget.nextElementSibling;
        while (next && !board.getItemInfo(next)) next = next.nextElementSibling;
        board.updateDropTarget(cellId, event.clientY < box.top + box.height / 2 ? itemId : next ? board.getItemInfo(next)!.itemId : null);
    }}>{children}</div>;
}

export function FluxKanbanSwimlane({children, className, color = 'gray', count, defaultCollapsed = false, isCollapsed, label, onCollapsedChange, swimlaneId, ...props}: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {color?: FluxColor; count?: number; defaultCollapsed?: boolean; isCollapsed?: boolean; label: string; onCollapsedChange?: (collapsed: boolean) => void; swimlaneId?: string | number}) {
    const translate = useFluxTranslate(), fallbackId = useId();
    const [inner, setInner] = useState(defaultCollapsed);
    const collapsed = isCollapsed ?? inner;
    const context = useMemo(() => ({swimlaneId: swimlaneId ?? fallbackId}), [swimlaneId, fallbackId]);
    return <SwimlaneContext.Provider value={context}><div {...props} className={clsx(styles[`kanbanSwimlane${color[0].toUpperCase()}${color.slice(1)}`], collapsed && styles.isCollapsed, className)} data-kanban-swimlane={context.swimlaneId} data-kanban-swimlane-collapsed={collapsed ? '' : undefined} role="group" aria-roledescription="Kanban swimlane" aria-label={label}>
        <header className={styles.kanbanSwimlaneHeader}><div className={styles.kanbanSwimlaneCaption}>
            <button className={styles.kanbanSwimlaneToggle} type="button" aria-expanded={!collapsed} aria-label={translate(collapsed ? 'flux.expandGroup' : 'flux.collapseGroup')} onClick={() => {if (isCollapsed === undefined) setInner(!collapsed); onCollapsedChange?.(!collapsed);}}>
                <FluxIcon className={clsx(styles.kanbanSwimlaneChevron, !collapsed && styles.isExpanded)} name="angle-right" size={16} /><span className={styles.kanbanSwimlaneLabel}>{label}</span>
            </button>{count != null && <FluxBadge color={color} label={String(count)} />}
        </div></header>{children}
    </div></SwimlaneContext.Provider>;
}
