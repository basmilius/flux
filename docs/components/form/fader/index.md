---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.
        type: [ number ]

props:
    -   name: model-value
        description: The value of the fader.
        type: [ number ]

    -   name: disabled
        description: If the fader is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the fader is invalid. Sets aria-invalid.
        type: [ string, null ]
        optional: true

    -   name: is-loading
        description: Marks the fader as loading.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the fader is readonly. Blocks interaction.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute of the underlying form control.
        type: string
        optional: true

    -   name: label
        description: The label shown on the left inside the fader.
        type: string
        optional: true

    -   name: aria-label
        description: An accessible label for the fader, used when no label is set. Announced by assistive technology.
        type: string
        optional: true

    -   name: color
        description: The color of the filled value. The track always stays neutral.
        type: FluxColor
        optional: true
        default: primary

    -   name: icon-leading
        description: An icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: icon-trailing
        description: An icon shown after the value.
        type: FluxIconName
        optional: true

    -   name: is-ticks-visible
        description: Forces the detent marks to show. They already appear automatically on stepped faders.
        type: boolean
        optional: true

    -   name: is-value-hidden
        description: Hides the value shown on the right inside the fader.
        type: boolean
        optional: true

    -   name: min
        description: The minimum value of the fader.
        type: number
        optional: true
        default: 0

    -   name: max
        description: The maximum value of the fader.
        type: number
        optional: true
        default: 100

    -   name: step
        description: The step size of the fader.
        type: number
        optional: true
        default: 1

    -   name: formatter
        description: The formatter for the displayed value.
        type: [ "(value: number, decimals?: number): string" ]
        optional: true
        default: "formatNumber"
---

# Fader

The fader is a compact, inline slider that shows its `label` on the left and the current value on the right, right inside the track. The whole row acts as the track: a fill grows from the left up to the value, with a thin thumb marking the position. Set `min`, `max` and `step` to define the range, and provide a `formatter` to control how the value is displayed.

::: render
render=../../../code/components/form/fader/preview.vue
:::

::: tip
Clicking anywhere on the fader jumps to that position, and dragging keeps tracking the pointer even when it leaves the fader. The value can also be changed with the arrow keys, `Page Up` / `Page Down` for larger steps, and `Home` / `End` to jump to the minimum or maximum. Faders with a small number of steps snap to detents and show their marks automatically.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic fader from 0 to 100.
example=../../../code/components/form/fader/basic.vue
:::

::: example Steps || A stepped fader that snaps to detents and shows their marks automatically.
example=../../../code/components/form/fader/ticks.vue
:::

::: example Colors || A fader per color; the color only tints the value, the track stays neutral.
example=../../../code/components/form/fader/colors.vue
:::

::: example Icons || A fader with a leading icon before the label and a trailing icon after the value.
example=../../../code/components/form/fader/icons.vue
:::

::: example Custom formatter || A fader with a custom formatter.
example=../../../code/components/form/fader/formatter.vue
:::
