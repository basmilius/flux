import { useState } from 'react';
import {
    FluxButtonStack,
    FluxSecondaryButton,
    FluxStatisticsAreaChart,
    FluxStatisticsBase,
    FluxStatisticsChartPane,
    FluxStatisticsGrid,
    FluxStatisticsKpi,
    FluxStatisticsMeter,
    FluxStatisticsMetric,
    FluxStatisticsSparkline,
    type FluxStatisticsChartAreaSeries
} from '@flux-ui/react';
import { useEffect } from 'react';
import { clsx } from 'clsx';
import $style from './LoadingState-0.module.scss';
export default function Example() {
    const DURATION = 1800;
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const loaded: FluxStatisticsChartAreaSeries[] = [
        {
            name: 'Revenue',
            data: [
                42100, 51800, 47600, 63200, 58400, 71900, 66500, 82300, 74800, 93100, 86200, 104600
            ]
        }
    ];
    const reloadSets: FluxStatisticsChartAreaSeries[][] = [
        [
            {
                name: 'Revenue',
                data: [
                    38400, 44200, 41900, 52600, 49800, 61300, 57200, 68400, 63100, 74900, 71200,
                    84300
                ]
            }
        ],
        [
            {
                name: 'Revenue',
                data: [
                    51200, 46800, 58300, 54100, 66700, 61400, 73900, 68200, 81600, 76300, 89400,
                    83100
                ]
            }
        ]
    ];
    const sparkline = [
        { name: 'New customers', data: [38, 42, 47, 44, 52, 58, 55, 64, 71, 68, 76, 82] }
    ];
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isReloading, setIsReloading] = useState(false);
    const [firstSeries, setFirstSeries] = useState<FluxStatisticsChartAreaSeries[]>([]);
    const [reloadIndex, setReloadIndex] = useState(0);
    const [runId, setRunId] = useState(0);
    const reloadSeries = (() => reloadSets[reloadIndex])();
    function run() {
        setRunId((current) => current + 1);
    }
    useEffect(() => {
        setIsFirstLoading(true);
        setIsReloading(true);
        setFirstSeries([]);
        const handle = window.setTimeout(() => {
            setFirstSeries(loaded);
            setReloadIndex((current) => (current + 1) % reloadSets.length);
            setIsFirstLoading(false);
            setIsReloading(false);
        }, DURATION);
        return () => window.clearTimeout(handle);
    }, [runId]);
    return (
        <>
            <div className="react-example-1ghmsdcivho87" style={{ width: '100%' }}>
                <h2>{'The loading state'}</h2>
                <p>
                    {'Loading lives on '}
                    <code>{'FluxStatisticsBase'}</code>
                    {
                        ', so it is one overlay shared by every tile in the package: a KPI, a chart pane and a bare base all get the same translucent copy of the pane surface with a spinner on it, faded in rather than switched on. What differs is what sits behind it, and that is the whole point of this section.'
                    }
                </p>
                <p>
                    {
                        'The left pane is a first load. There is no data behind the overlay yet, so the pane has to hold its own height from the aspect ratio instead of from its content, otherwise the page reflows the moment the numbers arrive. The right pane is a reload of a chart that already has data: the old chart stays where it is, the overlay sits on top of it, and when it lifts the chart animates from the old values to the new ones. Only the left one is allowed to show an empty frame. If the right one blanks, jumps or re-initializes its canvas, that is the bug this section exists to catch.'
                    }
                </p>
                <p>
                    {
                        'Press the button and watch both at once, in both themes. The overlay is translucent and blurs what is behind it, so it has to stay distinguishable from the pane it covers without turning the chart underneath into mud, which is a different balance in dark mode than in light.'
                    }
                </p>
                <div className={clsx($style.loading)} data-prose-full>
                    <FluxButtonStack>
                        <FluxSecondaryButton
                            iconLeading={'rotate'}
                            label={'Run both'}
                            onClick={run}
                        ></FluxSecondaryButton>
                    </FluxButtonStack>
                    <div className={clsx($style.loadingPair)}>
                        <FluxStatisticsChartPane
                            aspectRatio={2.2}
                            icon={'hourglass-clock'}
                            isLoading={isFirstLoading}
                            title={'First load, no data behind it'}
                        >
                            <FluxStatisticsAreaChart
                                labels={months}
                                series={firstSeries}
                                splitLines
                                tooltip
                                xAxisLabels
                                yAxisLabels
                            ></FluxStatisticsAreaChart>
                        </FluxStatisticsChartPane>
                        <FluxStatisticsChartPane
                            aspectRatio={2.2}
                            icon={'rotate'}
                            isLoading={isReloading}
                            title={'Reload, data stays behind it'}
                        >
                            <FluxStatisticsAreaChart
                                labels={months}
                                series={reloadSeries}
                                splitLines
                                tooltip
                                xAxisLabels
                                yAxisLabels
                            ></FluxStatisticsAreaChart>
                        </FluxStatisticsChartPane>
                    </div>
                    <FluxStatisticsGrid lg={4} md={2} xs={1}>
                        <FluxStatisticsKpi
                            change={{ color: 'success', icon: 'arrow-trend-up', value: '+8.2%' }}
                            footer={'vs. previous period'}
                            icon={'money-bill'}
                            isLoading={isReloading}
                            title={'Revenue'}
                            value={'€ 48,290'}
                        ></FluxStatisticsKpi>
                        <FluxStatisticsKpi
                            change={{ color: 'danger', icon: 'arrow-trend-down', value: '-1.4%' }}
                            footer={'vs. previous period'}
                            icon={'cart-shopping'}
                            isLoading={isReloading}
                            title={'Orders'}
                            value={'3,821'}
                        ></FluxStatisticsKpi>
                        <FluxStatisticsMetric
                            icon={'user-plus'}
                            isLoading={isReloading}
                            label={'This period'}
                            title={'New customers'}
                            value={642}
                        >
                            <FluxStatisticsSparkline
                                color={'primary'}
                                series={sparkline}
                                variant={'area'}
                            ></FluxStatisticsSparkline>
                        </FluxStatisticsMetric>
                        <FluxStatisticsBase
                            icon={'server'}
                            isLoading={isReloading}
                            title={'Capacity'}
                        >
                            <FluxStatisticsMeter
                                color={'warning'}
                                footer={'374 GB used'}
                                tip={'of 500 GB'}
                                title={'Storage'}
                                value={0.74}
                            ></FluxStatisticsMeter>
                        </FluxStatisticsBase>
                    </FluxStatisticsGrid>
                </div>
            </div>
        </>
    );
}
