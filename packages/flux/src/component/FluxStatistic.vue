<template>
    <FluxPane
        :class="clsx(
            axis === 'horizontal' && styles.statisticHorizontal,
            axis === 'vertical' && styles.statisticVertical,
            color === 'gray' && styles.isGray,
            color === 'primary' && styles.isPrimary,
            color === 'danger' && styles.isDanger,
            color === 'info' && styles.isInfo,
            color === 'success' && styles.isSuccess,
            color === 'warning' && styles.isWarning
        )">
        <div :class="styles.statisticIcon">
            <FluxIcon
                :size="24"
                :variant="icon"/>
        </div>

        <div :class="styles.statisticData">
            <span>{{ label }}</span>
            <strong>{{ value }}</strong>
        </div>

        <div
            v-if="changeIcon || changeValue"
            :class="clsx(
                styles.statisticChange,
                changeColor === 'gray' && styles.isGray,
                changeColor === 'primary' && styles.isPrimary,
                changeColor === 'danger' && styles.isDanger,
                changeColor === 'info' && styles.isInfo,
                changeColor === 'success' && styles.isSuccess,
                changeColor === 'warning' && styles.isWarning
            )">
            <span v-if="changeValue">{{ changeValue }}</span>

            <FluxIcon
                v-if="changeIcon"
                :size="14"
                :variant="changeIcon"/>
        </div>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { IconNames } from '@/data';
    import FluxIcon from './FluxIcon.vue';
    import FluxPane from './FluxPane.vue';
    import styles from '@/css/component/Statistic.module.scss';

    export type Props = {
        readonly axis?: 'horizontal' | 'vertical';
        readonly changeColor?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly changeIcon?: IconNames;
        readonly changeValue?: string;
        readonly color?: 'gray' | 'primary' | 'danger' | 'info' | 'success' | 'warning';
        readonly icon: IconNames;
        readonly label: string;
        readonly value: string;
    };

    withDefaults(defineProps<Props>(), {
        axis: 'horizontal',
        changeColor: 'gray',
        color: 'gray'
    });
</script>
