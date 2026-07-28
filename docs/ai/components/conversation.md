---
outline: deep

props:
    -   name: is-grouped
        description: Renders a day separator above every turn whose `day` differs from the turn before it.
        type: boolean
        default: false
        optional: true

    -   name: is-sticky
        description: Follows the tail, so the newest turn stays in view while it arrives. Following stops the moment the reader scrolls up and resumes when they return to the bottom.
        type: boolean
        default: true
        optional: true

    -   name: jump-to-latest-label
        description: The name of the button that appears while the reader is scrolled up. Defaults to a translated "Jump to latest".
        type: string
        optional: true

    -   name: label
        description: The accessible name of the conversation region. Defaults to a translated "Conversation".
        type: string
        optional: true

slots:
    -   name: default
        description: The turns of the conversation, one FluxAiMessage per turn.

    -   name: empty
        description: What to show while the conversation has no turns yet.

requiredIcons:
    - arrow-down
---

# Conversation

The conversation is the scroll container of a chat. It keeps the newest turn in view while an answer streams in, steps aside the moment the reader scrolls up to read something back, and offers a button to jump to the latest turn again.

::: render
render=../../code/ai/conversation/preview.vue
:::

::: tip
The conversation fills its parent, so the height has to come from above: a flex column that also holds a [Prompt input](./prompt-input), or a block with a fixed height. Without a bounded height there is nothing to scroll and the conversation simply grows.
:::

::: warning
Following the tail and scrolling by hand are the same scroll position, so the conversation has to tell them apart. Every scroll it performs itself runs toward the bottom, which means a shrinking `scrollTop` can only have come from the reader. That is the signal that detaches the tail; reaching the bottom again attaches it. Under `prefers-reduced-motion` the jump to the bottom is instant instead of smooth.
:::

<FrontmatterDocs/>

## Exposed methods

`scrollToBottom()` scrolls to the newest turn and resumes following the tail. Reach it through a template ref, for instance right after sending a message.

## Accessibility

The scroll container is a `log` live region with `aria-relevant="additions"`, so a screen reader announces the turn that was just appended instead of re-reading the whole conversation. The turns themselves form a list, and every [Message](./message) names its author in text, so whose turn it is never depends on color or position alone.

## Examples

::: example Basic || A conversation renders one FluxAiMessage per turn and opens at the newest one.
example=../../code/ai/conversation/basic.vue
:::

::: example Following the tail || While an answer streams in, the conversation keeps its last words in view. Scroll up during the answer and it lets go immediately; scroll back down and it picks the tail up again.
example=../../code/ai/conversation/following.vue
:::

::: example Grouped by day || Set `is-grouped` and give each turn a `day` label to separate the conversation into days. The label is yours to format, the conversation only compares it with the turn above.
example=../../code/ai/conversation/grouped.vue
:::

::: example Empty || The `empty` slot fills the conversation before the first question is asked.
example=../../code/ai/conversation/empty.vue
:::

::: example Manual scrolling || With `is-sticky` set to false the conversation never moves on its own. `scrollToBottom()` puts you back at the newest turn whenever you decide it should.
example=../../code/ai/conversation/manual.vue
:::

## Used components

- [Message](./message)
- [Secondary button](../../components/button/secondary)
- [Tooltip](../../components/tooltip)
