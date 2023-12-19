<template>
    <div class="flux-percentage-bar">
        <div class="flux-percentage-bar-track">
            <FluxTooltip v-for="(item, index) of items">
                <template #content>
                    <div class="flux-percentage-bar-tooltip">
                        <FluxIcon
                            v-if="item.icon"
                            :size="16"
                            :variant="item.icon"/>

                        <span>{{ formatPercentage(item.value) }} {{ item.label }}</span>
                    </div>
                </template>

                <div
                    class="flux-percentage-bar-segment"
                    :style="{
                        backgroundColor: item.color ?? DEFAULT_COLOR_SCALE[index % DEFAULT_COLOR_SCALE.length],
                        flexGrow: item.value
                    }"/>
            </FluxTooltip>
        </div>

        <div
            v-if="isLegendVisible"
            class="flux-percentage-bar-legend">
            <div
                v-for="(item, index) of items"
                class="flux-percentage-bar-legend-item"
                :style="{'--color': item.color ?? DEFAULT_COLOR_SCALE[index % DEFAULT_COLOR_SCALE.length]}">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { FluxPercentageBarItemSpec } from '@/data';
    import { formatPercentage } from '@/util';
    import FluxIcon from './FluxIcon.vue';
    import FluxTooltip from './FluxTooltip.vue';

    export interface Props {
        readonly isLegendVisible?: boolean;
        readonly items: FluxPercentageBarItemSpec[];
    }

    const DEFAULT_COLOR_SCALE = [
        'rgb(var(--primary-5))',
        'rgb(var(--primary-7))',
        'rgb(var(--primary-9))',
        'rgb(var(--primary-11))'
    ] as const;

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-percentage-bar {
        display: flex;
        flex-flow: column;
        gap: 12px;

        &-legend {
            display: flex;
            flex-flow: row wrap;
            gap: 21px;

            &-item {
                display: flex;
                flex-flow: row nowrap;
                gap: 6px;
                font-size: 14px;
                line-height: 1;

                &::before {
                    display: block;
                    margin-top: 1px;
                    height: 12px;
                    width: 12px;
                    content: '';
                    flex: 0 0 12px;
                    background: var(--color);
                    border-radius: 99px;
                }
            }
        }

        &-segment {
            height: 12px;
            border-radius: calc(var(--radius) / 3);
            transition: 180ms var(--swift-out);
            transition-property: height, margin;

            &:hover {
                height: 16px;
                margin-top: -2px;
                margin-bottom: -2px;
            }
        }

        &-track {
            display: flex;
            flex-flow: row nowrap;
            gap: 3px;
        }

        &-tooltip {
            display: flex;
            align-items: center;
            flex-flow: row nowrap;
            gap: 9px;
        }
    }
</style>
