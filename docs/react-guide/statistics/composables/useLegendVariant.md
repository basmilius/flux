# Legend variant context

There is no `useLegendVariant` function. Set `variant` on `FluxStatisticsLegend`; its items read that value through React context. `detailed` includes values beside the labels, while `compact` uses a compact label layout.

```tsx
import {FluxStatisticsLegend} from '@flux-ui/react';

export function Legend() {
    return <FluxStatisticsLegend variant="compact" items={[
        {label: 'Complete', value: 42, color: 'success'},
        {label: 'Open', value: 8, color: 'warning'}
    ]}/>;
}
```

A custom item can read the current variant with `useContext(FluxStatisticsLegendVariantInjectionKey)`.
