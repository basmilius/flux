<template>
    <FluxStatisticsBase
        is-small
        :icon="icon"
        :title="title">
        <div :class="$style.statisticsKpiValue">
            {{ value }}
        </div>

        <div
            v-if="changeValue || footer"
            :class="$style.statisticsKpiBottom">
            <FluxStatisticsChange
                v-if="changeValue"
                :color="changeColor"
                :icon="changeIcon"
                :value="changeValue"/>

            <span
                v-if="footer"
                :class="$style.statisticsKpiFooter">
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
    import $style from '$fluxStatistics/css/Kpi.module.scss';

    defineProps<{
        readonly footer?: string;
        readonly changeColor?: FluxColor;
        readonly changeIcon?: FluxIconName;
        readonly changeValue?: string | number;
        readonly icon?: FluxIconName;
        readonly title: string;
        readonly value: string | number;
    }>();
</script>
