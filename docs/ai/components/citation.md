---
outline: deep

props:
    -   name: excerpt
        description: The passage the answer came from. Rendered as text, and also carried on the marker itself so a screen reader reads it the moment the marker takes focus.
        type: string
        optional: true

    -   name: index
        description: The number shown in the marker. It is what the reader matches against the source list.
        type: number

    -   name: title
        description: The name of the source, shown at the top of the card.
        type: string
        optional: true

    -   name: url
        description: The address of the source. With one, the title becomes a link that opens in a new tab.
        type: string
        optional: true

slots:
    -   name: default
        description: Replaces the whole card, for a richer source than a title and a passage. Receives close.

requiredIcons:
    - arrow-up-right-from-square
---

# Citation

`FluxAiCitation` is the inline source marker in a response: a small number behind a sentence that opens the passage it came from. It sits in flowing text, so it is deliberately smaller than the line it lives in and never stretches it.

::: render
render=../../code/ai/citation/preview.vue
:::

::: tip
A citation is not a tooltip. The marker is a real button that a keyboard reaches, the card opens on hover, on focus and on click, `Escape` closes it and hands focus back, and the card can hold links and other controls.
:::

::: warning
The marker is excluded from text selection, so copying a paragraph copies the prose and not `1`, `2`, `3` between the sentences. The trade-off is that the numbers cannot be copied along with the text either: a pasted answer loses its references. Repeat them in a source list below the answer when that matters.
:::

<FrontmatterDocs/>

## Accessibility

The number alone reads as nothing, so the marker is labeled `Source 1` and the passage travels with it as its accessible description. That means a screen reader user hears the source and the passage on the marker itself, without having to open anything or find the card in the reading order.

That description is built from `title` and `excerpt`. A card built through the default slot cannot be read out this way, so pass `title` and `excerpt` alongside your own card whenever the slot content is not already covered by them.

## Examples

::: example Basic || One citation behind a sentence, with a title, a link and the passage.
example=../../code/ai/citation/basic.vue
:::

::: example What the card shows || Only the number, a named source, and a source with the passage. Each prop adds one line to the card.
example=../../code/ai/citation/excerpt.vue
:::

::: example In prose || Three markers in a paragraph, next to a paragraph without any. Both keep the same 24px line rhythm, because the marker fits inside the line box rather than growing it.
example=../../code/ai/citation/prose.vue
:::

::: example Custom card || The default slot replaces the card, for a source that deserves more than a title and a passage.
example=../../code/ai/citation/slot.vue
:::

## Used components

- [Hover card](../../components/hover-card)
- [Icon](../../components/icon)
