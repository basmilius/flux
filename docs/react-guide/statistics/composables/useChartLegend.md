# Chart legend context

There is no `useChartLegend` function. Put charts and their automatic legend inside `FluxStatisticsLegendScope`; the React components share the entries and hovered index through context.

```tsx
import {FluxStatisticsBarChart, FluxStatisticsLegend, FluxStatisticsLegendScope} from '@flux-ui/react';

export function SalesChart() {
    return <FluxStatisticsLegendScope>
        <FluxStatisticsBarChart labels={['Jan', 'Feb']} series={[{name: 'Sales', data: [12, 18]}]}/>
        <FluxStatisticsLegend/>
    </FluxStatisticsLegendScope>;
}
```

For a custom legend, call `useContext(FluxStatisticsChartLegendInjectionKey)` inside the scope. The value contains `items`, `hoveredIndex`, `setItems` and `setHoveredIndex`. Outside a scope the context is `null`.
