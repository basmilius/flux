---
outline: deep

props:
    -   name: aria-label
        description: The accessible label of the breadcrumb navigation.
        type: string
        optional: true
        default: Breadcrumb

    -   name: collapse
        description: "Collapses steps that do not fit into an overflow flyout menu. `start` keeps the trailing step(s) visible and folds from the front; `middle` keeps the first and last step visible and folds the middle. `none` lets the steps wrap onto a new line instead."
        type: "'none' | 'start' | 'middle'"
        optional: true
        default: none

    -   name: collapse-label
        description: The accessible label of the button that reveals the collapsed steps.
        type: string
        optional: true
        default: Show more

    -   name: separator
        description: The icon rendered between steps.
        type: FluxIconName
        optional: true
        default: angle-right

slots:
    -   name: default
        description: The trail of the breadcrumb, rendered as [Breadcrumb item](./item) and [Breadcrumb flyout](./flyout) components.

requiredIcons:
    - angle-right
    - ellipsis-h
---

# Breadcrumb

A breadcrumb shows users where they are within a hierarchy and lets them navigate back to any ancestor. Each step is a [Breadcrumb item](./item) or a [Breadcrumb flyout](./flyout); a non-linked item represents the current page and is rendered as plain, non-interactive text with `aria-current="page"`. Separators are inserted automatically between steps.

Steps are not limited to a label and icon. An item can hold an [avatar](../avatar), a [badge](../badge) or a [tag](../tag) through its `leading` and `trailing` slots, and a [Breadcrumb flyout](./flyout) turns a step into a dropdown so users can switch to a sibling without leaving the trail.

::: render
render=../../code/components/breadcrumb/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A breadcrumb trail with links.
example=../../code/components/breadcrumb/basic.vue
:::

::: example With icons || An icon per step makes the trail easier to scan.
example=../../code/components/breadcrumb/icons.vue
:::

::: example Custom separator || The separator defaults to a chevron. Set `separator` to any icon, such as `slash-forward`, to change it.
example=../../code/components/breadcrumb/separator.vue
:::

::: example Collapse the middle || Set `collapse="middle"` to keep the first and last step visible and fold the rest into an overflow menu when the trail runs out of space. Collapsed [Breadcrumb flyout](./flyout) steps become nested submenus.
example=../../code/components/breadcrumb/collapse-middle.vue
:::

::: example Collapse from the start || Set `collapse="start"` to keep only the trailing steps visible and fold everything before them into an overflow menu.
example=../../code/components/breadcrumb/collapse-start.vue
:::

::: example Rich trail || Combine icons, an [avatar](../avatar), a [badge](../badge) and a [flyout](./flyout) switcher in a single trail.
example=../../code/components/breadcrumb/rich.vue
:::

::: tip
Collapsing measures the available width, so the breadcrumb needs a bounded container to fold. Place it in a layout that constrains its width (a header bar, a card) rather than an intrinsically sized wrapper.
:::

## Used components

- [Breadcrumb item](./item)
- [Breadcrumb flyout](./flyout)
