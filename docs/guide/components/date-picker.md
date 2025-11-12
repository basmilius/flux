---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when a new value is selected.
        type: [ "DateTime | DateTime[]" ]

props:
    -   name: model-value
        description: The selected value.
        type: [ 'DateTime', 'DateTime[]' ]

    -   name: max
        description: The maximum date that can be selected.
        type: DateTime
        optional: true

    -   name: min
        description: The minimum date that can be selected.
        type: DateTime
        optional: true

    -   name: range-mode
        description: Which range mode should be used.
        type: [ '"range"', '"week"', '"month"' ]
        optional: true

requiredIcons:
    - angle-left
    - angle-right
---

# Date picker

The date picker enables seamless date selection with navigable views for months and years, a detailed date grid, smooth visual transitions, boundary validation, and a focus on accessibility for an intuitive user experience.

::: render
render=../../code/guide/components/date-picker/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Single || A single date can be selected here.
example=../../code/guide/components/date-picker/single.vue
:::

::: example Range || A date range can be selected here.
example=../../code/guide/components/date-picker/range.vue
:::

::: example Week || A week can be selected here.
example=../../code/guide/components/date-picker/week.vue
:::

::: example Month || A month can be selected here.
example=../../code/guide/components/date-picker/month.vue
:::

## Used components

- [Button](./button)
    - [Secondary](./button/secondary)
