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

The spinner indicates that a process is in progress. Use it to signal that the system is working, for example while loading data or performing a long calculation.

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
