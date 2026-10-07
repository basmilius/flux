import { BarChart, BoxplotChart, CandlestickChart, GaugeChart, HeatmapChart, LineChart, PieChart, RadarChart, ScatterChart, TreemapChart } from 'echarts/charts';
import { AxisPointerComponent, GridComponent, LegendComponent, RadarComponent, TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { use } from 'echarts/core';
import { LabelLayout, LegacyGridContainLabel } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

export function registerBaseCharts(): void {
    use([
        AxisPointerComponent,
        GridComponent,
        LegendComponent,
        TitleComponent,
        TooltipComponent,
        LabelLayout,
        LegacyGridContainLabel,
        CanvasRenderer
    ]);
}

export function registerAllCharts(): void {
    registerBaseCharts();

    use([
        BarChart,
        BoxplotChart,
        CandlestickChart,
        GaugeChart,
        HeatmapChart,
        LineChart,
        PieChart,
        RadarChart,
        ScatterChart,
        TreemapChart,
        RadarComponent,
        VisualMapComponent
    ]);
}
