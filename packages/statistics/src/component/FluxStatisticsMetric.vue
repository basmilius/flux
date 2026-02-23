<template>
    <FluxStatisticsBase
        :icon="icon"
        :title="title">
        <div :class="$style.statisticsMetricLabel">
            {{ label }}
        </div>

        <div
            v-if="value"
            :class="$style.statisticsMetricValue">
            {{ value }}
        </div>

        <div
            v-if="slots.default"
            :class="$style.statisticsMetricContent">
            <slot/>
        </div>

        <div
            v-if="changeValue || footer"
            :class="$style.statisticsMetricBottom">
            <FluxStatisticsChange
                v-if="changeValue"
                :color="changeColor"
                :icon="changeIcon"
                :value="changeValue"/>

            <span
                v-if="footer"
                :class="$style.statisticsMetricFooter">
                {{ footer }}
            </span>
        </div>
    </FluxStatisticsBase>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import FluxStatisticsBase from './FluxStatisticsBase.vue';
    import FluxStatisticsChange from './FluxStatisticsChange.vue';
    import $style from '$fluxStatistics/css/Metric.module.scss';

    defineProps<{
        readonly footer?: string;
        readonly changeColor?: FluxColor;
        readonly changeIcon?: FluxIconName;
        readonly changeValue?: string | number;
        readonly icon?: FluxIconName;
        readonly label?: string;
        readonly title: string;
        readonly value?: string | number;
    }>();

    const slots = defineSlots<{
        default?(): any;
    }>();
</script>
