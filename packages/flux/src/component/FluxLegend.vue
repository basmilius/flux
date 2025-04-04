<template>
    <div :class="direction === 'horizontal' ? $style.legendHorizontal : $style.legendVertical">
        <template v-for="item of items">
            <span
                :class="$style.legendItem"
                :style="{
                    '--color': item.color
                }">
                {{ item.label }}
            </span>
        </template>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxDirection, FluxLegendObject } from '$flux/types';
    import $style from '$flux/css/component/Legend.module.scss';

    const {
        direction = 'horizontal'
    } = defineProps<{
        readonly direction?: FluxDirection;
        readonly items: FluxLegendObject[];
    }>();
</script>
