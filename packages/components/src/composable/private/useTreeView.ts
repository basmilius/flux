import type { FluxColor, FluxIconName } from '@flux-ui/types';
import { type ComputedRef, nextTick, ref, type Ref, unref, watch } from 'vue';

export type TreeBaseOption = {
    readonly id: string | number;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly children?: TreeBaseOption[];
};

export type TreeFlatNode<TOption extends TreeBaseOption = TreeBaseOption> = TOption & {
    readonly depth: number;
    readonly isLast: boolean;
    readonly lineGuides: boolean[];
};

export const FLUX_COLORS: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
export const INITIAL_HIGHLIGHTED_INDEX = -1;

export function flattenVisible<TOption extends TreeBaseOption>(
    nodes: TOption[],
    depth: number,
    expanded: Set<string | number>,
    parentGuides: boolean[] = []
): TreeFlatNode<TOption>[] {
    return nodes.flatMap((node, index) => {
        const isLast = index === nodes.length - 1;
        const flatNode = {...node, depth, isLast, lineGuides: parentGuides} as TreeFlatNode<TOption>;

        if (node.children?.length && expanded.has(node.id)) {
            const childGuides = [...parentGuides, !isLast];
            return [flatNode, ...flattenVisible(node.children as TOption[], depth + 1, expanded, childGuides)];
        }

        return [flatNode];
    });
}

export function flattenAll<TOption extends TreeBaseOption>(
    nodes: TOption[],
    depth = 0
): TreeFlatNode<TOption>[] {
    return nodes.flatMap(node => [
        {...node, depth, isLast: false, lineGuides: [] as boolean[]} as TreeFlatNode<TOption>,
        ...(node.children ? flattenAll(node.children as TOption[], depth + 1) : [])
    ]);
}

export function getLevelColor(depth: number, levelColors?: (FluxColor | string)[]): string | undefined {
    if (!levelColors || depth >= levelColors.length) {
        return undefined;
    }

    const color = levelColors[depth];

    if (FLUX_COLORS.includes(color as FluxColor)) {
        return `var(--${color}-600)`;
    }

    return color;
}

export function useTreeView<TNode extends TreeFlatNode>(params: {
    readonly expandedIds: Ref<Set<string | number>>;
    readonly nodeElementRefs: Readonly<Ref<HTMLDivElement[] | null | undefined>>;
    readonly visibleNodes: ComputedRef<TNode[]>;
}): {
    readonly highlightedIndex: Ref<number>;
    toggleExpand: (nodeId: string | number) => void;
    onExpandClick: (node: TNode, evt: MouseEvent) => void;
    onKeyNavigate: (evt: KeyboardEvent, onActivate: (node: TNode) => void) => boolean;
} {
    const highlightedIndex = ref(INITIAL_HIGHLIGHTED_INDEX);

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
                if (current >= 0) {
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

    watch(params.visibleNodes, nodes => {
        const current = unref(highlightedIndex);
        if (current >= nodes.length) {
            highlightedIndex.value = Math.max(INITIAL_HIGHLIGHTED_INDEX, nodes.length - 1);
        }
    });

    return {highlightedIndex, toggleExpand, onExpandClick, onKeyNavigate};
}
