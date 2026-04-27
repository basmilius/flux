---
outline: deep

emits:
    -   name: click
        description: Triggered when the icon is clicked.
        type: [ MouseEvent ]

props:
    -   name: name
        description: The name of the icon to use.
        type: FluxIconName
        optional: true

    -   name: size
        description: The size of the icon.
        type: [ number, string ]
        optional: true

    -   name: aria-label
        description: An accessible label for the icon. When omitted, the icon is hidden from assistive technology.
        type: string
        optional: true
---

# Icon

This component displays a single customizable Font Awesome icon, rendered as SVG. It is commonly used in various Flux components, including [Buttons](./button), and can be easily styled with CSS.

Please refer to [Font Awesome](../guide/introduction/font-awesome) to read more about the usage of icons.

There is also a [Boxed icon](./boxed-icon) component available.

::: render
render=../code/components/icon/preview.vue
:::

<FrontmatterDocs/>

## Snippet

```vue
<FluxIcon name="rocket"/>
```
