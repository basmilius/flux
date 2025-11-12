---
outline: deep

props:
    - name: pane-variant
      description: The variant of the action pane.
      type: [ '"default"', '"flat"', '"well"' ]
      default: default
      optional: true

slots:
    -   name: default
        description: The content of the action pane.

    -   name: buttons
        description: The buttons of the action pane.

    -   name: base
        description: The base of the action pane.
---

# Action pane

An action pane highlights important actions or new features to the user.

::: render
render=../../code/guide/components/action-pane/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Plain || A simple action pane without any buttons.
example=../../code/guide/components/action-pane/plain.vue
:::

::: example Button || An action pane with buttons.
example=../../code/guide/components/action-pane/buttons.vue
:::

## Used components

- [Pane](./pane)
    - [Body](./pane/body)
- [Layout](./layout)
    - [Stack](./layout/stack)
