---
outline: deep

props:
    -   name: aria-label
        description: The accessible label of the breadcrumb navigation.
        type: string
        optional: true
        default: Breadcrumb

slots:
    -   name: default
        description: The trail of the breadcrumb, rendered as [Breadcrumb item](./item) components.

requiredIcons:
    - slash-forward
---

# Breadcrumb

A breadcrumb shows users where they are within a hierarchy and lets them navigate back to any ancestor. Each step is a [Breadcrumb item](./item); the last item represents the current page and is rendered as plain, non-interactive text with `aria-current="page"`. Separators are inserted automatically between items.

::: render
render=../../code/components/breadcrumb/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A breadcrumb trail with router links.
example=../../code/components/breadcrumb/basic.vue
:::

::: example With icons || A breadcrumb trail with an icon per step.
example=../../code/components/breadcrumb/icons.vue
:::

## Used components

- [Breadcrumb item](./item)
