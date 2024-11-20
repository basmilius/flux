---
outline: deep

props:
    -   name: colors
        description: The colors of the animation.
        type: string[]

    -   name: incrementor
        description: Specifies how fast the animation goes.
        type: number
        default: 1
        optional: true

    -   name: opacity
        description: The opacity of the animation.
        type: number
        default: 0.5
        optional: true

    -   name: seed
        description: A seed to use for the randomizer of the animation.
        type: number
        optional: true
---

<script
    lang="ts"
    setup>
    import { FluxAnimatedColors } from '@basmilius/flux';
</script>

# Animated colors

The animated colors component presents an array of colors with a blurred animation effect, often used in the [Pane Illustration](../pane#illustration) component.

<Preview>
    <FluxAnimatedColors
        :colors="['#6071b5', '#f07db7', '#0284c7']"
        :incrementor=".5"
        :opacity="1"
        :seed="130496"/>
</Preview>

<FrontmatterDocs/>

## Examples

Todo

## Snippet

```vue
<FluxAnimatedColors
    :colors="['#6071b5', '#f07db7', '#0284c7']"
    :incrementor=".5"
    :opacity="1"
    :seed="130496"/>
```
