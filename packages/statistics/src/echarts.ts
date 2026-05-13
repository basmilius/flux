import {
    BarChart,
    BoxplotChart,
    CandlestickChart,
    GaugeChart,
    HeatmapChart,
    LineChart,
    PieChart,
    RadarChart,
    ScatterChart,
    TreemapChart
} from 'echarts/charts';
import {
    AxisPointerComponent,
    GridComponent,
    LegendComponent,
    RadarComponent,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent
} from 'echarts/components';
import { use } from 'echarts/core';
import { LabelLayout, LegacyGridContainLabel } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

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
    AxisPointerComponent,
    GridComponent,
    LegendComponent,
    RadarComponent,
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    LabelLayout,
    LegacyGridContainLabel,
    CanvasRenderer
]);
