---
outline: deep

props:
    -   name: text
        description: The text that is displayed. Whenever this value changes, every changed character rolls to its new glyph like a digit on a drum.
        type: string

    -   name: direction
        description: The roll direction. auto compares the digits in the old and new text and rolls up when the number grows, down when it shrinks.
        type: [ '"auto"', '"up"', '"down"' ]
        default: auto
        optional: true

    -   name: stagger
        description: The delay between two changed characters, in milliseconds.
        type: number
        default: 40
        optional: true
---

# Drum roll

The drum roll turns changed characters over a 3D drum with a short motion blur. Characters align at the end, so a counter that gains a digit keeps its units in place. Quick successive changes roll faster and blur harder.

::: render
render=../../code/visuals/drum-roll/preview.vue
:::

::: tip Accessibility
The label carries the settled text as its accessible name, so screen readers never read the rolling glyphs.
:::

<FrontmatterDocs/>

## Examples

::: example Stagger || Changed characters roll one after the other.
example=../../code/visuals/drum-roll/stagger.vue
:::
