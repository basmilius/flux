<template>
    <div :class="styles.percentageBar">
        <div :class="styles.percentageBarTrack">
            <FluxTooltip v-for="item of items">
                <template #content>
                    <div :class="styles.percentageBarTooltip">
                        <FluxIcon
                            v-if="item.icon"
                            :size="16"
                            :variant="item.icon"/>

                        <span>{{ formatPercentage(item.value) }} {{ item.label }}</span>
                    </div>
                </template>

                <div
                    :class="styles.percentageBarSegment"
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
    import type { FluxPercentageBarItemSpec } from '@/data';
    import { formatPercentage } from '@/util';
    import styles from '@/css/component/PercentageBar.module.scss';
    import FluxIcon from './FluxIcon.vue';
    import FluxLegend from './FluxLegend.vue';
    import FluxTooltip from './FluxTooltip.vue';

    export type Props = {
        readonly isLegendVisible?: boolean;
        readonly items: FluxPercentageBarItemSpec[];
    };

    defineProps<Props>();
</script>
