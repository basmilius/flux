<template>
    <div :class="axis === 'horizontal' ? styles.legendHorizontal : styles.legendVertical">
        <template v-for="item of items">
            <span
                :class="styles.legendItem"
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
    import styles from '@/css/component/Legend.module.scss';

    const {
        axis = 'horizontal'
    } = defineProps<{
        readonly axis?: Axis;
        readonly items: FluxLegendObject[];
    }>();
</script>
