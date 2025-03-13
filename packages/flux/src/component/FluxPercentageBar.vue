<template>
    <div :class="$style.percentageBar">
        <div :class="$style.percentageBarTrack">
            <FluxTooltip v-for="item of items">
                <template #content>
                    <div :class="$style.percentageBarTooltip">
                        <FluxIcon
                            v-if="item.icon"
                            :size="16"
                            :variant="item.icon"/>

                        <span>{{ formatPercentage(item.value) }} {{ item.label }}</span>
                    </div>
                </template>

                <div
                    :class="$style.percentageBarSegment"
                    :style="{
                        backgroundColor: item.color,
                        flexGrow: item.value
                    }"/>
            </FluxTooltip>
        </div>

        <FluxLegend
            v-if="isLegendVisible"
            :items="items"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { formatPercentage } from '@basmilius/utils';
    import type { FluxPercentageBarItemObject } from '$flux/types';
    import FluxIcon from './FluxIcon.vue';
    import FluxLegend from './FluxLegend.vue';
    import FluxTooltip from './FluxTooltip.vue';
    import $style from '$flux/css/component/PercentageBar.module.scss';

    defineProps<{
        readonly isLegendVisible?: boolean;
        readonly items: FluxPercentageBarItemObject[];
    }>();
</script>
