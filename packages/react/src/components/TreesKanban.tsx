import { clsx } from 'clsx';
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { DragEvent, HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import type { FluxColor, FluxIconName, FluxStyle } from '../types';
import { FluxBadge, FluxTag } from './Display';
import { FluxSpinner } from './Feedback';
import { FluxFormSelect } from './SelectionForms';
import { FluxIcon } from './Icon';
import kanbanStyles from '~flux/components/css/component/Kanban.module.scss';
import treeStyles from '~flux/components/css/component/TreeView.module.scss';
import treeSelectStyles from '~flux/components/css/component/TreeViewSelect.module.scss';
import treeNodeStyles from '~flux/components/css/component/primitive/TreeNode.module.scss';
import formStyles from '~flux/components/css/component/Form.module.scss';

export interface FluxTreeViewOption {
    children?: FluxTreeViewOption[];
    color?: FluxColor | string;
    disabled?: boolean;
    icon?: FluxIconName;
    id: string | number;
    label: string;
}
export type FluxTreeFlatNode<T extends FluxTreeViewOption = FluxTreeViewOption> = T & {
    ancestorIds: Array<string | number>;
    depth: number;
    hasChildren: boolean;
    isLast: boolean;
    lineGuides: boolean[];
};
function flattenTree<T extends FluxTreeViewOption>(options: T[], expanded: Set<string | number>, all = false, depth = 0, ancestors: Array<string | number> = [], parentGuides: boolean[] = []): FluxTreeFlatNode<T>[] {
    return options.flatMap((option, index) => {
        const isLast = index === options.length - 1;
        const flat = { ...option, depth, ancestorIds: ancestors, hasChildren: Boolean(option.children?.length), isLast, lineGuides: parentGuides } as FluxTreeFlatNode<T>;
        const childGuides = depth === 0 ? [] : [...parentGuides, !isLast];
        return [flat, ...(option.children && (all || expanded.has(option.id)) ? flattenTree(option.children as T[], expanded, all, depth + 1, [...ancestors, option.id], childGuides) : [])];
    });
}
function seededExpansion(options: FluxTreeViewOption[], depth: number, level = 0, result = new Set<string | number>()) {
    for (const option of options) {
        if (option.children?.length && level < depth - 1) {
            result.add(option.id);
            seededExpansion(option.children, depth, level + 1, result);
        }
    }
    return result;
}
function expansionKey(options: FluxTreeViewOption[], depth: number) {
    const entries: string[] = [];
    const visit = (nodes: FluxTreeViewOption[]) => nodes.forEach(node => {entries.push(`${typeof node.id}:${String(node.id)}:${node.children?.length ?? 0}`); if (node.children) visit(node.children);});
    visit(options);
    return `${depth}|${entries.join('|')}`;
}
function TreeNode({ expanded, levelColors, node, onExpand, trailing }: { expanded: boolean; levelColors?: Array<FluxColor | string>; node: FluxTreeFlatNode; onExpand(): void; trailing?: ReactNode }) {
    const color = node.color ?? levelColors?.[node.depth];
    const known = color !== undefined && ['gray', 'primary', 'danger', 'info', 'success', 'warning'].includes(color);
    const colorClass = color === undefined ? undefined : known ? treeNodeStyles[`treeNodeMarker${color[0].toUpperCase()}${color.slice(1)}`] : treeNodeStyles.treeNodeMarkerCustom;
    return (
        <>
            <div className={clsx(treeNodeStyles.treeNodeLineArea, expanded && node.hasChildren && treeNodeStyles.hasDropLine)} style={{ '--tree-marker-column': node.lineGuides.length + (node.depth > 0 ? 1 : 0) } as FluxStyle}>
                {node.lineGuides.map((showLine, index) => <span key={index} className={clsx(treeNodeStyles.treeIndent, showLine && treeNodeStyles.hasLine)} />)}
                {node.depth > 0 && <span className={clsx(treeNodeStyles.treeConnector, node.isLast && treeNodeStyles.isLast)} />}
                {node.hasChildren ? (
                    <button
                        type="button"
                        className={clsx(treeNodeStyles.treeNodeMarker, treeNodeStyles.isToggle, expanded && treeNodeStyles.isExpanded, colorClass)}
                        style={{ '--tree-marker-color': !known ? color : undefined } as FluxStyle}
                        aria-label={expanded ? 'Collapse' : 'Expand'}
                        aria-expanded={expanded}
                        tabIndex={-1}
                        onClick={(event) => {
                            event.stopPropagation();
                            onExpand();
                        }}
                    >
                        <FluxIcon name="angle-right" size={14} />
                    </button>
                ) : (
                    <span className={clsx(treeNodeStyles.treeNodeMarker, colorClass)} style={{ '--tree-marker-color': !known ? color : undefined } as FluxStyle} />
                )}
            </div>
            {node.icon && <FluxIcon className={treeNodeStyles.treeNodeIcon} name={node.icon} />}
            <span className={treeNodeStyles.treeNodeLabel}>{node.label}</span>
            {trailing}
        </>
    );
}

export function FluxTreeView({ className, expandedDepth = 1, levelColors, onClick, onDoubleClick, options, trailing, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'onDoubleClick'> & { expandedDepth?: number; levelColors?: Array<FluxColor | string>; onClick?: (option: FluxTreeViewOption) => void; onDoubleClick?: (option: FluxTreeViewOption) => void; options: FluxTreeViewOption[]; trailing?: (node: FluxTreeFlatNode) => ReactNode }) {
    const treeId = useId();
    const [expanded, setExpanded] = useState(() => seededExpansion(options, expandedDepth));
    const seedKey = expansionKey(options, expandedDepth);
    useEffect(() => setExpanded(seededExpansion(options, expandedDepth)), [seedKey]);
    const [highlighted, setHighlighted] = useState(-1);
    const visible = flattenTree(options, expanded);
    const toggle = (id: string | number) =>
        setExpanded((current) => {
            const next = new Set(current);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    const toOption = (node: FluxTreeFlatNode): FluxTreeViewOption => {
        const { ancestorIds: _ancestorIds, depth: _depth, hasChildren: _hasChildren, isLast: _isLast, lineGuides: _lineGuides, ...option } = node;
        return option;
    };
    const select = (index: number) => {
        const node = visible[index];
        if (!node || node.disabled) return;
        setHighlighted(index);
        onClick?.(toOption(node));
    };
    const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        let next = highlighted;
        if (!visible.length) return;
        if (event.key === 'ArrowDown') next = highlighted < 0 ? 0 : Math.min(visible.length - 1, highlighted + 1);
        else if (event.key === 'ArrowUp') next = highlighted < 0 ? visible.length - 1 : Math.max(0, highlighted - 1);
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = visible.length - 1;
        else if (event.key === 'ArrowRight') {
            const node = visible[highlighted];
            if (node?.hasChildren) {
                if (!expanded.has(node.id)) toggle(node.id);
                else if (visible[highlighted + 1]?.depth > node.depth) next = highlighted + 1;
            }
        }
        else if (event.key === 'ArrowLeft') {
            const node = visible[highlighted];
            if (node?.hasChildren && expanded.has(node.id)) toggle(node.id);
            else if (node?.depth > 0) {
                for (let index = highlighted - 1; index >= 0; index--) {
                    if (visible[index].depth === node.depth - 1) { next = index; break; }
                }
            }
        }
        else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            select(highlighted);
            return;
        } else if (event.key.length === 1) {
            const key = event.key.toLowerCase();
            const after = visible.findIndex((node, index) => index > highlighted && node.label.toLowerCase().startsWith(key));
            const wrapped = visible.findIndex(node => node.label.toLowerCase().startsWith(key));
            next = after >= 0 ? after : wrapped;
            if (next < 0) return;
        } else return;
        event.preventDefault();
        setHighlighted(next);
    };
    return (
        <div {...props} className={clsx(treeStyles.treeView, className)} role="tree" tabIndex={0} aria-activedescendant={visible[highlighted] ? `${treeId}-node-${visible[highlighted].id}` : undefined} onKeyDown={keyDown}>
            {visible.map((node, index) => (
                <div
                    id={`${treeId}-node-${node.id}`}
                    key={node.id}
                    className={clsx(treeStyles.treeNode, node.disabled && treeStyles.isDisabled, index === highlighted && treeStyles.isHighlighted)}
                    role="treeitem"
                    tabIndex={-1}
                    aria-level={node.depth + 1}
                    aria-selected={index === highlighted}
                    aria-expanded={node.hasChildren ? expanded.has(node.id) : undefined}
                    aria-disabled={node.disabled || undefined}
                    aria-owns={node.hasChildren && expanded.has(node.id) ? node.children?.map(child => `${treeId}-node-${child.id}`).join(' ') : undefined}
                    onClick={() => select(index)}
                    onDoubleClick={() => {
                        if (node.disabled) return;
                        if (node.hasChildren) toggle(node.id);
                        onDoubleClick?.(toOption(node));
                    }}
                >
                    <TreeNode node={node} expanded={expanded.has(node.id)} levelColors={levelColors} onExpand={() => toggle(node.id)} trailing={trailing?.(node)} />
                </div>
            ))}
        </div>
    );
}

export interface FluxFormTreeViewSelectOption extends FluxTreeViewOption {
    selectable?: boolean;
    children?: FluxFormTreeViewSelectOption[];
}
export type FluxFormTreeViewSelectValue = string | number | null | Array<string | number | null>;
export function FluxFormTreeViewSelect({ className, defaultValue, disabled, expandedDepth = 1, isCascading, isLoading, isMultiple, isReadonly, isSearchable, levelColors, name, onValueChange, options, placeholder, value }: { className?: string; defaultValue?: FluxFormTreeViewSelectValue; disabled?: boolean; expandedDepth?: number; isCascading?: boolean; isLoading?: boolean; isMultiple?: boolean; isReadonly?: boolean; isSearchable?: boolean; levelColors?: Array<FluxColor | string>; name?: string; onValueChange?: (value: FluxFormTreeViewSelectValue) => void; options: FluxFormTreeViewSelectOption[]; placeholder?: string; value?: FluxFormTreeViewSelectValue }) {
    const selectId = useId();
    const controlled = value !== undefined;
    const [inner, setInner] = useState<FluxFormTreeViewSelectValue>(defaultValue ?? (isMultiple ? [] : null));
    const current = controlled ? value : inner;
    const selected = new Set(Array.isArray(current) ? current : current == null ? [] : [current]);
    const [open, setOpen] = useState(false),
        [search, setSearch] = useState(''),
        [expanded, setExpanded] = useState(() => seededExpansion(options, expandedDepth)),
        [highlighted, setHighlighted] = useState(0);
    const seedKey = expansionKey(options, expandedDepth);
    useEffect(() => setExpanded(seededExpansion(options, expandedDepth)), [seedKey]);
    const all = flattenTree(options, expanded, true);
    const visible = (search ? all.filter((node) => node.label.toLowerCase().includes(search.toLowerCase())) : flattenTree(options, expanded)) as FluxTreeFlatNode<FluxFormTreeViewSelectOption>[];
    const update = (next: FluxFormTreeViewSelectValue) => {
        if (!controlled) setInner(next);
        onValueChange?.(next);
    };
    const locked = (node: FluxTreeFlatNode<FluxFormTreeViewSelectOption>) => Boolean(isCascading && isMultiple && node.ancestorIds.some((id) => selected.has(id)));
    const select = (node: FluxTreeFlatNode<FluxFormTreeViewSelectOption>) => {
        if (disabled || isReadonly || node.disabled || locked(node)) return;
        if (node.selectable === false) {
            if (node.hasChildren)
                setExpanded((old) => {
                    const next = new Set(old);
                    next.has(node.id) ? next.delete(node.id) : next.add(node.id);
                    return next;
                });
            return;
        }
        if (isMultiple) update(selected.has(node.id) ? ([...selected].filter((id) => id !== node.id) as Array<string | number>) : ([...selected, node.id] as Array<string | number>));
        else {
            update(node.id);
            setOpen(false);
        }
        if (node.hasChildren) setExpanded((old) => new Set(old).add(node.id));
    };
    const selectedNodes = all.filter((node) => selected.has(node.id));
    const enabledIndexes = visible.map((node, index) => !node.disabled && !locked(node) ? index : -1).filter(index => index >= 0);
    const activeIndex = enabledIndexes.includes(highlighted) ? highlighted : (enabledIndexes[0] ?? -1);
    const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (disabled || isReadonly) return;
        const fromSearch = event.target instanceof HTMLInputElement;
        if (!open) {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {event.preventDefault(); setOpen(true); setHighlighted(enabledIndexes[0] ?? 0);}
            return;
        }
        if (event.key === 'Escape') {event.preventDefault(); setOpen(false); event.currentTarget.focus(); return;}
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            const position = enabledIndexes.indexOf(activeIndex);
            if (event.key === 'Home') setHighlighted(enabledIndexes[0] ?? 0);
            else if (event.key === 'End') setHighlighted(enabledIndexes.at(-1) ?? 0);
            else setHighlighted(enabledIndexes[Math.max(0, Math.min(enabledIndexes.length - 1, position + (event.key === 'ArrowDown' ? 1 : -1)))] ?? 0);
        } else if (event.key === 'Enter' || (event.key === ' ' && !fromSearch)) {
            event.preventDefault();
            const node = visible[activeIndex];
            if (node) select(node);
        }
    };
    return (
        <div className={clsx(formStyles.formSelect, disabled && formStyles.isDisabled, open && formStyles.isFocused, className)} role="combobox" aria-expanded={open} aria-controls={`${selectId}-listbox`} aria-activedescendant={open && visible[activeIndex] ? `${selectId}-option-${visible[activeIndex].id}` : undefined} aria-disabled={disabled || undefined} aria-readonly={isReadonly || undefined} tabIndex={disabled ? -1 : 0} onKeyDown={keyDown} onClick={() => !disabled && !isReadonly && setOpen(!open)}>
            {isMultiple ? selectedNodes.map((node) => <FluxTag key={node.id} label={node.label} isDeletable onDelete={() => update([...selected].filter((id) => id !== node.id) as Array<string | number>)} />) : (selectedNodes[0]?.label ?? placeholder)}
            {isLoading ? <FluxSpinner className={formStyles.formSelectIcon} size={16} /> : <FluxIcon className={formStyles.formSelectIcon} name="angles-up-down" size={16} />}
            {name && <input type="hidden" name={name} value={Array.isArray(current) ? current.map(String).join(',') : String(current ?? '')} />}
            {open && (
                <div className={formStyles.formSelectPopup} onClick={(event) => event.stopPropagation()}>
                    {isSearchable && <input className={formStyles.formSelectInput} type="search" aria-label="Search" value={search} autoFocus onChange={(event) => setSearch(event.target.value)} />}
                    <div id={`${selectId}-listbox`} className={treeSelectStyles.treeViewSelectList} role="listbox" aria-multiselectable={isMultiple || undefined}>
                        {visible.length === 0 && <div className={treeSelectStyles.treeViewSelectEmpty}>No items</div>}
                        {visible.map((node) => (
                            <div id={`${selectId}-option-${node.id}`} key={node.id} className={clsx(treeSelectStyles.treeNode, node.selectable !== false && treeSelectStyles.isSelectable, node.selectable === false && node.hasChildren && treeSelectStyles.isExpandable, (node.disabled || locked(node)) && treeSelectStyles.isDisabled, visible[activeIndex]?.id === node.id && treeSelectStyles.isHighlighted)} role={node.selectable === false ? 'presentation' : 'option'} aria-selected={node.selectable === false ? undefined : selected.has(node.id) || locked(node)} aria-disabled={node.disabled || locked(node) || undefined} onMouseEnter={() => setHighlighted(visible.indexOf(node))} onClick={() => select(node)}>
                                <TreeNode
                                    node={node}
                                    expanded={expanded.has(node.id) || Boolean(search)}
                                    levelColors={levelColors}
                                    onExpand={() =>
                                        setExpanded((old) => {
                                            const next = new Set(old);
                                            next.has(node.id) ? next.delete(node.id) : next.add(node.id);
                                            return next;
                                        })
                                    }
                                    trailing={node.selectable === false ? undefined : <input className={treeSelectStyles.treeNodeControl} type={isMultiple ? 'checkbox' : 'radio'} readOnly tabIndex={-1} checked={selected.has(node.id) || locked(node)} aria-hidden="true" />}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function timeZoneOptions() {
    const supported = (Intl as typeof Intl & { supportedValuesOf?: (key: 'timeZone') => string[] }).supportedValuesOf?.('timeZone') ?? ['UTC'];
    const groups = new Map<string, Array<{ label: string; value: string }>>();
    for (const zone of supported) {
        const group = zone.includes('/') ? zone.split('/')[0] : 'Other';
        let offset = '';
        try {
            offset = new Intl.DateTimeFormat(undefined, { timeZone: zone, timeZoneName: 'longOffset' }).formatToParts().find((part) => part.type === 'timeZoneName')?.value ?? '';
        } catch {
            continue;
        }
        const options = groups.get(group) ?? [];
        options.push({ label: `${zone.replaceAll('_', ' ').replaceAll('/', ' / ')} ${offset}`.trim(), value: zone });
        groups.set(group, options);
    }
    return Array.from(groups, ([label, options]) => ({ label, options: options.sort((a, b) => a.label.localeCompare(b.label)) }));
}
export function FluxFormTimeZonePicker(props: Omit<React.ComponentProps<typeof FluxFormSelect>, 'isSearchable' | 'options'>) {
    const options = useMemo(timeZoneOptions, []);
    return <FluxFormSelect {...props} isSearchable options={options} />;
}

export interface FluxKanbanMoveEvent {
    beforeItemId?: string | number;
    fromColumnId: string | number;
    fromSwimlaneId?: string | number;
    itemId: string | number;
    toColumnId: string | number;
    toSwimlaneId?: string | number;
}
export interface FluxKanbanMoveColumnEvent {
    beforeColumnId?: string | number;
    columnId: string | number;
}
interface DragState {
    columnId: string | number;
    itemId: string | number;
    swimlaneId?: string | number;
}
interface KanbanContextValue {
    disabled: boolean;
    drag: DragState | null;
    onMove?: (event: FluxKanbanMoveEvent) => void;
    onMoveColumn?: (event: FluxKanbanMoveColumnEvent) => void;
    reorderableColumns: boolean;
    registerColumn(id: string | number): () => void;
    registerItem(id: string | number): () => void;
    registerSwimlane(id: string | number): () => void;
    resolveColumn(id: string): string | number;
    resolveItem(id: string): string | number;
    resolveSwimlane(id?: string): string | number | undefined;
    setDrag(value: DragState | null): void;
}
const KanbanContext = createContext<KanbanContextValue | null>(null);
const SwimlaneContext = createContext<string | number | undefined>(undefined);
export function FluxKanban({ canMove, children, className, disabled = false, onMove, onMoveColumn, reorderableColumns = false, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDrop'> & { canMove?: (event: FluxKanbanMoveEvent) => boolean; disabled?: boolean; onMove?: (event: FluxKanbanMoveEvent) => void; onMoveColumn?: (event: FluxKanbanMoveColumnEvent) => void; reorderableColumns?: boolean }) {
    const [drag, setDrag] = useState<DragState | null>(null),
        [message, setMessage] = useState('');
    const columnIds = useRef(new Map<string, string | number>());
    const itemIds = useRef(new Map<string, string | number>());
    const swimlaneIds = useRef(new Map<string, string | number>());
    const emitMove = (event: FluxKanbanMoveEvent) => {
        if (canMove?.(event) === false) {
            setMessage('Move not allowed');
            return;
        }
        onMove?.(event);
        setMessage(`Moved item ${event.itemId}`);
    };
    const context = useMemo(
        () => ({
            disabled,
            drag,
            onMove: emitMove,
            onMoveColumn,
            reorderableColumns,
            registerColumn(id: string | number) {
                columnIds.current.set(String(id), id);
                return () => columnIds.current.delete(String(id));
            },
            registerItem(id: string | number) {
                itemIds.current.set(String(id), id);
                return () => itemIds.current.delete(String(id));
            },
            registerSwimlane(id: string | number) {
                swimlaneIds.current.set(String(id), id);
                return () => swimlaneIds.current.delete(String(id));
            },
            resolveColumn(id: string) {
                return columnIds.current.get(id) ?? id;
            },
            resolveItem(id: string) {
                return itemIds.current.get(id) ?? id;
            },
            resolveSwimlane(id?: string) {
                return id === undefined ? undefined : swimlaneIds.current.get(id) ?? id;
            },
            setDrag,
        }),
        [canMove, disabled, drag, onMove, onMoveColumn, reorderableColumns],
    );
    return (
        <KanbanContext.Provider value={context}>
            <div {...props} className={clsx(kanbanStyles.kanban, drag && kanbanStyles.isBoardDragging, className)} role="group" aria-roledescription="Kanban board">
                {children}
                <div className={kanbanStyles.kanbanLiveRegion} aria-live="polite" aria-atomic="true">
                    {message}
                </div>
            </div>
        </KanbanContext.Provider>
    );
}
export function FluxKanbanColumn({ actions, children, className, columnId, count, disabled = false, empty, footer, icon, label, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'id'> & { actions?: ReactNode; columnId: string | number; count?: string | number; disabled?: boolean; empty?: ReactNode; footer?: ReactNode; icon?: FluxIconName; label: string }) {
    const board = useContext(KanbanContext),
        swimlaneId = useContext(SwimlaneContext),
        reorderable = Boolean(board?.reorderableColumns && !disabled && !board.disabled);
    useEffect(() => board?.registerColumn(columnId), [board, columnId]);
    if (!board) throw new Error('FluxKanbanColumn must be inside FluxKanban');
    const drop = (event: DragEvent<HTMLDivElement>) => {
        if (!board.drag || disabled || board.disabled) return;
        event.preventDefault();
        const item = (event.target as HTMLElement).closest<HTMLElement>('[data-kanban-item]');
        board.onMove?.({ ...board.drag, fromColumnId: board.drag.columnId, fromSwimlaneId: board.drag.swimlaneId, toColumnId: columnId, toSwimlaneId: swimlaneId, beforeItemId: item?.dataset.kanbanItemId ? board.resolveItem(item.dataset.kanbanItemId) : undefined });
        board.setDrag(null);
    };
    const columnDrag = (event: DragEvent<HTMLElement>) => {
        if (!reorderable) return;
        event.dataTransfer.setData('application/x-flux-column', String(columnId));
    };
    const columnDrop = (event: DragEvent<HTMLElement>) => {
        const id = event.dataTransfer.getData('application/x-flux-column');
        if (!id || id === String(columnId)) return;
        event.preventDefault();
        board.onMoveColumn?.({ columnId: board.resolveColumn(id), beforeColumnId: columnId });
    };
    return (
        <div {...props} className={clsx(kanbanStyles.kanbanColumn, disabled && kanbanStyles.isDisabled, reorderable && kanbanStyles.isReorderable, className)} role="list" aria-roledescription="Kanban column" aria-label={label} aria-disabled={disabled || undefined} data-kanban-column={columnId}>
            <header
                className={kanbanStyles.kanbanColumnHeader}
                draggable={reorderable}
                tabIndex={reorderable ? 0 : undefined}
                aria-roledescription={reorderable ? 'Draggable column' : undefined}
                onDragStart={columnDrag}
                onDragOver={(event) => reorderable && event.preventDefault()}
                onDrop={columnDrop}
                onKeyDown={(event) => {
                    if (!reorderable || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
                    const columns = Array.from(event.currentTarget.closest('[aria-roledescription="Kanban board"]')?.querySelectorAll<HTMLElement>('[data-kanban-column]') ?? []);
                    const index = columns.findIndex((column) => column.dataset.kanbanColumn === String(columnId));
                    const before = event.key === 'ArrowLeft' ? columns[index - 1] : columns[index + 2];
                    if (event.key === 'ArrowLeft' ? index > 0 : index < columns.length - 1) {
                        event.preventDefault();
                        board.onMoveColumn?.({ columnId, beforeColumnId: before?.dataset.kanbanColumn ? board.resolveColumn(before.dataset.kanbanColumn) : undefined });
                    }
                }}
            >
                <div className={kanbanStyles.kanbanColumnHeaderCaption}>
                    {icon && <FluxIcon name={icon} />}
                    <span>{label}</span>
                    {count != null && <FluxBadge label={String(count)} />}
                </div>
                {actions}
            </header>
            <div
                className={kanbanStyles.kanbanColumnBody}
                onDragOver={(event) => {
                    if (board.drag && !disabled) event.preventDefault();
                }}
                onDrop={drop}
            >
                {children}
                {!children && empty && <div className={kanbanStyles.kanbanColumnEmpty}>{empty}</div>}
            </div>
            {footer && <footer className={kanbanStyles.kanbanColumnFooter}>{footer}</footer>}
        </div>
    );
}
export function FluxKanbanItem({ children, className, columnId, disabled = false, itemId, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'id'> & { columnId: string | number; disabled?: boolean; itemId: string | number }) {
    const board = useContext(KanbanContext),
        swimlaneId = useContext(SwimlaneContext),
        [grabbed, setGrabbed] = useState(false);
    useEffect(() => board?.registerItem(itemId), [board, itemId]);
    if (!board) throw new Error('FluxKanbanItem must be inside FluxKanban');
    const inactive = disabled || board.disabled;
    const begin = (event: DragEvent<HTMLDivElement>) => {
        if (inactive) {
            event.preventDefault();
            return;
        }
        board.setDrag({ itemId, columnId, swimlaneId });
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', `item:${itemId}`);
    };
    const key = (event: KeyboardEvent<HTMLDivElement>) => {
        if (inactive) return;
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            setGrabbed(!grabbed);
            return;
        }
        if (!grabbed || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        const columns = Array.from(event.currentTarget.closest('[aria-roledescription="Kanban board"]')?.querySelectorAll<HTMLElement>('[data-kanban-column]') ?? []);
        const current = columns.findIndex((column) => column.dataset.kanbanColumn === String(columnId));
        const target = event.key === 'ArrowLeft' ? columns[current - 1] : event.key === 'ArrowRight' ? columns[current + 1] : columns[current];
        if (!target) return;
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            const items = Array.from(target.querySelectorAll<HTMLElement>('[data-kanban-item]')), index = items.findIndex(element => element.dataset.kanbanItemId === String(itemId));
            if (event.key === 'ArrowUp' && index > 0) board.onMove?.({itemId, fromColumnId: columnId, fromSwimlaneId: swimlaneId, toColumnId: columnId, toSwimlaneId: swimlaneId, beforeItemId: board.resolveItem(items[index - 1].dataset.kanbanItemId!)});
            else if (event.key === 'ArrowDown' && index >= 0 && index < items.length - 1) board.onMove?.({itemId, fromColumnId: columnId, fromSwimlaneId: swimlaneId, toColumnId: columnId, toSwimlaneId: swimlaneId, beforeItemId: items[index + 2]?.dataset.kanbanItemId ? board.resolveItem(items[index + 2].dataset.kanbanItemId!) : undefined});
            return;
        }
        board.onMove?.({ itemId, fromColumnId: columnId, fromSwimlaneId: swimlaneId, toColumnId: board.resolveColumn(target.dataset.kanbanColumn!), toSwimlaneId: board.resolveSwimlane(target.closest<HTMLElement>('[data-kanban-swimlane]')?.dataset.kanbanSwimlane) });
    };
    return (
        <div {...props} className={clsx(kanbanStyles.kanbanItem, board.drag?.itemId === itemId && kanbanStyles.isDragging, grabbed && kanbanStyles.isGrabbed, inactive && kanbanStyles.isDisabled, className)} data-kanban-item data-kanban-item-id={itemId} role="listitem" aria-roledescription="Kanban item" aria-disabled={inactive || undefined} draggable={!inactive} tabIndex={inactive ? -1 : 0} onDragStart={begin} onDragEnd={() => board.setDrag(null)} onKeyDown={key}>
            {children}
        </div>
    );
}
export function FluxKanbanSwimlane({ children, className, color = 'gray', count, defaultCollapsed = false, isCollapsed, label, onCollapsedChange, swimlaneId }: Omit<HTMLAttributes<HTMLDivElement>, 'color'> & { color?: FluxColor; count?: number; defaultCollapsed?: boolean; isCollapsed?: boolean; label: string; onCollapsedChange?: (collapsed: boolean) => void; swimlaneId?: string | number }) {
    const fallbackId = useId(),
        board = useContext(KanbanContext),
        controlled = isCollapsed !== undefined,
        [inner, setInner] = useState(defaultCollapsed),
        collapsed = controlled ? isCollapsed : inner,
        id = swimlaneId ?? fallbackId;
    useEffect(() => board?.registerSwimlane(id), [board, id]);
    const toggle = () => {
        if (!controlled) setInner(!collapsed);
        onCollapsedChange?.(!collapsed);
    };
    const colorClass = kanbanStyles[`kanbanSwimlane${color[0].toUpperCase()}${color.slice(1)}`];
    return (
        <SwimlaneContext.Provider value={id}>
            <div className={clsx(kanbanStyles.kanbanSwimlane, colorClass, collapsed && kanbanStyles.isCollapsed, className)} data-kanban-swimlane={id} data-kanban-swimlane-collapsed={collapsed ? '' : undefined} role="group" aria-roledescription="Kanban swimlane" aria-label={label}>
                <header className={kanbanStyles.kanbanSwimlaneHeader}>
                    <div className={kanbanStyles.kanbanSwimlaneCaption}>
                        <button className={kanbanStyles.kanbanSwimlaneToggle} type="button" aria-expanded={!collapsed} aria-label={collapsed ? 'Expand group' : 'Collapse group'} onClick={toggle}>
                            <FluxIcon className={clsx(kanbanStyles.kanbanSwimlaneChevron, !collapsed && kanbanStyles.isExpanded)} name="angle-right" size={16} />
                            <span className={kanbanStyles.kanbanSwimlaneLabel}>{label}</span>
                        </button>
                        {count != null && <FluxBadge color={color} label={String(count)} />}
                    </div>
                </header>
                {!collapsed && children}
            </div>
        </SwimlaneContext.Provider>
    );
}
