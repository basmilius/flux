---
outline: deep

props:
    -   name: title
        description: The title of the step. Always required.
        type: string

    -   name: subtitle
        description: An optional line of supporting text shown below the title.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the step, rendered at full width below the header.

    -   name: end
        description: Trailing content aligned to the end of the header, such as a status badge.
---

# Form step

The form step breaks a longer form into numbered stages. Each step is automatically numbered and pairs a required title with an optional subtitle, followed by its own content at full width.

::: render
render=../../code/components/form/step/preview.vue
:::

::: info Accessibility
Every step is exposed as a labelled group (`role="group"` + `aria-labelledby`) so assistive technology announces the title as the name of its content. The number badge is decorative (`aria-hidden`).
:::

::: tip
This component is best used within a [Form](../form), which resets the numbering. Steps are numbered automatically with a CSS counter.
:::

<FrontmatterDocs/>

## Examples

::: example End slot || Add trailing content, like a status badge, to the step header through the `end` slot.
example=../../code/components/form/step/end-slot.vue
:::

## Snippet

::: code-group

<<< @/code/components/form/step/preview.vue [FluxFormStep.vue]

:::
