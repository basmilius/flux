---
outline: deep

emits:
    -   name: click
        description: Triggered when the tab is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the mouse enters the tab.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the mouse leaves the tab.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of the tab.
        type: FluxPressableType
        optional: true

    -   name: disabled
        description: If the tab is disabled.
        type: boolean
        optional: true

    -   name: icon
        description: The icon of the tab.
        type: FluxIconName
        optional: true

    -   name: is-active
        description: If the tab is active.
        type: boolean
        optional: true

    -   name: label
        description: The label of the tab.
        type: string
        optional: true

    -   name: tabindex
        description: The tabindex of the tab, works exactly the same as HTML. When set it overrides the automatic roving tab stop; otherwise the tab is tabbable when it is the active tab, or the first enabled tab when none is selected.
        type: [ string, number ]
        optional: true

    -   name: href
        description: This prop is enabled if the tab type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the tab type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the tab type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the button's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true

slots:
    -   name: start
        description: Content rendered before the icon and the label, such as an avatar or a status indicator.

    -   name: end
        description: Content rendered after the label, such as a badge with an unread count.
---

# Tab bar item

The tab bar item represents an individual tab within the tab bar. Each item corresponds to a specific content view or section. When selected, it updates the displayed content accordingly, helping users understand where they are and switch between sections effortlessly.

::: render
render=../../code/components/tab-bar/item/preview.vue
:::

::: warning
This component is best used within a [Tab bar](../tab-bar).
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic tab bar item.
example=../../code/components/tab-bar/item/basic.vue
:::

::: example Pills || A tab bar item rendered as a pill.
example=../../code/components/tab-bar/item/pills.vue
:::

::: example Active tab || Mark the selected tab with `is-active`.
example=../../code/components/tab-bar/item/active.vue
:::

::: example Disabled tab || A tab bar with a disabled item that cannot be selected.
example=../../code/components/tab-bar/item/disabled.vue
:::

::: example Label only || Tab bar items can render just a `label` without an icon.
example=../../code/components/tab-bar/item/label-only.vue
:::

::: example Count badge || Show an unread or item count after the label using the `end` slot.
example=../../code/components/tab-bar/item/count.vue
:::

::: example Avatar and status || Render an avatar with a status indicator before the label using the `start` slot.
example=../../code/components/tab-bar/item/avatar.vue
:::

::: example Validation state || Flag a tab that contains errors. The slot may be filled conditionally.
example=../../code/components/tab-bar/item/validation.vue
:::

::: example Start and end slots || Both slots combined in a single tab.
example=../../code/components/tab-bar/item/slots.vue
:::

## Used components

- [Icon](../icon)
