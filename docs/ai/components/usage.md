---
outline: deep

props:
    -   name: cost
        description: The cost of the conversation, already formatted by you.
        type: string
        optional: true

    -   name: input-tokens
        description: The number of tokens that went into the model.
        type: number
        optional: true

    -   name: is-compact
        description: Renders the figures on a single line instead of as a block.
        type: boolean
        optional: true

    -   name: limit
        description: The token budget of the conversation. When set, the total is shown against it.
        type: number
        optional: true

    -   name: output-tokens
        description: The number of tokens the model produced.
        type: number
        optional: true

requiredIcons:
    - triangle-exclamation
---

# Usage

Usage shows what a conversation consumed: the tokens that went in, the tokens that came out, what it cost and, when there is a budget, how close it is to running out. It sits below a conversation, in the footer of a composer or in a panel next to it.

::: render
render=../../code/ai/usage/preview.vue
:::

::: tip
Token counts are rendered with tabular figures and the thousands separator of the visitor's locale, so a column of them lines up and stays comparable while a response streams in.
:::

::: warning
`cost` is a string and is printed as given. The component does no currency formatting: a price depends on the currency, the locale and the rounding your billing uses, and guessing any of those in a UI component produces an amount that does not match the invoice. Format it where you know the answer and pass the result.
:::

<FrontmatterDocs/>

## The limit

`limit` is the token budget of the conversation. The bar fills as the total of the input and output tokens approaches it, and the caption below spells the same thing out in words, so the reading never rests on the bar alone.

From ninety percent of the budget the component adds a line of text: *Approaching the token limit*, and *Token limit reached* once the budget is gone. The bar turns to warning and then to danger along with it, but the text is what carries the message.

## Examples

::: example Basic || The tokens that went in and out of the model, with the cost of the exchange.
example=../../code/ai/usage/basic.vue
:::

::: example With a limit || Pass `limit` to show the total against the budget of the conversation.
example=../../code/ai/usage/limit.vue
:::

::: example Near the limit || From ninety percent of the budget the component says so in words. The color of the bar follows, it does not lead.
example=../../code/ai/usage/near-limit.vue
:::

::: example Compact || `is-compact` puts everything on one line, for the footer of a composer or a toolbar. It wraps rather than overflows when there is no room.
example=../../code/ai/usage/compact.vue
:::

## Used components

- [Icon](../../components/icon)
- [Progress bar](../../components/progress-bar)
