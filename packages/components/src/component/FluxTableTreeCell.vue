<template>
    <div
        :class="$style.tableTreeCell"
        role="cell">
        <div
            ref="branch"
            :class="$style.treeBranch"
            :style="{width: branchWidth}">
            <button
                v-if="isExpandable"
                type="button"
                :class="clsx($style.treeMarker, markerColorClass, $style.isToggle, isExpanded && $style.isExpanded)"
                :style="markerStyle"
                :aria-expanded="isExpanded"
                :aria-label="isExpanded ? translate('flux.collapseRow') : translate('flux.expandRow')"
                @click="emit('toggle')">
                <FluxIcon
                    name="angle-right"
                    :size="14"/>
            </button>

            <span
                v-else
                :class="clsx($style.treeMarker, markerColorClass)"
                :style="markerStyle"/>
        </div>

        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { type FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, onUnmounted, toRef, useTemplateRef, type VNode } from 'vue';
    import { useTableInjection } from '~flux/components/composable';
    import { FLUX_COLORS, TREE_MARKER_SIZE, TREE_STEP, useTranslate } from '~flux/components/composable/private';
    import FluxIcon from './FluxIcon.vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    const emit = defineEmits<{
        toggle: [];
    }>();

    const {
        color = 'gray',
        isExpandable = false,
        isExpanded = false,
        level
    } = defineProps<{
        readonly color?: FluxColor | string;
        readonly isExpandable?: boolean;
        readonly isExpanded?: boolean;
        readonly level: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();

    const MARKER_COLOR_CLASS = {
        gray: $style.treeMarkerGray,
        primary: $style.treeMarkerPrimary,
        danger: $style.treeMarkerDanger,
        info: $style.treeMarkerInfo,
        success: $style.treeMarkerSuccess,
        warning: $style.treeMarkerWarning
    } as const;

    const branch = useTemplateRef('branch');
    const translate = useTranslate();

    const {registerTreeNode} = useTableInjection();

    const isFluxColor = computed(() => FLUX_COLORS.includes(color as FluxColor));
    const markerColorClass = computed(() => isFluxColor.value ? MARKER_COLOR_CLASS[color as FluxColor] : $style.treeMarkerCustom);

    const branchWidth = computed(() => `${(level + 1) * TREE_STEP}px`);

    const markerStyle = computed(() => ({
        left: `${level * TREE_STEP + (TREE_STEP - TREE_MARKER_SIZE) / 2}px`,
        ...(isFluxColor.value ? {} : {'--tree-marker-color': color})
    }));

    // Register the branch so the table can measure it and draw this node's guide
    // lines. Expansion state stays with the consuming application, which decides
    // which rows are rendered.
    const cleanup = registerTreeNode(branch, toRef(() => level));
    onUnmounted(cleanup);
</script>
