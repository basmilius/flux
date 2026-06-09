<template>
    <div
        :class="clsx(
            variant === 'compact' ? $style.statisticsLegendItemCompact : $style.statisticsLegendItem,
            variant !== 'compact' && isHovered && $style.isHovered
        )"
        :style="{
            '--color': colorValue
        }">
        <FluxIcon
            v-if="icon"
            :class="$style.statisticsLegendItemIcon"
            :name="icon"
            :size="16"/>

        <div
            v-else
            :class="$style.statisticsLegendItemColor"/>

        <span
            v-if="label"
            :class="$style.statisticsLegendItemLabel">
            {{ label }}
        </span>

        <span
            v-if="value"
            :class="$style.statisticsLegendItemValue">
            {{ value }}
        </span>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { clsx } from 'clsx';
    import { computed, inject } from 'vue';
    import { FluxStatisticsLegendVariantInjectionKey } from '~flux/statistics/composable';
    import $style from '~flux/statistics/css/Legend.module.scss';

    const {
        color
    } = defineProps<{
        readonly color?: FluxColor | `#${string}`;
        readonly icon?: FluxIconName;
        readonly isHovered?: boolean;
        readonly label: string;
        readonly value?: string | number;
    }>();

    const variantRef = inject(FluxStatisticsLegendVariantInjectionKey, null);
    const variant = computed(() => variantRef?.value ?? 'detailed');

    const colorValue = computed(() => {
        if (!color) {
            return;
        }

        if (['gray', 'primary', 'danger', 'info', 'success', 'warning'].includes(color)) {
            return `var(--${color}-600)`;
        }

        return color;
    });
</script>
