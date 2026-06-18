# Empty, loading & error states

Every data-driven screen has three states beyond the happy path: nothing yet, loading, and something went wrong. Designing them deliberately keeps the UI calm under all conditions.

::: render
render=../../code/guide/patterns/states/preview.vue
:::

`FluxPlaceholder` carries the empty state with a clear call to action, `FluxSkeleton` and `FluxSpinner` stand in while data loads, and a `FluxNotice` with a retry action surfaces errors without losing context.

## Used components

`FluxPlaceholder`, `FluxSkeleton`, `FluxSpinner`, `FluxNotice`, `FluxInfo`, `FluxInfoStack`, `FluxGrid`, `FluxGridColumn`, `FluxFlex`, `FluxFlexItem`, `FluxSpacing`, `FluxPrimaryButton`, `FluxSecondaryButton`, `FluxPane`, `FluxPaneBody`.
