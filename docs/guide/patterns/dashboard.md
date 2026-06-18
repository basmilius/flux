# Dashboard

A dashboard is the landing screen of most applications: a scannable overview that surfaces the numbers that matter, the people involved, and what changed recently. This recipe composes Flux's pane, data and visual components into one responsive overview grid.

::: render
render=../../code/guide/patterns/dashboard/preview.vue
:::

A `FluxContainer` wraps a 12-column `FluxGrid`. The top row stacks KPI cards — each pairs a `FluxBoxedIcon` with a value and a delta `FluxBadge` wrapped in a `FluxTooltip`. Below it, a goal card combines a `FluxProgressBar` with a `FluxTicks` scale, a team card layers a `FluxPersona` over an `FluxAvatarGroup`, a `FluxDescriptionList` summarizes the workspace, and a `FluxTimeline` lists recent activity. Every card uses the `FluxPaneHeader` / `FluxPaneBody` / `FluxPaneFooter` family so the rhythm stays consistent.

## Examples

::: example Activity & insights || A details card that switches between a `FluxTimeline` and an insights pane with `FluxTabs`. The decorative surfaces combine a `FluxAnimatedColors` header, a `FluxGridPattern` inset, a `FluxPaneIllustration`, and a `FluxDotPattern` backdrop.
example=../../code/guide/patterns/dashboard/activity.vue
:::

::: example Loading state || The same overview grid rendered as a placeholder while data loads — `FluxSkeleton` mirrors the final layout and a `FluxSpinner` fills the team card.
example=../../code/guide/patterns/dashboard/loading.vue
:::

## Used components

`FluxContainer`, `FluxGrid`, `FluxGridColumn`, `FluxFlex`, `FluxFlexItem`, `FluxSpacer`, `FluxPane`, `FluxPaneGroup`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`, `FluxPaneMedia`, `FluxPaneIllustration`, `FluxBoxedIcon`, `FluxIcon`, `FluxBadge`, `FluxTooltip`, `FluxLink`, `FluxProgressBar`, `FluxTicks`, `FluxInfo`, `FluxInfoStack`, `FluxAvatar`, `FluxAvatarGroup`, `FluxPersona`, `FluxDescriptionList`, `FluxDescriptionItem`, `FluxTimeline`, `FluxTimelineItem`, `FluxTabs`, `FluxTab`, `FluxAspectRatio`, `FluxAnimatedColors`, `FluxGridPattern`, `FluxDotPattern`, `FluxSkeleton`, `FluxSpinner`.
