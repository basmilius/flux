---
outline: deep

props:
    -   name: icon
        description: An optional icon shown before the content.
        type: FluxIconName
        optional: true

slots:
    -   name: default
        description: The content of the promo block — typically a heading and a paragraph.
---

# Application menu promo

The application menu promo is a small content block that you can drop inside the menu sidebar to highlight a feature, advertise a plan upgrade, or surface contextual help.

::: render
render=../../code/application/menu-promo/preview.vue
:::

<FrontmatterDocs/>

## Used components

- [Icon](../../components/icon)
