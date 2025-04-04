---
outline: deep

props:
    -   name: colors
        description: The colors of the border, this includes transparent ones.
        type: string[]
        default: "['#9333ea', 'transparent', '#ea580c', 'transparent', '#db2777', 'transparent', '#9333ea']"
        optional: true

    -   name: duration
        description: The duration of the animation.
        type: number
        default: 9
        optional: true

    -   name: offset
        description: The offset to the element.
        type: number
        default: 1
        optional: true

    -   name: radius
        description: The radius of the shine border. If none is given, the radius is inherited.
        type: [ number, string, undefined ]
        default: undefined
        optional: true

    -   name: width
        description: The width of the shining border.
        type: number
        default: 2
        optional: true

slots:
    -   name: default
        description: The element that should receive a shining border.
---

# Border shine

This component adds a shimmering border effect to any element. Customize the colors, duration, offset, radius, and width to create a unique glowing effect that enhances the visual appeal of your interface.

::: render
render=../../../code/guide/components/visual/border-shine/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Button || Use it on buttons to guide the user to subscriptions.
example=../../../code/guide/components/visual/border-shine/button.vue
:::

::: example Pane || Use it on panes to apply a vibrant shine, perfect for highlighting prominent features.
example=../../../code/guide/components/visual/border-shine/pane.vue
:::
