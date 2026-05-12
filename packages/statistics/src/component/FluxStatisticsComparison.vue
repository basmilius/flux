<template>
    <Base
        is-small
        :icon="icon"
        :title="title">
        <div :class="$style.statisticsComparison">
            <div :class="$style.statisticsComparisonItem">
                <div :class="$style.statisticsComparisonItemLabel">
                    {{ currentLabel ?? 'Current' }}
                </div>

                <div :class="$style.statisticsComparisonItemValue">
                    {{ formattedCurrent }}
                </div>
            </div>

            <div :class="$style.statisticsComparisonDivider"/>

            <div :class="$style.statisticsComparisonItem">
                <div :class="$style.statisticsComparisonItemLabel">
                    {{ previousLabel ?? 'Previous' }}
                </div>

                <div :class="$style.statisticsComparisonItemValueMuted">
                    {{ formattedPrevious }}
                </div>
            </div>
        </div>

        <div
            v-if="showDelta"
            :class="$style.statisticsComparisonBottom">
            <Change
                :color="deltaColor"
                :icon="deltaIcon"
                :value="formattedDelta"/>

            <span
                v-if="footer"
                :class="$style.statisticsComparisonFooter">
                {{ footer }}
            </span>
        </div>
    </Base>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { computed } from 'vue';
    import Base from './FluxStatisticsBase.vue';
    import Change from './FluxStatisticsChange.vue';
    import $style from '~flux/statistics/css/Comparison.module.scss';

    const {
        current,
        format,
        previous,
        showDelta = true
    } = defineProps<{
        readonly current: number;
        readonly currentLabel?: string;
        readonly footer?: string;
        readonly format?: (value: number) => string;
        readonly icon?: FluxIconName;
        readonly previous: number;
        readonly previousLabel?: string;
        readonly showDelta?: boolean;
        readonly title: string;
    }>();

    const formattedCurrent = computed(() => format ? format(current) : current);
    const formattedPrevious = computed(() => format ? format(previous) : previous);

    const deltaValue = computed(() => {
        if (previous === 0) {
            return 0;
        }

        return ((current - previous) / Math.abs(previous)) * 100;
    });

    const deltaColor = computed<FluxColor>(() => {
        if (deltaValue.value > 0) {
            return 'success';
        }

        if (deltaValue.value < 0) {
            return 'danger';
        }

        return 'gray';
    });

    const deltaIcon = computed<FluxIconName | undefined>(() => {
        if (deltaValue.value > 0) {
            return 'arrow-trend-up';
        }

        if (deltaValue.value < 0) {
            return 'arrow-trend-down';
        }

        return undefined;
    });

    const formattedDelta = computed(() => {
        const sign = deltaValue.value > 0 ? '+' : '';

        return `${sign}${deltaValue.value.toFixed(1)}%`;
    });
</script>
