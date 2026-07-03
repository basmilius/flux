---
outline: deep

props:
    -   name: color
        description: The color of the progress bar fill.
        type: FluxColor
        optional: true
        default: primary

    -   name: is-indeterminate
        description: If the progress bar is in an indeterminate state.
        type: boolean
        optional: true

    -   name: max
        description: The maximum value of the progress bar.
        type: number
        optional: true
        default: 1

    -   name: min
        description: The minimum value of the progress bar.
        type: number
        optional: true
        default: 0

    -   name: status
        description: The status message of the progress bar.
        type: string
        optional: true

    -   name: value
        description: The current value of the progress bar.
        type: number
        optional: true
---

# Progress bar

The progress bar is a visual indicator of a task's status and completion, useful for operations that take a noticeable amount of time.

::: render
render=../code/components/progress-bar/preview.vue
:::

::: tip Accessibility
The reported `aria-valuenow` is always clamped to the `min`/`max` range, so out-of-bounds values never confuse assistive technology. When `is-indeterminate` is set, `aria-valuenow` is omitted entirely so screen readers announce an in-progress state of unknown duration.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic progress bar.
example=../code/components/progress-bar/basic.vue
:::

::: example Colors || Progress bars in each of the available colors.
example=../code/components/progress-bar/colors.vue
:::

::: example Status || A progress bar with a status message.
example=../code/components/progress-bar/status.vue
:::

::: example Indeterminate || A progress bar with an indeterminate state.
example=../code/components/progress-bar/indeterminate.vue
:::

::: example Complete || A progress bar that will complete itself.
example=../code/components/progress-bar/complete.vue
:::

::: example Snackbar || A progress bar inside a snackbar.
example=../code/components/progress-bar/snackbar.vue
:::

## Used components

- [Layout](./layout)
    - [Flex](./layout/flex/)
