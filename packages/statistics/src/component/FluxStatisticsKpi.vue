<template>
    <Base
        is-small
        :icon="icon"
        :title="title">
        <div :class="$style.statisticsKpiValue">
            {{ value }}
        </div>

        <div
            v-if="change || footer"
            :class="$style.statisticsKpiBottom">
            <Change
                v-if="change"
                :color="change.color"
                :icon="change.icon"
                :value="change.value"/>

            <span
                v-if="footer"
                :class="$style.statisticsKpiFooter">
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
    import $style from '$fluxStatistics/css/Kpi.module.scss';

    defineProps<{
        readonly footer?: string;
        readonly change?: FluxStatisticsChange;
        readonly icon?: FluxIconName;
        readonly title: string;
        readonly value: string | number;
    }>();
</script>
