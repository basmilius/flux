import type { FluxColor, FluxIconName } from '@flux-ui/types';
import { computed, type ComputedRef, nextTick, ref, type Ref, unref, watch } from 'vue';

export type TreeBaseOption = {
    readonly id: string | number;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly color?: FluxColor | string;
    readonly disabled?: boolean;
    readonly children?: TreeBaseOption[];
};

export type TreeFlatNode<TOption extends TreeBaseOption = TreeBaseOption> = TOption & {
    readonly depth: number;
    readonly isLast: boolean;
    readonly hasChildren: boolean;
    readonly lineGuides: boolean[];
    readonly ancestorIds: (string | number)[];
};

export const FLUX_COLORS: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
export const INITIAL_HIGHLIGHTED_INDEX = -1;

// Guides cover the levels *above* a node's direct parent — the parent link itself is drawn by the
// connector. Root children therefore get no guide, which keeps every connector elbow aligned with
// its parent's marker instead of one indent step to the right.
function childGuides(depth: number, parentGuides: boolean[], isLast: boolean): boolean[] {
    return depth === 0 ? [] : [...parentGuides, !isLast];
}

export function flattenVisible<TOption extends TreeBaseOption>(
    nodes: TOption[],
    depth: number,
    expanded: Set<string | number>,
    parentGuides: boolean[] = [],
    ancestorIds: (string | number)[] = []
): TreeFlatNode<TOption>[] {
    return nodes.flatMap((node, index) => {
        const isLast = index === nodes.length - 1;
        const hasChildren = !!node.children?.length;
        const flatNode = {...node, depth, isLast, hasChildren, lineGuides: parentGuides, ancestorIds} as TreeFlatNode<TOption>;

        if (hasChildren && expanded.has(node.id)) {
            return [flatNode, ...flattenVisible(node.children as TOption[], depth + 1, expanded, childGuides(depth, parentGuides, isLast), [...ancestorIds, node.id])];
        }

        return [flatNode];
    });
}

export function flattenAll<TOption extends TreeBaseOption>(
    nodes: TOption[],
    depth = 0,
    ancestorIds: (string | number)[] = []
): TreeFlatNode<TOption>[] {
    return nodes.flatMap(node => [
        {...node, depth, isLast: false, hasChildren: !!node.children?.length, lineGuides: [] as boolean[], ancestorIds} as TreeFlatNode<TOption>,
        ...(node.children ? flattenAll(node.children as TOption[], depth + 1, [...ancestorIds, node.id]) : [])
    ]);
}

function subtreeMatches(node: TreeBaseOption, query: string): boolean {
    if (node.label.toLowerCase().includes(query)) {
        return true;
    }

    return (node.children ?? []).some(child => subtreeMatches(child, query));
}

// Ancestor-preserving search: keep a node when it (or a descendant) matches, so a match and its
// ancestors stay visible while the hierarchy is preserved. Non-matching branches are pruned, and a
// match's subtree is shown expanded without touching the expand state. `hasChildren` reflects the
// remaining visible children, so a matched leaf shows a dot rather than a stray chevron.
export function flattenSearch<TOption extends TreeBaseOption>(
    nodes: TOption[],
    query: string,
    depth = 0,
    parentGuides: boolean[] = [],
    ancestorIds: (string | number)[] = []
): TreeFlatNode<TOption>[] {
    const kept = nodes.filter(node => subtreeMatches(node, query));

    return kept.flatMap((node, index) => {
        const isLast = index === kept.length - 1;
        const children = node.children?.length
            ? flattenSearch(node.children as TOption[], query, depth + 1, childGuides(depth, parentGuides, isLast), [...ancestorIds, node.id])
            : [];
        const flatNode = {...node, depth, isLast, hasChildren: children.length > 0, lineGuides: parentGuides, ancestorIds} as TreeFlatNode<TOption>;

        return [flatNode, ...children];
    });
}

export function useTreeView<TNode extends TreeFlatNode>(params: {
    readonly expandedIds: Ref<Set<string | number>>;
    readonly nodeElementRefs: Readonly<Ref<HTMLDivElement[] | null | undefined>>;
    readonly visibleNodes: ComputedRef<TNode[]>;
}): {
    readonly highlightedIndex: Ref<number>;
    readonly highlightedId: ComputedRef<string | number | null>;
    toggleExpand: (nodeId: string | number) => void;
    onExpandClick: (node: TNode, evt: MouseEvent) => void;
    onKeyNavigate: (evt: KeyboardEvent, onActivate: (node: TNode) => void) => boolean;
} {
    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);
    const highlightedId = computed(() => {
        const index = unref(highlightedIndex);
        return index >= 0 ? (unref(params.visibleNodes)[index]?.id ?? null) : null;
    });

    function toggleExpand(nodeId: string | number): void {
        const ids = new Set(unref(params.expandedIds));

        if (ids.has(nodeId)) {
            ids.delete(nodeId);
        } else {
            ids.add(nodeId);
        }

        params.expandedIds.value = ids;
    }

    function onExpandClick(node: TNode, evt: MouseEvent): void {
        if (!node.children?.length) {
            return;
        }

        evt.stopPropagation();
        toggleExpand(node.id);
    }

    function onKeyNavigate(evt: KeyboardEvent, onActivate: (node: TNode) => void): boolean {
        const nodes = unref(params.visibleNodes);
        const current = unref(highlightedIndex);

        if (nodes.length === 0) {
            return false;
        }

        switch (evt.key) {
            case 'ArrowDown':
                evt.preventDefault();
                highlightedIndex.value = current === INITIAL_HIGHLIGHTED_INDEX
                    ? 0
                    : Math.min(nodes.length - 1, current + 1);
                return true;

            case 'ArrowUp':
                evt.preventDefault();
                highlightedIndex.value = current === INITIAL_HIGHLIGHTED_INDEX
                    ? nodes.length - 1
                    : Math.max(0, current - 1);
                return true;

            case 'ArrowRight':
                evt.preventDefault();
                if (current >= 0) {
                    const node = nodes[current];
                    if (node.children?.length) {
                        if (!unref(params.expandedIds).has(node.id)) {
                            toggleExpand(node.id);
                        } else if (current + 1 < nodes.length && nodes[current + 1].depth > node.depth) {
                            highlightedIndex.value = current + 1;
                        }
                    }
                }
                return true;

            case 'ArrowLeft':
                evt.preventDefault();
                if (current >= 0) {
                    const node = nodes[current];
                    if (node.children?.length && unref(params.expandedIds).has(node.id)) {
                        toggleExpand(node.id);
                    } else if (node.depth > 0) {
                        for (let i = current - 1; i >= 0; i--) {
                            if (nodes[i].depth === node.depth - 1) {
                                highlightedIndex.value = i;
                                break;
                            }
                        }
                    }
                }
                return true;

            case 'Enter':
            case ' ':
                evt.preventDefault();
                if (current >= 0 && nodes[current]) {
                    onActivate(nodes[current]);
                }
                return true;

            default:
                if (evt.key.length === 1) {
                    const lowerKey = evt.key.toLowerCase();
                    let matchIndex = nodes.findIndex((n, i) => i > current && n.label.toLowerCase().startsWith(lowerKey));
                    if (matchIndex < 0) {
                        matchIndex = nodes.findIndex(n => n.label.toLowerCase().startsWith(lowerKey));
                    }
                    if (matchIndex >= 0) {
                        highlightedIndex.value = matchIndex;
                        return true;
                    }
                }
                return false;
        }
    }

    watch(highlightedIndex, index => {
        if (index < 0) {
            return;
        }

        nextTick(() => unref(params.nodeElementRefs)?.[index]?.scrollIntoView({block: 'nearest'}));
    });

    // Keep the highlight pinned to the same node by identity. When the visible set changes (e.g. a
    // node above the highlight collapses) the positional index would otherwise jump to an unrelated
    // node, so we re-derive the index from the previously highlighted node's id.
    watch(params.visibleNodes, (nodes, previousNodes) => {
        const current = unref(highlightedIndex);

        if (current < 0) {
            return;
        }

        const previousId = previousNodes?.[current]?.id;

        if (previousId !== undefined) {
            const nextIndex = nodes.findIndex(node => node.id === previousId);

            if (nextIndex >= 0) {
                highlightedIndex.value = nextIndex;
                return;
            }
        }

        if (current >= nodes.length) {
            highlightedIndex.value = Math.max(INITIAL_HIGHLIGHTED_INDEX, nodes.length - 1);
        }
    });

    return {highlightedIndex, highlightedId, toggleExpand, onExpandClick, onKeyNavigate};
}
