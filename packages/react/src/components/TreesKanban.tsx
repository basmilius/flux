import {TIME_ZONES, TIME_ZONE_GROUP_ORDER} from './timeZones';
import {useFluxTranslate} from '../i18n';
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
export function flattenTree<T extends FluxTreeViewOption>(options: T[], expanded: Set<string | number>, all = false, depth = 0, ancestors: Array<string | number> = [], parentGuides: boolean[] = []): FluxTreeFlatNode<T>[] {
    return options.flatMap((option, index) => {
        const isLast = index === options.length - 1;
        const flat = { ...option, depth, ancestorIds: ancestors, hasChildren: Boolean(option.children?.length), isLast, lineGuides: parentGuides } as FluxTreeFlatNode<T>;
        const childGuides = depth === 0 ? [] : [...parentGuides, !isLast];
        return [flat, ...(option.children && (all || expanded.has(option.id)) ? flattenTree(option.children as T[], expanded, all, depth + 1, [...ancestors, option.id], childGuides) : [])];
    });
}
export function seededExpansion(options: FluxTreeViewOption[], depth: number, level = 0, result = new Set<string | number>()) {
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
export function TreeNode({ expanded, levelColors, node, onExpand, trailing }: { expanded: boolean; levelColors?: Array<FluxColor | string>; node: FluxTreeFlatNode; onExpand(): void; trailing?: ReactNode }) {
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
                        <FluxIcon name="angle-right" size={12} />
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

export {FluxFormTreeViewSelect} from './TreeSelect';
export type {FluxFormTreeViewSelectOption, FluxFormTreeViewSelectValue, FluxFormTreeViewSelectProps} from './TreeSelect';

function timeZoneOptions(translate: ReturnType<typeof useFluxTranslate>) {
    const groups = new Map<string, Array<{label: string; value: string; command: string}>>();
    for (const zone of TIME_ZONES) {
        try {
            const label = new Intl.DateTimeFormat(undefined, {timeZone: zone}).resolvedOptions().timeZone.replaceAll('_', ' ').replaceAll('/', ' / ');
            const area = label.includes('/') ? label.split('/')[0].trim().toLowerCase() : 'other';
            const group = `flux.timezone${area[0].toUpperCase()}${area.slice(1)}`;
            const command = (new Intl.DateTimeFormat(undefined, {timeZone: zone, timeZoneName: 'longOffset'}).formatToParts().find(part => part.type === 'timeZoneName')?.value ?? '').replace(/^(GMT|UTC)/, '');
            const options = groups.get(group) ?? [];
            if (!options.some(option => option.label === label)) options.push({label, value: zone, command});
            groups.set(group, options);
        } catch {continue;}
    }
    return [...groups].sort(([a], [b]) => TIME_ZONE_GROUP_ORDER.indexOf(a as typeof TIME_ZONE_GROUP_ORDER[number]) - TIME_ZONE_GROUP_ORDER.indexOf(b as typeof TIME_ZONE_GROUP_ORDER[number])).flatMap(([label, options]) => [{label: translate(label as typeof TIME_ZONE_GROUP_ORDER[number])}, ...options.sort((a, b) => a.label.localeCompare(b.label))]);
}
export function FluxFormTimeZonePicker(props: Omit<React.ComponentProps<typeof FluxFormSelect>, 'isSearchable' | 'options'>) {
    const translate = useFluxTranslate();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const options = useMemo(() => mounted ? timeZoneOptions(translate) : [], [mounted, translate]);
    return <FluxFormSelect {...props} isSearchable options={options}/>;
}

export {FluxKanban, FluxKanbanColumn, FluxKanbanItem, FluxKanbanSwimlane, KanbanContext, KanbanLayoutContext, SwimlaneContext} from './Kanban';
export type {FluxKanbanMoveEvent, FluxKanbanMoveColumnEvent, KanbanContextValue, KanbanLayoutContextValue} from './Kanban';
