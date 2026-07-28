# useLegendVariant

The injection key a [Legend](../components/legend/) provides so every [Legend item](../components/legend/item) inside it renders in the same variant. There is no composable function: the legend provides the ref and its items inject it.

`detailed` gives each entry its own row with the value beside it; `compact` puts the entries on one line.

## Usage

```ts
import { FluxStatisticsLegendVariantInjectionKey } from '@flux-ui/statistics';
import { inject } from 'vue';

const variant = inject(FluxStatisticsLegendVariantInjectionKey);
```

## Type declarations

```ts
import type { InjectionKey, Ref } from 'vue';

declare const FluxStatisticsLegendVariantInjectionKey: InjectionKey<Ref<FluxStatisticsLegendVariant>>;

type FluxStatisticsLegendVariant = 'detailed' | 'compact';
```

## Used by

- [Legend](../components/legend/)
- [Legend item](../components/legend/item)
