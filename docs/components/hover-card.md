---
outline: deep

emits:
    -   name: close
        description: Triggered when the card closes.
        type: [ ]

    -   name: open
        description: Triggered when the card opens.
        type: [ ]

props:
    -   name: close-delay
        description: The grace period in milliseconds between the pointer leaving and the card closing. It gives the pointer time to travel from the opener into the card.
        type: number
        default: 150
        optional: true

    -   name: direction
        description: Specifies in what direction the card should open.
        type: FluxDirection
        default: vertical
        optional: true

    -   name: disabled
        description: Keeps the card closed, so the opener behaves as if no card were attached.
        type: boolean
        optional: true

    -   name: label
        description: An accessible label for the card, exposed as aria-label on its group.
        type: string
        optional: true

    -   name: margin
        description: A margin from the opener element.
        type: number
        default: 9
        optional: true

    -   name: open-delay
        description: The time in milliseconds the pointer has to rest on the opener before the card opens.
        type: number
        default: 500
        optional: true

    -   name: position
        description: Pins the card to a fixed side of the opener instead of picking one automatically.
        type: [ '"top"', '"top-left"', '"top-right"', '"left"', '"left-top"', '"left-bottom"', '"right"', '"right-top"', '"right-bottom"', '"bottom"', '"bottom-left"', '"bottom-right"' ]
        optional: true

slots:
    -   name: default
        description: The content of the card.
        type:
            close: "(): void"

    -   name: opener
        description: The element the card is attached to.
        type:
            close: "(): void"
            open: "(): void"
            isOpen: boolean
---

# Hover card

A hover card shows a rich preview when the pointer rests on an element: the person behind a mention, the repository behind a link, the product behind a row. It is richer than a tooltip because it may contain links and buttons, and lighter than a flyout because it opens on hover instead of on click.

::: render
render=../code/components/hover-card/preview.vue
:::

::: tip
For a plain text label, use a [Tooltip](./tooltip) instead. A tooltip is announced as the description of its opener, which only works for content that is a single piece of text.
:::

::: info Pointer, keyboard and touch
The card also opens when the opener receives keyboard focus and closes again on blur or on <kbd>Escape</kbd>. On a touch device it never opens, so a tap does whatever the opener normally does.
:::

<FrontmatterDocs/>

## Examples

::: example User preview || A row of compact personas, each of which unfolds into the full profile.
example=../code/components/hover-card/user-preview.vue
:::

::: example Link preview || A summary of what is on the other side of a link, so the reader can decide before clicking.
example=../code/components/hover-card/link-preview.vue
:::

::: example Delays || Tune how long the pointer has to rest before the card opens and how long it may wander before it closes.
example=../code/components/hover-card/delay.vue
:::

::: example Disabled || A disabled card never opens, which is useful while its content is still unknown.
example=../code/components/hover-card/disabled.vue
:::

## Used components

- [Link](./link)
- [Persona](./persona)
- [Separator](./separator)
- [Text](./text)
