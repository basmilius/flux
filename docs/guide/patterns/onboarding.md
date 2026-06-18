# Onboarding

First-run experiences guide users through their first steps: a guided tour that points at real UI, a welcome screen with a little visual flair, and a progress checklist. This recipe brings the tour, stepper and decorative components together.

::: render
render=../../code/guide/patterns/onboarding/preview.vue
:::

`FluxTour` drives a sequence of `FluxTourItem`s, each anchored to an element by a CSS selector. Click **Start tour** to walk through the highlighted controls.

## Examples

::: example Welcome screen || A welcome card using the decorative `FluxFlickeringGrid`, `FluxBorderBeam` and `FluxBorderShine`, with a `FluxPlaceholder` call to action.
example=../../code/guide/patterns/onboarding/welcome.vue
:::

::: example Setup checklist || A `FluxStepperSteps` progress bar with tooltip-labelled step buttons.
example=../../code/guide/patterns/onboarding/checklist.vue
:::

## Used components

`FluxTour`, `FluxTourItem`, `FluxStepperSteps`, `FluxBorderBeam`, `FluxBorderShine`, `FluxFlickeringGrid`, `FluxAspectRatio`, `FluxPlaceholder`, `FluxTooltip`, `FluxBoxedIcon`, `FluxChip`, `FluxBadge`, `FluxFormInput`, `FluxButtonStack`, `FluxPrimaryButton`, `FluxSecondaryButton`, `FluxFlex`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`.
