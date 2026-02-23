<template>
    <div
        :class="$style.statisticsMeter"
        :style="{
            '--color': color,
            '--percentage': `${value * 100}%`
        }">
        <div :class="$style.statisticsMeterHeader">
            <FluxIcon
                v-if="icon"
                :class="$style.statisticsMeterHeaderIcon"
                :name="icon"
                :size="16"/>

            <span :class="$style.statisticsMeterHeaderTitle">
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
    import type { FluxIconName } from '@flux-ui/types';
    import $style from '$fluxStatistics/css/Meter.module.scss';

    defineProps<{
        readonly color?: string;
        readonly icon?: FluxIconName;
        readonly footer?: string;
        readonly subTitle?: string;
        readonly tip?: string;
        readonly title: string;
        readonly value: number;
    }>();
</script>
