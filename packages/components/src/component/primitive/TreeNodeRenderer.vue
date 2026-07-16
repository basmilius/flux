<template>
    <div
        :class="[$style.treeNodeLineArea, expanded && node.hasChildren && $style.hasDropLine]"
        :style="lineAreaStyle">
        <span
            v-for="(showLine, guideIndex) in node.lineGuides"
            :key="`g-${guideIndex}`"
            :class="[$style.treeIndent, showLine && $style.hasLine]"/>

        <span
            v-if="node.depth > 0"
            :class="[$style.treeConnector, node.isLast && $style.isLast]"/>

        <button
            v-if="node.hasChildren"
            type="button"
            :class="clsx($style.treeNodeMarker, markerColorClass, $style.isToggle, expanded && $style.isExpanded)"
            :style="markerStyle"
            :aria-expanded="expanded"
            :aria-label="expanded ? translate('flux.collapseRow') : translate('flux.expandRow')"
            tabindex="-1"
            @click="onExpandClick($event)">
            <FluxIcon
                name="angle-right"
                :size="14"/>
        </button>

        <span
            v-else
            :class="clsx($style.treeNodeMarker, markerColorClass)"
            :style="markerStyle"/>
    </div>

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
    import { clsx } from 'clsx';
    import { computed, type CSSProperties } from 'vue';
    import { FLUX_COLORS, type TreeBaseOption, type TreeFlatNode, useTranslate } from '~flux/components/composable/private';
    import FluxIcon from '../FluxIcon.vue';
    import $style from '~flux/components/css/component/primitive/TreeNode.module.scss';

    defineOptions({
        inheritAttrs: false
    });

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

    const MARKER_COLOR_CLASS = {
        gray: $style.treeNodeMarkerGray,
        primary: $style.treeNodeMarkerPrimary,
        danger: $style.treeNodeMarkerDanger,
        info: $style.treeNodeMarkerInfo,
        success: $style.treeNodeMarkerSuccess,
        warning: $style.treeNodeMarkerWarning
    } as const;

    const translate = useTranslate();

    // Column index of this node's marker: one column per guide, plus the connector's own column.
    // The stylesheet turns it into the x of the line dropping to the node's children.
    const lineAreaStyle = computed(() => ({'--tree-marker-column': node.lineGuides.length + (node.depth > 0 ? 1 : 0)}) as CSSProperties);

    // Per-node color wins over the per-depth levelColors fallback; falsy means the neutral gray default.
    const colorValue = computed(() => node.color ?? levelColors?.[node.depth]);
    const isFluxColor = computed(() => FLUX_COLORS.includes(colorValue.value as FluxColor));
    const markerColorClass = computed(() => {
        if (colorValue.value == null) {
            return undefined;
        }

        return isFluxColor.value ? MARKER_COLOR_CLASS[colorValue.value as FluxColor] : $style.treeNodeMarkerCustom;
    });
    const markerStyle = computed(() => (!isFluxColor.value && colorValue.value != null ? {'--tree-marker-color': colorValue.value} : undefined) as CSSProperties | undefined);

    function onExpandClick(evt: MouseEvent): void {
        emit('expandClick', evt);
    }
</script>
