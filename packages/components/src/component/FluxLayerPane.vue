<template>
    <div
        :class="clsx(
        color === 'gray' && $style.layerPaneGray,
            color === 'primary' && $style.layerPanePrimary,
            color === 'danger' && $style.layerPaneDanger,
            color === 'info' && $style.layerPaneInfo,
            color === 'success' && $style.layerPaneSuccess,
            color === 'warning' && $style.layerPaneWarning
        )">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/LayerPane.module.scss';

    const {
        color = 'gray'
    } = defineProps<{
        readonly color?: FluxColor;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
