<template>
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
            @click="onExpandClick($event)">
            <FluxIcon
                v-if="node.children?.length"
                :name="expanded ? 'angle-down' : 'angle-right'"
                :size="12"/>
        </span>
    </div>

    <span
        v-if="dotColor"
        :class="$style.treeNodeColorDot"
        :style="{ background: dotColor }"/>

    <FluxIcon
        v-if="node.icon"
        :class="$style.treeNodeIcon"
        :name="node.icon"
        :size="16"/>

    <span :class="$style.treeNodeLabel">{{ node.label }}</span>

    <slot
        name="trailing"
        :node="node"/>
</template>

<script
    lang="ts"
    setup
    generic="TOption extends TreeBaseOption">
    import type { FluxColor } from '@flux-ui/types';
    import { computed } from 'vue';
    import type { TreeBaseOption, TreeFlatNode } from '$flux/composable/private';
    import { getLevelColor } from '$flux/composable/private';
    import FluxIcon from '$flux/component/FluxIcon.vue';
    import $style from '$flux/css/component/primitive/TreeNode.module.scss';

    const emit = defineEmits<{
        expandClick: [MouseEvent];
    }>();

    const {
        levelColors,
        node
    } = defineProps<{
        readonly node: TreeFlatNode<TOption>;
        readonly expanded: boolean;
        readonly levelColors?: (FluxColor | string)[];
    }>();

    defineSlots<{
        trailing?(props: { node: TreeFlatNode<TOption> }): any;
    }>();

    defineOptions({
        inheritAttrs: false
    });

    const dotColor = computed(() => getLevelColor(node.depth, levelColors));

    function onExpandClick(evt: MouseEvent): void {
        emit('expandClick', evt);
    }
</script>
