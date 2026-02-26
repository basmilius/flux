<template>
    <div
        :class="isSmall ? $style.statisticsMeterSmall : $style.statisticsMeter"
        :style="{
            '--color': colorValue,
            '--percentage': `${value * 100}%`
        }">
        <div :class="$style.statisticsMeterHeader">
            <FluxIcon
                v-if="icon"
                :class="$style.statisticsMeterHeaderIcon"
                :name="icon"
                :size="16"/>

            <span
                v-if="title"
                :class="$style.statisticsMeterHeaderTitle">
                {{ title }}
            </span>

            <span
                v-if="subTitle"
                :class="$style.statisticsMeterHeaderSubTitle">
                {{ subTitle }}
            </span>

            <span :class="$style.statisticsMeterHeaderValue">
                {{ formatPercentage(value) }}
            </span>

            <span
                v-if="tip"
                :class="$style.statisticsMeterHeaderTip">
                {{ tip }}
            </span>
        </div>

        <div :class="$style.statisticsMeterBar">
            <div :class="$style.statisticsMeterBarValue"/>
        </div>

        <div
            v-if="footer"
            :class="$style.statisticsMeterFooter">
            {{ footer }}
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { formatPercentage } from '@basmilius/utils';
    import { FluxIcon } from '@flux-ui/components';
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed } from 'vue';
    import $style from '$fluxStatistics/css/Meter.module.scss';

    const {
        color
    } = defineProps<{
        readonly color?: FluxColor | `#${string}`;
        readonly icon?: FluxIconName;
        readonly isSmall?: boolean;
        readonly footer?: string;
        readonly subTitle?: string;
        readonly tip?: string;
        readonly title?: string;
        readonly value: number;
    }>();

    const colorValue = computed(() => {
        if (!color) {
            return;
        }

        if (['gray', 'primary', 'danger', 'info', 'success', 'warning'].includes(color)) {
            return `var(--${color}-600)`
        }

        return color;
    });
</script>
