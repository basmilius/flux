<template>
    <h2>A dashboard</h2>
    <p>The arrangement almost every product ends up with: a period select at the top, a row of KPIs under it, one large chart, and the supporting blocks beside and below it. The period select is wired to the data, so switching it recomputes the buckets, the totals and the deltas. Watch the KPI values, the chart and the details table change together, and note that <strong>Today</strong> switches the chart to hourly buckets while <strong>This year</strong> switches it to months.</p>
    <p>What to look at here is the seam between the blocks rather than any single one of them. Every tile is a <code>FluxStatisticsBase</code>, so they share one pane surface, one header rhythm and one title size, and they have to line up across a grid where the tiles do not all hold the same amount of content. The KPI row is four tiles with a value and a delta, the chart is one tile with a canvas in it, and the two blocks at the bottom are a tracker and a table. If the padding or the title weight drifts between them, this is where it shows.</p>
    <div
        :class="$style.dashboard"
        data-prose-full>
        <FluxSegmentedControl v-model="preset">
            <FluxSegmentedControlItem
                v-for="option of PERIOD_PRESETS"
                :key="option.value"
                :label="option.label"
                :value="option.value"/>
        </FluxSegmentedControl>

        <FluxStatisticsGrid
            :lg="4"
            :md="2"
            :xs="1">
            <FluxStatisticsKpi
                :change="revenueChange"
                footer="vs. previous period"
                icon="money-bill"
                title="Revenue"
                :value="formatCurrency(revenue)"/>

            <FluxStatisticsKpi
                :change="ordersChange"
                footer="vs. previous period"
                icon="cart-shopping"
                title="Orders"
                :value="formatNumber(orders)"/>

            <FluxStatisticsKpi
                :change="customersChange"
                footer="vs. previous period"
                icon="user-plus"
                title="New customers"
                :value="formatNumber(customers)"/>

            <FluxStatisticsKpi
                :change="orderValueChange"
                footer="per order"
                icon="receipt"
                title="Average order value"
                :value="formatCurrency(orderValue)"/>
        </FluxStatisticsGrid>

        <div :class="$style.dashboardMain">
            <FluxStatisticsChartPane
                :aspect-ratio="2.6"
                icon="chart-area"
                title="Revenue">
                <template #info>
                    Both series are bucketed the same way, so the previous period lines up with the current one point for point.
                </template>

                <FluxStatisticsAreaChart
                    :labels="labels"
                    :series="revenueSeries"
                    split-lines
                    tooltip
                    :tooltip-value-formatter="formatTooltipValue"
                    x-axis-labels
                    y-axis-labels/>

                <template #legend>
                    <FluxStatisticsLegend/>
                </template>

                <template #toolbar>
                    <FluxToolbarGroup>
                        <FluxAction icon="arrow-down-to-line"/>
                        <FluxAction icon="rotate"/>
                    </FluxToolbarGroup>
                </template>
            </FluxStatisticsChartPane>

            <div :class="$style.dashboardSide">
                <FluxStatisticsComparison
                    :current="revenue"
                    current-label="This period"
                    footer="revenue"
                    :format="formatCurrency"
                    icon="coin"
                    :previous="previousRevenue"
                    previous-label="Previous"
                    title="Revenue compared"/>

                <FluxStatisticsTrackerCard
                    icon="truck"
                    subtitle="3 of 5 stages cleared"
                    title="Fulfillment">
                    <FluxStatisticsTrackerCardSegment
                        label="Paid"
                        state="done"/>
                    <FluxStatisticsTrackerCardSegment
                        label="Picked"
                        state="done"/>
                    <FluxStatisticsTrackerCardSegment
                        label="Packed"
                        state="done"/>
                    <FluxStatisticsTrackerCardSegment
                        label="Shipped"
                        state="active"
                        :value="62"/>
                    <FluxStatisticsTrackerCardSegment label="Delivered"/>
                </FluxStatisticsTrackerCard>
            </div>
        </div>

        <div :class="$style.dashboardBottom">
            <FluxStatisticsBase
                icon="clock-rotate-left"
                title="Payout timeline">
                <FluxStatisticsTracker>
                    <FluxStatisticsTrackerLabel
                        color="success"
                        label="Settled"/>

                    <FluxStatisticsTrackerEntry
                        color="success"
                        description="NL91 ABNA 0417 1643 00"
                        icon="circle-check"
                        title="Payout sent"
                        when="Mar 3, 09:12"/>

                    <FluxStatisticsTrackerLabel
                        color="primary"
                        label="In progress"/>

                    <FluxStatisticsTrackerEntry
                        color="primary"
                        icon="coin"
                        title="Next payout"
                        when="Mar 10, 09:00">
                        <template #end>
                            <FluxBadge
                                color="primary"
                                colored
                                label="Scheduled"/>
                        </template>

                        <FluxStatisticsTrackerSteps>
                            <FluxStatisticsTrackerStep
                                label="Orders collected"
                                state="done"/>
                            <FluxStatisticsTrackerStep
                                label="Fees deducted"
                                state="done"/>
                            <FluxStatisticsTrackerStep
                                label="Bank transfer queued"
                                state="active"/>
                            <FluxStatisticsTrackerStep label="Funds available"/>
                        </FluxStatisticsTrackerSteps>
                    </FluxStatisticsTrackerEntry>

                    <FluxStatisticsTrackerEntry
                        description="Estimated, based on the current period"
                        icon="calendar"
                        title="Following payout"/>
                </FluxStatisticsTracker>
            </FluxStatisticsBase>

            <FluxStatisticsBase
                icon="file-lines"
                title="Period detail">
                <template #info>
                    Every row is derived from the same buckets the chart draws, so the table and the chart can never disagree.
                </template>

                <FluxStatisticsDetailsTable title="Selected period">
                    <FluxStatisticsDetailsTableRow
                        label="Period"
                        :value="periodLabel"/>
                    <FluxStatisticsDetailsTableRow
                        label="Buckets"
                        :value="bucketLabel"/>
                    <FluxStatisticsDetailsTableRow
                        label="Best bucket"
                        :value="bestBucket"/>
                    <FluxStatisticsDetailsTableRow
                        label="Orders"
                        :value="formatNumber(orders)"/>
                    <FluxStatisticsDetailsTableRow
                        label="Refund rate"
                        value="1.8%"/>
                    <FluxStatisticsDetailsTableRow
                        label="Net payout"
                        :value="formatCurrency(Math.round(revenue * 0.978))"/>
                </FluxStatisticsDetailsTable>
            </FluxStatisticsBase>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBadge, FluxSegmentedControl, FluxSegmentedControlItem, FluxToolbarGroup } from '@flux-ui/components';
    import { FluxStatisticsAreaChart, FluxStatisticsBase, FluxStatisticsChartPane, FluxStatisticsComparison, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsGrid, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsTracker, FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment, FluxStatisticsTrackerEntry, FluxStatisticsTrackerLabel, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
    import type { FluxStatisticsChange, FluxStatisticsChartAreaSeries } from '@flux-ui/types';
    import { DateTime } from 'luxon';
    import { computed, ref } from 'vue';

    type Granularity = 'hour' | 'day' | 'month';

    type Preset = 'today' | 'last7Days' | 'last30Days' | 'thisMonth' | 'thisYear';

    type Bucket = {
        readonly label: string;
        readonly revenue: number;
        readonly orders: number;
        readonly customers: number;
    };

    const REVENUE_CYCLE = [3240, 4180, 3860, 5120, 4670, 6040, 5580, 4920, 6380, 5740, 7120, 6460, 5290, 6870, 6120, 7480, 6930, 5810, 7260, 6540, 8120, 7380, 6250, 7940];
    const ORDERS_CYCLE = [86, 112, 98, 134, 121, 158, 143, 126, 167, 149, 182, 164, 137, 176, 155, 191, 173, 148, 186, 168, 205, 189, 159, 198];
    const CUSTOMERS_CYCLE = [12, 18, 15, 24, 19, 28, 23, 17, 31, 22, 35, 27, 20, 33, 25, 38, 29, 21, 34, 26, 41, 32, 24, 37];

    // The previous period reads the same cycle from a different offset, damped a little, so growth
    // is the common case without any of the numbers being random.
    const PREVIOUS_OFFSET = 11;
    const PREVIOUS_FACTOR = 0.9;

    const GRANULARITY_SCALE: Record<Granularity, number> = {
        hour: 1 / 24,
        day: 1,
        month: 30
    };

    const PERIOD_PRESETS: readonly {readonly value: Preset; readonly label: string}[] = [
        {value: 'today', label: 'Today'},
        {value: 'last7Days', label: 'Last 7 days'},
        {value: 'last30Days', label: 'Last 30 days'},
        {value: 'thisMonth', label: 'This month'},
        {value: 'thisYear', label: 'This year'}
    ];

    const preset = ref<Preset>('last30Days');

    const period = computed(() => resolvePeriod(preset.value));

    const granularity = computed<Granularity>(() => {
        if (preset.value === 'today') {
            return 'hour';
        }

        return period.value.end.diff(period.value.start, 'days').days > 62 ? 'month' : 'day';
    });

    const buckets = computed(() => buildBuckets(0, 1));
    const previousBuckets = computed(() => buildBuckets(PREVIOUS_OFFSET, PREVIOUS_FACTOR));

    const labels = computed(() => buckets.value.map(bucket => bucket.label));

    const revenue = computed(() => total(buckets.value, 'revenue'));
    const orders = computed(() => total(buckets.value, 'orders'));
    const customers = computed(() => total(buckets.value, 'customers'));
    const orderValue = computed(() => orders.value === 0 ? 0 : Math.round(revenue.value / orders.value));

    const previousRevenue = computed(() => total(previousBuckets.value, 'revenue'));
    const previousOrders = computed(() => total(previousBuckets.value, 'orders'));
    const previousCustomers = computed(() => total(previousBuckets.value, 'customers'));
    const previousOrderValue = computed(() => previousOrders.value === 0 ? 0 : Math.round(previousRevenue.value / previousOrders.value));

    const revenueChange = computed(() => buildChange(revenue.value, previousRevenue.value));
    const ordersChange = computed(() => buildChange(orders.value, previousOrders.value));
    const customersChange = computed(() => buildChange(customers.value, previousCustomers.value));
    const orderValueChange = computed(() => buildChange(orderValue.value, previousOrderValue.value));

    const revenueSeries = computed<FluxStatisticsChartAreaSeries[]>(() => [
        {
            name: 'This period',
            data: buckets.value.map(bucket => bucket.revenue)
        },
        {
            name: 'Previous period',
            data: previousBuckets.value.map(bucket => bucket.revenue)
        }
    ]);

    const periodLabel = computed(() => PERIOD_PRESETS.find(option => option.value === preset.value)!.label);

    const bucketLabel = computed(() => `${buckets.value.length} ${granularity.value === 'hour' ? 'hours' : granularity.value === 'day' ? 'days' : 'months'}`);

    const bestBucket = computed(() => {
        const best = buckets.value.reduce((winner, bucket) => bucket.revenue > winner.revenue ? bucket : winner, buckets.value[0]);

        return `${best.label}, ${formatCurrency(best.revenue)}`;
    });

    function resolvePeriod(value: Preset): {readonly start: DateTime; readonly end: DateTime} {
        const now = DateTime.now();

        switch (value) {
            case 'today':
                return {start: now.startOf('day'), end: now.endOf('day')};

            case 'last7Days':
                return {start: now.minus({days: 6}).startOf('day'), end: now.endOf('day')};

            case 'last30Days':
                return {start: now.minus({days: 29}).startOf('day'), end: now.endOf('day')};

            case 'thisMonth':
                return {start: now.startOf('month'), end: now.endOf('month')};

            case 'thisYear':
                return {start: now.startOf('year'), end: now.endOf('year')};
        }
    }

    function buildBuckets(offset: number, factor: number): Bucket[] {
        const scale = GRANULARITY_SCALE[granularity.value] * factor;

        return buildStamps().map((stamp, index) => ({
            label: formatStamp(stamp),
            revenue: Math.round(pick(REVENUE_CYCLE, index, offset) * scale),
            orders: Math.max(1, Math.round(pick(ORDERS_CYCLE, index, offset) * scale)),
            customers: Math.max(1, Math.round(pick(CUSTOMERS_CYCLE, index, offset) * scale))
        }));
    }

    function buildStamps(): DateTime[] {
        const step = granularity.value === 'hour' ? {hours: 1} : granularity.value === 'day' ? {days: 1} : {months: 1};
        const stamps: DateTime[] = [];

        let cursor = period.value.start.startOf(granularity.value);

        while (cursor <= period.value.end) {
            stamps.push(cursor);
            cursor = cursor.plus(step);
        }

        return stamps;
    }

    function formatStamp(stamp: DateTime): string {
        const format = granularity.value === 'hour' ? 'HH:mm' : granularity.value === 'day' ? 'd LLL' : 'LLL';

        return stamp.setLocale('en').toFormat(format);
    }

    function pick(cycle: number[], index: number, offset: number): number {
        return cycle[(index + offset) % cycle.length];
    }

    function total(items: Bucket[], key: keyof Omit<Bucket, 'label'>): number {
        return items.reduce((sum, item) => sum + item[key], 0);
    }

    function buildChange(current: number, previous: number): FluxStatisticsChange {
        const delta = previous === 0 ? 0 : ((current - previous) / previous) * 100;
        const isUp = delta >= 0;

        return {
            color: isUp ? 'success' : 'danger',
            icon: isUp ? 'arrow-trend-up' : 'arrow-trend-down',
            value: `${isUp ? '+' : ''}${delta.toFixed(1)}%`
        };
    }

    function formatCurrency(value: number): string {
        return new Intl.NumberFormat('en', {
            currency: 'EUR',
            maximumFractionDigits: 0,
            style: 'currency'
        }).format(value);
    }

    function formatNumber(value: number): string {
        return new Intl.NumberFormat('en').format(value);
    }

    function formatTooltipValue(value: number | string): string {
        return formatCurrency(Number(value));
    }
</script>

<style
    lang="scss"
    module>
    .dashboard {
        display: flex;
        flex-flow: column;
        gap: 24px;
    }

    .dashboardMain,
    .dashboardBottom {
        display: grid;
        align-items: start;
        gap: 24px;
    }

    .dashboardMain {
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    }

    .dashboardBottom {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dashboardSide {
        display: flex;
        flex-flow: column;
        gap: 24px;
    }

    @container playground (width < 1008px) {
        .dashboardMain,
        .dashboardBottom {
            grid-template-columns: minmax(0, 1fr);
        }
    }
</style>
