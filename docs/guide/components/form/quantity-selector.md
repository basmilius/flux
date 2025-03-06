---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the value is changed.

props:
    -   name: model-value
        description: The value of the checkbox.
        type: [ "boolean", "null" ]

    -   name: label
        description: The label that is shown next to the checkbox.
        type: string

requiredIcons:
    - check
    - minus
---

# Quantity selector

Todo

::: render
render=../../../code/guide/components/a-todo/preview.vue
:::

<FrontmatterDocs/>
