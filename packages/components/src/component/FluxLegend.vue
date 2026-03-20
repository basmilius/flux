<template>
    <div :class="direction === 'horizontal' ? $style.legendHorizontal : $style.legendVertical">
        <span
            v-for="(item, index) of items"
            :key="index"
            :class="$style.legendItem"
            :style="{
                '--color': item.color
            }">
            {{ item.label }}
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection, FluxLegendObject } from '@flux-ui/types';
    import $style from '$flux/css/component/Legend.module.scss';

    const {
        direction = 'horizontal'
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly items: FluxLegendObject[];
    }>();
</script>
