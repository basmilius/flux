<template>
    <div
        :class="$style.treeView"
        role="tree"
        tabindex="0"
        :aria-activedescendant="activeDescendant"
        @keydown="onKeyDown">

        <div
            v-for="(node, nodeIndex) in visibleNodes"
            ref="nodeElements"
            :id="nodeId(node.id)"
            :key="node.id"
            :class="clsx(
                $style.treeNode,
                nodeIndex === highlightedIndex && $style.isHighlighted
            )"
            role="treeitem"
            tabindex="-1"
            :aria-level="node.depth + 1"
            :aria-selected="nodeIndex === highlightedIndex"
            :aria-expanded="node.children?.length ? expandedIds.has(node.id) : undefined"
            :aria-owns="ownedIds(node)"
            @click="onNodeClick(node)"
            @dblclick="onNodeDblClick(node)">

            <TreeNodeRenderer
                :node="node"
                :expanded="expandedIds.has(node.id)"
                :level-colors="levelColors"
                @expand-click="onExpandClick(node, $event)">

                <template
                    v-if="slots.trailing"
                    #trailing="trailingProps">
                    <slot
                        name="trailing"
                        v-bind="trailingProps"/>
                </template>
            </TreeNodeRenderer>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxTreeViewOption } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, ref, unref, useId, useTemplateRef } from 'vue';
    import { flattenVisible, type TreeFlatNode, useTreeView } from '~flux/components/composable/private';
    import { TreeNodeRenderer } from './primitive';
    import $style from '~flux/components/css/component/TreeView.module.scss';

    type FlatNode = TreeFlatNode<FluxTreeViewOption>;

    const emit = defineEmits<{
        click: [option: FluxTreeViewOption];
        dblclick: [option: FluxTreeViewOption];
    }>();

    const {
        levelColors,
        options
    } = defineProps<{
        readonly levelColors?: (FluxColor | string)[];
        readonly options: FluxTreeViewOption[];
    }>();

    const slots = defineSlots<{
        trailing?(props: { node: FlatNode }): any;
    }>();

    const treeId = useId();

    const nodeElementRefs = useTemplateRef<HTMLDivElement[]>('nodeElements');

    const expandedIds = ref(new Set<string | number>());

    const visibleNodes = computed(() => flattenVisible(options, 0, unref(expandedIds)));

    const {highlightedIndex, highlightedId, toggleExpand, onExpandClick, onKeyNavigate} = useTreeView({
        expandedIds,
        nodeElementRefs,
        visibleNodes
    });

    const activeDescendant = computed(() => {
        const id = unref(highlightedId);
        return id !== null ? nodeId(id) : undefined;
    });

    function nodeId(id: string | number): string {
        return `${treeId}-node-${id}`;
    }

    // Express the parent → child relationship for assistive tech. The flat DOM places expanded
    // children as siblings, so aria-owns lists each expanded node's direct visible children by id —
    // the spec-sanctioned way to convey tree grouping without nested role="group" wrappers.
    function ownedIds(node: FlatNode): string | undefined {
        if (!node.children?.length || !unref(expandedIds).has(node.id)) {
            return undefined;
        }

        return node.children.map(child => nodeId(child.id)).join(' ');
    }

    function onNodeClick(node: FlatNode): void {
        const index = unref(visibleNodes).findIndex(n => n.id === node.id);
        highlightedIndex.value = index;

        const {depth: _depth, isLast: _isLast, lineGuides: _lineGuides, ...option} = node;
        emit('click', option as FluxTreeViewOption);
    }

    function onNodeDblClick(node: FlatNode): void {
        if (node.children?.length) {
            toggleExpand(node.id);
        }

        const {depth: _depth, isLast: _isLast, lineGuides: _lineGuides, ...option} = node;
        emit('dblclick', option as FluxTreeViewOption);
    }

    function onKeyDown(evt: KeyboardEvent): void {
        onKeyNavigate(evt, onNodeClick);
    }
</script>
