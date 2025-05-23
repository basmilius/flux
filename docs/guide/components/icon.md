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
        
    -   name: size
        description: The size of the icon.
        type: [ number, string ]
        optional: true
---

# Icon

This component displays a single customizable Font Awesome icon, rendered as SVG. It is commonly used in various Flux components, including [Buttons](./button), and can be easily styled with CSS.

Please refer to [Font Awesome](../introduction/font-awesome) to read more about the usage of icons.

There is also a [Boxed icon](./boxed-icon) component available.

::: render
render=../../code/guide/components/icon/preview.vue
:::

<FrontmatterDocs/>

## Snippet

```vue
<FluxIcon name="rocket"/>
```
