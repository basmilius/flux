---
outline: deep

props:
    -   name: title
        description: The title of the card.
        type: string

    -   name: subtitle
        description: A secondary line shown under the title.
        type: string
        optional: true

    -   name: icon
        description: An icon shown in a tinted box on the right of the header.
        type: FluxIconName
        optional: true

    -   name: color
        description: The tint of the header icon.
        type: FluxColor
        optional: true
        default: primary

    -   name: labels
        description: Where the labels of the segments are rendered.
        type: [ top, bottom ]
        optional: true
        default: bottom

slots:
    -   name: start
        description: Shown before the title, for example a FluxAvatar or a logo.

    -   name: end
        description: Shown on the right of the header. Holds the boxed icon of the `icon` prop unless you fill it yourself.

    -   name: default
        description: The segments of the card.
---

# Tracker card

The tracker card summarizes a process in a single glance: what it is, where it stands, and how far along it is. The progress itself is declared as a row of [Segments](./segment), one per step.

::: render
render=../../../code/statistics/components/tracker-card/preview.vue
:::

::: tip
The card pairs well with a [Tracker](../tracker/) below it: the card gives the summary, the tracker gives the detail.
:::

<FrontmatterDocs/>

## Examples

::: example Live || The running segment fills up before it hands over to the next one, so the card reads as a process instead of a score.
example=../../../code/statistics/components/tracker-card/live.vue
:::

::: example Labels || Segments can carry a label. Set `labels` to `top` to render them above the bar instead of below it.
example=../../../code/statistics/components/tracker-card/labels.vue
:::

::: example Colors || The header icon and the segments are tinted separately, so a card can follow the color of the process it tracks.
example=../../../code/statistics/components/tracker-card/colors.vue
:::

## Used components

- [Boxed icon](../../../components/boxed-icon)
- [Pane](../../../components/pane)
- [Segment](./segment)
