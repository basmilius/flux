# Application shell

The shell is the frame every screen lives in: a persistent sidebar for navigation, a sticky header with breadcrumbs and view controls, and a scrollable content area. This recipe wires the navigation, layout and contextual-action components together into one responsive layout.

::: render
render=../../code/guide/patterns/app-shell/preview.vue
:::

A `FluxSplitView` separates the sidebar from the main content. The sidebar stacks the full `FluxMenu` family — a title, grouped items, a sub-header, and a collapsible section — inside a `FluxScroller`. The main pane keeps its breadcrumb, status badge, view switch and tab bar pinned with `FluxSticky`, while the body scrolls independently.

## Examples

::: example Responsive actions || A page header whose actions collapse as space runs out: a `FluxOverflowBar` of filters, a priority-driven `FluxAdaptiveGroup`, and a floating `FluxToolbar`. Resize the pane to see it adapt.
example=../../code/guide/patterns/app-shell/responsive-actions.vue
:::

::: example KPI summary || A responsive `FluxGrid` of summary cards. The trailing tile is a `FluxPressable` — note it contains no nested link, keeping a single clickable target per card.
example=../../code/guide/patterns/app-shell/kpi-grid.vue
:::

::: example Menu options & flyouts || A `FluxMenuOptions` selector combined with a nested `FluxMenuFlyout` submenu inside a single `FluxMenu`.
example=../../code/guide/patterns/app-shell/command-menu.vue
:::

## Used components

`FluxContainer`, `FluxSplitView`, `FluxSplitViewPane`, `FluxScroller`, `FluxSticky`, `FluxMenu`, `FluxMenuTitle`, `FluxMenuGroup`, `FluxMenuSubHeader`, `FluxMenuItem`, `FluxMenuCollapsible`, `FluxMenuFlyout`, `FluxMenuOptions`, `FluxBreadcrumb`, `FluxBreadcrumbItem`, `FluxTabBar`, `FluxTabBarItem`, `FluxSegmentedControl`, `FluxSegmentedControlItem`, `FluxOverflowBar`, `FluxAdaptiveGroup`, `FluxAdaptiveSlot`, `FluxToolbar`, `FluxToolbarGroup`, `FluxAction`, `FluxButtonGroup`, `FluxGrid`, `FluxGridColumn`, `FluxFlex`, `FluxFlexItem`, `FluxSpacer`, `FluxSpacing`, `FluxSeparator`, `FluxBadge`, `FluxIcon`, `FluxLink`, `FluxPressable`, `FluxPane`, `FluxPaneBody`.
