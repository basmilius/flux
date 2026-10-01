<template>
    <li :class="$style.treeItem">
        <div
            :class="clsx(
                $style.treeItemRow,
                isHighlighted && $style.isHighlighted
            )">
            <span
                :class="clsx($style.treeItemMarker, markerColorClass)"
                :style="isFluxColor ? undefined : {'--tree-marker-color': color}"
                aria-hidden="true"/>

            <span :class="$style.treeItemLabel">
                <slot name="label">{{ label }}</slot>
            </span>
        </div>

        <ul
            v-if="slots.default"
            :class="$style.treeItemChildren"
            role="list">
            <slot/>
        </ul>
    </li>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, unref, type VNode } from 'vue';
    import { FLUX_COLORS } from '~flux/components/composable/private';
    import $style from '~flux/components/css/component/Tree.module.scss';

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor | string;
        readonly isHighlighted?: boolean;
        readonly label?: string;
    }>();

    const slots = defineSlots<{
        default?(): VNode[];
        label?(): VNode[];
    }>();

    const MARKER_COLOR_CLASS = {
        gray: $style.treeItemMarkerGray,
        primary: $style.treeItemMarkerPrimary,
        danger: $style.treeItemMarkerDanger,
        info: $style.treeItemMarkerInfo,
        success: $style.treeItemMarkerSuccess,
        warning: $style.treeItemMarkerWarning
    } as const;

    const isFluxColor = computed(() => FLUX_COLORS.includes(color as FluxColor));
    const markerColorClass = computed(() => unref(isFluxColor) ? MARKER_COLOR_CLASS[color as FluxColor] : undefined);
</script>
