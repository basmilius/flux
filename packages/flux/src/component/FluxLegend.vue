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
    import type { FluxLegendSpec } from '@/data';
    import styles from '@/css/component/Legend.module.scss';

    export type Props = {
        readonly axis?: 'horizontal' | 'vertical';
        readonly items: FluxLegendSpec[];
    };

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal'
    });
</script>
