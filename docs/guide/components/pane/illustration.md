---
outline: deep

props:
    -   name: animated-colors
        description: An array of hex values to use in the color glowing effect.
        type: string[]

    -   name: animated-opacity
        description: The global opacity level of the animation.
        type: number
        optional: true

    -   name: animated-seed
        description: The randomizer seed of the animation.
        type: number
        optional: true

    -   name: aspect-ratio
        description: The aspect ratio of the illustration.
        type: number
        optional: true
        default: 16 / 9

    -   name: is-masked
        description: If the illustration should fade away in the background.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content within the illustration pane.

    -   name: controlled
        description: The controlled illustration content.
---

# Pane illustration

The pane illustration is used to place a visual illustration within a pane, often in feature or onboarding-style cards. Illustrations are created outside of Flux and brought into the pane to add personality

::: render
render=../../../code/guide/components/pane/illustration/preview.vue
:::

<FrontmatterDocs/>

## Examples 

// examples

## Used components

- [Visual](../visual)
    - [Grid pattern](../visual/grid-pattern)
    - [Animated colors](../visual/animated-colors)
