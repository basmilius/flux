<template>
    <Base
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
            v-if="change || footer"
            :class="$style.statisticsMetricBottom">
            <Change
                v-if="change"
                :color="change.color"
                :icon="change.icon"
                :value="change.value"/>

            <span
                v-if="footer"
                :class="$style.statisticsMetricFooter">
                {{ footer }}
            </span>
        </div>
    </Base>
</template>

<script
    lang="ts"
    setup>
    import type { FluxIconName, FluxStatisticsChange } from '@flux-ui/types';
    import Base from './FluxStatisticsBase.vue';
    import Change from './FluxStatisticsChange.vue';
    import $style from '$fluxStatistics/css/Metric.module.scss';

    defineProps<{
        readonly footer?: string;
        readonly change?: FluxStatisticsChange;
        readonly icon?: FluxIconName;
        readonly label?: string;
        readonly title: string;
        readonly value?: string | number;
    }>();

    const slots = defineSlots<{
        default?(): any;
    }>();
</script>
