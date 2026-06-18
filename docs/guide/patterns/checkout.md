# Checkout

An order summary brings line items, quantities and totals together with a clear call to action. This recipe shows a compact checkout step.

::: render
render=../../code/guide/patterns/checkout/preview.vue
:::

A `FluxStepperSteps` bar shows where the user is in the flow. Each line item is a `FluxItem` with a `FluxQuantitySelector`, and the totals are a `FluxDescriptionList` that recomputes as quantities change.

## Used components

`FluxStepperSteps`, `FluxItem`, `FluxItemStack`, `FluxItemMedia`, `FluxItemContent`, `FluxItemActions`, `FluxQuantitySelector`, `FluxBoxedIcon`, `FluxDescriptionList`, `FluxDescriptionItem`, `FluxPrimaryButton`, `FluxSecondaryButton`, `FluxSpacer`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`.
