<template>
    <div
        :class="$style.statisticsLegendItem"
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
    import { computed } from 'vue';
    import $style from '$fluxStatistics/css/Legend.module.scss';

    const {
        color
    } = defineProps<{
        readonly color?: FluxColor | `#${string}`;
        readonly icon?: FluxIconName;
        readonly label: string;
        readonly value?: string | number;
    }>();

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
