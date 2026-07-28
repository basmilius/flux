<template>
    <h2>The small components</h2>
    <p>Everything in the package that is not a chart, at a comparable size and in all six intents at once. These are the parts a dashboard repeats twenty times on one screen, so they have to agree with each other: the change chip, the meter fill, the sparkline stroke, the radial bar and the percentage bar all take the same intent and all have to land on the same color for it. The six always appear in the same order, so compare the same position across the blocks rather than reading one block at a time. If one component reaches for a different token than its neighbor, that is where it shows.</p>
    <p>The intent colors are solid tokens, not chart tokens, so they follow the rest of the interface instead of the series palette. That is deliberate: a meter labeled danger has to match a danger badge sitting next to it, not <code>--chart-2</code>. In dark mode the same six have to stay apart from each other and stay legible on the pane surface, which is a tighter constraint than it looks at these sizes.</p>
    <div
        :class="$style.parts"
        data-prose-full>
        <FluxStatisticsBase
            icon="arrow-trend-up"
            title="Change, every intent">
            <template #info>
                The change chip takes an intent and an icon; the value is whatever text you hand it.
            </template>

            <FluxFlex
                :gap="18"
                wrap="wrap">
                <FluxStatisticsChange
                    v-for="intent of intents"
                    :key="intent.color"
                    :color="intent.color"
                    :icon="intent.trendIcon"
                    :value="intent.trend"/>
            </FluxFlex>
        </FluxStatisticsBase>

        <FluxStatisticsGrid
            :lg="3"
            :md="2"
            :xs="1">
            <FluxStatisticsMetric
                v-for="intent of intents"
                :key="intent.color"
                :change="{color: intent.color, icon: intent.trendIcon, value: intent.trend}"
                :footer="intent.footer"
                :icon="intent.icon"
                :label="intent.label"
                :title="intent.title"
                :value="intent.value">
                <FluxFlex
                    direction="vertical"
                    :gap="12">
                    <FluxStatisticsMeter
                        :color="intent.color"
                        is-small
                        :tip="intent.tip"
                        :value="intent.meter"/>

                    <FluxStatisticsSparkline
                        :color="intent.color"
                        :series="[{name: intent.title, data: intent.spark}]"
                        variant="area"/>
                </FluxFlex>
            </FluxStatisticsMetric>
        </FluxStatisticsGrid>

        <FluxStatisticsGrid
            :lg="3"
            :md="2"
            :xs="1">
            <FluxStatisticsKpi
                v-for="intent of intents"
                :key="intent.color"
                :change="{color: intent.color, icon: intent.trendIcon, value: intent.trend}"
                :footer="intent.footer"
                :icon="intent.icon"
                :title="intent.title"
                :value="intent.value"/>
        </FluxStatisticsGrid>

        <div :class="$style.partsPair">
            <FluxStatisticsBase
                icon="gauge"
                title="Meter, bar variant">
                <FluxFlex
                    direction="vertical"
                    :gap="18">
                    <FluxStatisticsMeter
                        v-for="intent of intents"
                        :key="intent.color"
                        :color="intent.color"
                        :footer="intent.footer"
                        :icon="intent.icon"
                        :sub-title="intent.label"
                        :tip="intent.tip"
                        :title="intent.title"
                        :value="intent.meter"/>
                </FluxFlex>
            </FluxStatisticsBase>

            <FluxStatisticsBase
                icon="grid-2"
                title="Meter, blocks variant">
                <template #info>
                    The block count is measured from the track, so the same value draws a different number of blocks at a different width.
                </template>

                <FluxFlex
                    direction="vertical"
                    :gap="18">
                    <FluxStatisticsMeter
                        v-for="intent of intents"
                        :key="intent.color"
                        :color="intent.color"
                        :tip="intent.tip"
                        :title="intent.title"
                        :value="intent.meter"
                        variant="blocks"/>
                </FluxFlex>
            </FluxStatisticsBase>
        </div>

        <FluxStatisticsBase
            icon="gauge-high"
            title="Radial bar, every intent">
            <div :class="$style.dials">
                <div
                    v-for="intent of intents"
                    :key="intent.color"
                    :class="$style.dial">
                    <FluxStatisticsRadialBar
                        :series="[{color: intent.color, name: intent.title, value: Math.round(intent.meter * 100)}]"
                        tooltip/>
                </div>
            </div>
        </FluxStatisticsBase>

        <div :class="$style.partsPair">
            <FluxStatisticsBase
                icon="chart-bar"
                title="Percentage bar, intents">
                <FluxStatisticsLegendScope>
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxStatisticsPercentageBar :items="intentShare"/>
                        <FluxStatisticsLegend variant="compact"/>
                    </FluxFlex>
                </FluxStatisticsLegendScope>
            </FluxStatisticsBase>

            <FluxStatisticsBase
                icon="palette"
                title="Percentage bar, series palette">
                <FluxStatisticsLegendScope>
                    <FluxFlex
                        direction="vertical"
                        :gap="18">
                        <FluxStatisticsPercentageBar :items="paletteShare"/>
                        <FluxStatisticsLegend variant="compact"/>
                    </FluxFlex>
                </FluxStatisticsLegendScope>
            </FluxStatisticsBase>
        </div>

        <div :class="$style.partsPair">
            <FluxStatisticsBase
                icon="chart-line"
                title="Sparkline, three variants">
                <FluxFlex
                    direction="vertical"
                    :gap="18">
                    <FluxStatisticsSparkline
                        color="primary"
                        :series="[{name: 'Line', data: trend}]"/>

                    <FluxStatisticsSparkline
                        color="success"
                        :series="[{name: 'Area', data: trend}]"
                        variant="area"/>

                    <FluxStatisticsSparkline
                        color="warning"
                        :series="[{name: 'Bar', data: trend}]"
                        variant="bar"/>
                </FluxFlex>
            </FluxStatisticsBase>

            <FluxStatisticsBase
                icon="hashtag"
                is-small
                title="Base, the small header">
                <template #info>
                    Every tile in the package is this component. The small variant is what a KPI uses.
                </template>

                <FluxFlex
                    direction="vertical"
                    :gap="12">
                    <span>The title above sits at the small size, the one on the left at the default size.</span>
                    <FluxStatisticsChange
                        color="success"
                        icon="arrow-trend-up"
                        value="+12.4%"/>
                </FluxFlex>
            </FluxStatisticsBase>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsBase, FluxStatisticsChange, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsLegendScope, FluxStatisticsMeter, FluxStatisticsMetric, FluxStatisticsPercentageBar, FluxStatisticsRadialBar, FluxStatisticsSparkline } from '@flux-ui/statistics';
    import type { FluxColor, FluxIconName, FluxStatisticsPercentageBarItemObject } from '@flux-ui/types';

    type Intent = {
        readonly color: FluxColor;
        readonly icon: FluxIconName;
        readonly title: string;
        readonly label: string;
        readonly value: string;
        readonly tip: string;
        readonly footer: string;
        readonly meter: number;
        readonly spark: number[];
        readonly trend: string;
        readonly trendIcon?: FluxIconName;
    };

    const trend = [42, 48, 45, 53, 58, 61, 57, 64, 68, 72, 69, 76];

    const intents: Intent[] = [
        {
            color: 'gray',
            icon: 'box-archive',
            title: 'Archived',
            label: 'All time',
            value: '18,204',
            tip: 'of 25,000',
            footer: 'records kept',
            meter: 0.73,
            spark: [120, 128, 134, 141, 149, 154, 162, 168, 175, 181, 188, 194],
            trend: '0.0%'
        },
        {
            color: 'primary',
            icon: 'money-bill',
            title: 'Revenue',
            label: 'This month',
            value: '€ 48,290',
            tip: 'of € 60,000',
            footer: 'vs. previous month',
            meter: 0.8,
            spark: [3240, 4180, 3860, 5120, 4670, 6040, 5580, 4920, 6380, 5740, 7120, 6460],
            trend: '+12.4%',
            trendIcon: 'arrow-trend-up'
        },
        {
            color: 'danger',
            icon: 'triangle-exclamation',
            title: 'Error rate',
            label: 'Last 24 hours',
            value: '2.4%',
            tip: 'of 1% budget',
            footer: 'above the target',
            meter: 0.94,
            spark: [0.8, 0.9, 1.1, 1.4, 1.3, 1.8, 2.1, 1.9, 2.2, 2.6, 2.4, 2.4],
            trend: '+1.6%',
            trendIcon: 'arrow-trend-up'
        },
        {
            color: 'info',
            icon: 'users',
            title: 'Sessions',
            label: 'This week',
            value: '64,180',
            tip: 'of 80,000',
            footer: 'vs. last week',
            meter: 0.62,
            spark: [4200, 4800, 5100, 4600, 5400, 5900, 5600, 6200, 6600, 6300, 6900, 7200],
            trend: '+4.8%',
            trendIcon: 'arrow-trend-up'
        },
        {
            color: 'success',
            icon: 'circle-check',
            title: 'Uptime',
            label: 'Last 30 days',
            value: '99.98%',
            tip: 'of 99.9% target',
            footer: 'within the agreement',
            meter: 0.99,
            spark: [99.9, 99.94, 99.91, 99.97, 99.99, 99.96, 99.98, 99.99, 99.97, 99.99, 99.98, 99.98],
            trend: '+0.08%',
            trendIcon: 'arrow-trend-up'
        },
        {
            color: 'warning',
            icon: 'stopwatch',
            title: 'Queue depth',
            label: 'Right now',
            value: '1,284',
            tip: 'of 1,500',
            footer: 'jobs waiting',
            meter: 0.86,
            spark: [420, 380, 460, 540, 610, 580, 720, 840, 910, 1080, 1160, 1284],
            trend: '-6.2%',
            trendIcon: 'arrow-trend-down'
        }
    ];

    const intentShare: FluxStatisticsPercentageBarItemObject[] = [
        {color: 'primary', icon: 'money-bill', label: 'Subscriptions', value: 0.42, displayValue: '42%'},
        {color: 'info', icon: 'cart-shopping', label: 'One-off', value: 0.24, displayValue: '24%'},
        {color: 'success', icon: 'store', label: 'Marketplace', value: 0.16, displayValue: '16%'},
        {color: 'warning', icon: 'truck', label: 'Shipping', value: 0.1, displayValue: '10%'},
        {color: 'danger', icon: 'receipt', label: 'Refunds', value: 0.05, displayValue: '5%'},
        {color: 'gray', icon: 'circle', label: 'Other', value: 0.03, displayValue: '3%'}
    ];

    const paletteShare: FluxStatisticsPercentageBarItemObject[] = [
        {color: 'var(--chart-1)', label: 'Organic', value: 0.28, displayValue: '28%'},
        {color: 'var(--chart-2)', label: 'Direct', value: 0.21, displayValue: '21%'},
        {color: 'var(--chart-3)', label: 'Referral', value: 0.15, displayValue: '15%'},
        {color: 'var(--chart-4)', label: 'Social', value: 0.12, displayValue: '12%'},
        {color: 'var(--chart-5)', label: 'E-mail', value: 0.09, displayValue: '9%'},
        {color: 'var(--chart-6)', label: 'Paid', value: 0.07, displayValue: '7%'},
        {color: 'var(--chart-7)', label: 'Affiliate', value: 0.05, displayValue: '5%'},
        {color: 'var(--chart-8)', label: 'Other', value: 0.03, displayValue: '3%'}
    ];
</script>

<style
    lang="scss"
    module>
    .parts {
        display: flex;
        flex-flow: column;
        gap: 24px;
    }

    .partsPair {
        display: grid;
        align-items: start;
        gap: 24px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dials {
        display: grid;
        gap: 18px;
        grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .dial {
        position: relative;
        height: 120px;
    }

    @container playground (width < 1008px) {
        .partsPair {
            grid-template-columns: minmax(0, 1fr);
        }

        .dials {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @container playground (width < 690px) {
        .dials {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
