<template>
    <div
        :class="$style.treeView"
        role="tree"
        tabindex="0"
        @keydown="onKeyDown">

        <div
            v-for="(node, nodeIndex) in visibleNodes"
            ref="nodeElements"
            :key="node.id"
            :class="clsx(
                $style.treeNode,
                nodeIndex === highlightedIndex && $style.isHighlighted
            )"
            role="treeitem"
            tabindex="-1"
            :aria-expanded="node.children?.length ? expandedIds.has(node.id) : undefined"
            @click="onNodeClick(node)"
            @dblclick="onNodeDblClick(node)">

            <div :class="$style.treeNodeLineArea">
                <span
                    v-for="(showLine, guideIndex) in node.lineGuides"
                    :key="`g-${guideIndex}`"
                    :class="[$style.treeIndent, showLine && $style.hasLine]"/>

                <span
                    v-if="node.depth > 0"
                    :class="[$style.treeConnector, node.isLast && $style.isLast]"/>

                <span
                    :class="$style.treeNodeExpand"
                    @click="onExpandClick(node, $event)">
                    <FluxIcon
                        v-if="node.children?.length"
                        :name="expandedIds.has(node.id) ? 'angle-down' : 'angle-right'"
                        :size="12"/>
                </span>
            </div>

            <span
                v-if="getLevelColor(node.depth, levelColors)"
                :class="$style.treeNodeColorDot"
                :style="{ background: getLevelColor(node.depth, levelColors) }"/>

            <FluxIcon
                v-if="node.icon"
                :class="$style.treeNodeIcon"
                :name="node.icon"
                :size="16"/>

            <span :class="$style.treeNodeLabel">{{ node.label }}</span>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxTreeViewOption } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, ref, unref, useTemplateRef } from 'vue';
    import { flattenVisible, getLevelColor, useTreeView } from '$flux/composable/private';
    import type { TreeFlatNode } from '$flux/composable/private';
    import FluxIcon from '$flux/component/FluxIcon.vue';
    import $style from '$flux/css/component/TreeView.module.scss';

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

    const nodeElementRefs = useTemplateRef<HTMLDivElement[]>('nodeElements');

    const expandedIds = ref(new Set<string | number>());

    const visibleNodes = computed(() => flattenVisible(options, 0, unref(expandedIds)));

    const {highlightedIndex, toggleExpand, onExpandClick, onKeyNavigate} = useTreeView({
        expandedIds,
        nodeElementRefs,
        visibleNodes,
    });

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
