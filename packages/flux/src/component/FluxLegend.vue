<template>
    <div :class="axis === 'horizontal' ? $style.legendHorizontal : $style.legendVertical">
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
    import type { Axis, FluxLegendObject } from '@/types';
    import $style from '@/css/component/Legend.module.scss';

    const {
        axis = 'horizontal'
    } = defineProps<{
        readonly axis?: Axis;
        readonly items: FluxLegendObject[];
    }>();
</script>
