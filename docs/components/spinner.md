---
outline: deep

props:
    -   name: color
        description: The color of the spinner.
        type: FluxColor
        optional: true

    -   name: label
        description: An accessible label describing what is loading. When set, the spinner is announced as a status by assistive technology.
        type: string
        optional: true

    -   name: size
        description: The size of the spinner.
        type: number
        optional: true
---

# Spinner

A spinner is a visual indicator used to show that a process or action is in progress. Spinners are commonly used to provide feedback to the user when a process is taking a long time, such as when loading data or performing a complex calculation. They help to provide a sense of progress and prevent confusion, letting the user know that the system is still working and that they should wait for the process to complete.

::: render
render=../code/components/spinner/preview.vue
:::

::: tip Accessibility
Without a `label` the spinner is purely decorative and hidden from assistive technology (`aria-hidden`). Provide a `label` to expose it as a live status (`role="status"`) so screen readers announce what is loading.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic spinner.
example=../code/components/spinner/basic.vue
:::

::: example Colors || Use the `color` prop to match the spinner to its context.
example=../code/components/spinner/colors.vue
:::
