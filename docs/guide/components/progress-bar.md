---
outline: deep

props:
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

A progress bar serves as a visual indicator that communicates the ongoing status and advancement of a task, particularly those that require a significant amount of time to complete. It functions by providing a graphical representation of the task's progress, offering users a clear insight into both the current activity and the overall completion status.

::: render
render=../../code/guide/components/progress-bar/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic progress bar.
example=../../code/guide/components/progress-bar/basic.vue
:::

::: example Status || A progress bar with a status message.
example=../../code/guide/components/progress-bar/status.vue
:::

::: example Indeterminate || A progress bar with an indeterminate state.
example=../../code/guide/components/progress-bar/indeterminate.vue
:::

::: example Complete || A progress bar that will complete itself.
example=../../code/guide/components/progress-bar/complete.vue
:::

::: example Snackbar || A progress bar inside a snackbar.
example=../../code/guide/components/progress-bar/snackbar.vue
:::

## Used components

- [Layout](./layout)
    - [Stack](./layout/stack)
