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

    -   name: color
        description: Colors the icon using the palette's 600 shade. When omitted, the icon inherits its color from the parent.
        type: FluxColor
        optional: true

    -   name: size
        description: The size of the icon.
        type: [ number, string ]
        optional: true

    -   name: icon-style
        description: Overrides the Font Awesome family/style for this icon in font mode (for example brands). Ignored in the default SVG mode.
        type: FluxIconStyle
        optional: true

    -   name: aria-label
        description: An accessible label for the icon. When omitted, the icon is hidden from assistive technology.
        type: string
        optional: true
---

# Icon

This component displays a single customizable Font Awesome icon, rendered as SVG by default. It is commonly used in various Flux components, including [Buttons](./button), and can be easily styled with CSS. It can also render icons with the Font Awesome webfont. See [Font Awesome](../guide/introduction/font-awesome#using-the-icon-font).

Please refer to [Font Awesome](../guide/introduction/font-awesome) to read more about the usage of icons.

There is also a [Boxed icon](./boxed-icon) component available.

::: render
render=../code/components/icon/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Colored
example=../code/components/icon/colored.vue
:::

## Snippet

```vue
<FluxIcon name="rocket"/>
```
