import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { chart, init } = vi.hoisted(() => ({
    chart: { dispatchAction: vi.fn(), dispose: vi.fn(), resize: vi.fn(), setOption: vi.fn() },
    init: vi.fn()
}));
init.mockReturnValue(chart);
vi.mock('echarts', () => ({ init }));

import { FluxStatisticsBarChart, FluxStatisticsComparison, FluxStatisticsDetailsTable, FluxStatisticsDetailsTableRow, FluxStatisticsKpi, FluxStatisticsLegend, FluxStatisticsLegendScope, FluxStatisticsMeter, FluxStatisticsPercentageBar, FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from './Statistics';
import { buildBarChartOptions, buildDonutChartOptions, buildHeatmapChartOptions, buildSparklineOptions, deepResolveCssVars, toBubbleSeries } from './StatisticsUtilities';

describe('statistics option builders', () => {
    it('builds cartesian, circular, heatmap, and sparkline series', () => {
        const bar = buildBarChartOptions({ labels: ['Jan'], series: [{ name: 'Sales', data: [4] }] }),
            donut = buildDonutChartOptions({ slices: [{ label: 'Done', value: 70 }] }),
            heatmap = buildHeatmapChartOptions({ xLabels: ['Mon'], yLabels: ['AM'], series: [{ data: [{ x: 'Mon', y: 'AM', value: 2 }] }] }),
            sparkline = buildSparklineOptions('area', '#123456', [{ data: [1, 2, 3] }]);
        expect((bar.series as object[])[0]).toMatchObject({ type: 'bar', data: [4] });
        expect((donut.series as object[])[0]).toMatchObject({ type: 'pie', radius: ['55%', '80%'] });
        expect((heatmap.series as Array<{ data: number[][] }>)[0].data[0]).toEqual([0, 0, 2]);
        expect((sparkline.series as Array<{ areaStyle?: object }>)[0].areaStyle).toBeDefined();
    });

    it('scales bubble sizes and resolves nested CSS variables', () => {
        const bubble = toBubbleSeries({ data: [{ x: 1, y: 2, size: 10 }] }, '#000') as { symbolSize(value: number[]): number };
        expect(bubble.symbolSize([1, 2, 10])).toBe(44);
        document.documentElement.style.setProperty('--chart-test', '#abcdef');
        expect(deepResolveCssVars({ color: 'var(--chart-test)' })).toEqual({ color: '#abcdef' });
    });
});

describe('statistics components', () => {
    it('does not dim percentage segments without a legend scope', () => {
        render(<FluxStatisticsPercentageBar items={[{ label: 'Used', value: 1 }]} />);
        expect(screen.getByRole('img').firstElementChild?.className).not.toMatch(/isHoverActive|is-hover-active/);
    });

    it('mounts ECharts and sends generated options', async () => {
        const onClick = vi.fn();
        render(<FluxStatisticsBarChart aria-label="Sales chart" className="custom-chart" data-chart="sales" onClick={onClick} style={{height: 240}} labels={['Jan']} series={[{ name: 'Sales', data: [4] }]} />);
        await waitFor(() => expect(init).toHaveBeenCalled());
        expect(chart.setOption).toHaveBeenCalledWith(expect.objectContaining({ series: expect.any(Array) }));
        const element = screen.getByLabelText('Sales chart');
        expect(element).toHaveClass('custom-chart');
        expect(element).toHaveAttribute('data-chart', 'sales');
        expect(element).toHaveStyle({height: '240px'});
        fireEvent.click(element);
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('renders KPI, comparison, meter, and accessible detail rows', () => {
        render(
            <>
                <FluxStatisticsKpi title="Revenue" value="$120" change={{ color: 'success', value: '+20%' }} />
                <FluxStatisticsComparison title="Orders" current={12} previous={10} />
                <FluxStatisticsMeter title="Storage" value={0.5} />
                <FluxStatisticsDetailsTable title="Details">
                    <FluxStatisticsDetailsTableRow label="Users" value="42" />
                </FluxStatisticsDetailsTable>
            </>
        );
        expect(screen.getByText('$120')).toBeInTheDocument();
        expect(screen.getByText('+20.0%')).toBeInTheDocument();
        expect(screen.getByText('50%')).toBeInTheDocument();
        expect(screen.getByRole('table')).toHaveAccessibleName('Details');
    });

    it('synchronizes percentage segments with an automatic legend', async () => {
        render(
            <FluxStatisticsLegendScope>
                <FluxStatisticsPercentageBar
                    items={[
                        { label: 'Used', value: 0.7, displayValue: '70%' },
                        { label: 'Free', value: 0.3 }
                    ]}
                />
                <FluxStatisticsLegend />
            </FluxStatisticsLegendScope>
        );
        await waitFor(() => expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Used'));
        fireEvent.mouseEnter(screen.getByTitle('70% Used'));
        expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('Used');
    });

    it('renders tracker entries and grouped steps', () => {
        render(
            <FluxStatisticsTracker>
                <FluxStatisticsTrackerEntry title="Created" when="Now" />
                <FluxStatisticsTrackerSteps>
                    <FluxStatisticsTrackerStep label="Review" state="active" />
                </FluxStatisticsTrackerSteps>
            </FluxStatisticsTracker>
        );
        expect(screen.getByText('Created')).toBeInTheDocument();
        expect(screen.getByText('Review')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    it('observes tracker geometry for layout-driven path updates', async () => {
        const observe = vi.fn(),
            disconnect = vi.fn();
        vi.stubGlobal('ResizeObserver', class {
            observe = observe;
            disconnect = disconnect;
        });
        render(
            <FluxStatisticsTracker>
                <FluxStatisticsTrackerEntry title="First" />
                <FluxStatisticsTrackerEntry title="Second" />
            </FluxStatisticsTracker>
        );
        await waitFor(() => expect(observe.mock.calls.length).toBeGreaterThanOrEqual(3));
        vi.unstubAllGlobals();
    });
});
