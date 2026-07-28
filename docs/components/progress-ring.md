---
outline: deep

props:
    -   name: color
        description: The color of the ring's value arc.
        type: FluxColor
        optional: true
        default: primary

    -   name: is-indeterminate
        description: If the progress ring is in an indeterminate state. The arc then spins instead of showing a value.
        type: boolean
        optional: true

    -   name: label
        description: An accessible label describing what is progressing. When set, the ring is announced as a progress bar by assistive technology.
        type: string
        optional: true

    -   name: max
        description: The maximum value of the progress ring.
        type: number
        optional: true
        default: 1

    -   name: min
        description: The minimum value of the progress ring.
        type: number
        optional: true
        default: 0

    -   name: size
        description: The outer diameter of the ring in pixels.
        type: number
        optional: true
        default: 60

    -   name: thickness
        description: The stroke width of the track and the value arc in pixels.
        type: number
        optional: true
        default: 6

    -   name: value
        description: The current value of the progress ring.
        type: number
        optional: true

slots:
    -   name: default
        description: The content rendered in the center of the ring.
        type:
            progress: string
---

# Progress ring

The progress ring is the radial counterpart of the [progress bar](./progress-bar). It draws a task's completion as an arc on a circle, which fits where a bar would be too wide: next to a metric, inside a card or in a compact toolbar.

::: render
render=../code/components/progress-ring/preview.vue
:::

::: tip
The default slot receives the formatted percentage as `progress`, so the center label never has to repeat the percentage math.
:::

::: tip Accessibility
Without a `label` the ring is decorative: the graphic is `aria-hidden` and no role is exposed, while anything in the center slot stays readable. Provide a `label` to expose the ring as a `role="progressbar"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`. When `is-indeterminate` is set, the value attributes are omitted so screen readers announce progress of unknown duration.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic progress ring.
example=../code/components/progress-ring/basic.vue
:::

::: example Colors || Progress rings in each of the available colors.
example=../code/components/progress-ring/colors.vue
:::

::: example Sizes || Use `size` and `thickness` to fit the ring to its surroundings.
example=../code/components/progress-ring/sizes.vue
:::

::: example Indeterminate || A progress ring with an indeterminate state, which spins like a spinner.
example=../code/components/progress-ring/indeterminate.vue
:::

::: example Center label || The default slot renders in the center of the ring.
example=../code/components/progress-ring/center-label.vue
:::
