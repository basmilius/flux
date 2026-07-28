---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the prompt text changes.
        type: [ string ]

    -   name: update:attachments
        description: Triggered when a file is attached or removed.
        type: [ 'File[]' ]

    -   name: stop
        description: Triggered when the stop button is pressed while a response is streaming.
        type: []

    -   name: submit
        description: Triggered when the prompt is submitted, with the trimmed prompt text.
        type: [ string ]

props:
    -   name: model-value
        description: The prompt text.
        type: string

    -   name: attachments
        description: The attached files. Binding this model switches the attachment button and the pills on.
        type: 'File[]'
        optional: true

    -   name: accept
        description: The file types the attachment picker accepts, exactly like the accept attribute of an input.
        type: string
        optional: true

    -   name: disabled
        description: Whether the composer is disabled.
        type: boolean
        optional: true

    -   name: is-streaming
        description: Whether a response is streaming. Replaces the send button with a stop button.
        type: boolean
        optional: true

    -   name: max-rows
        description: The number of lines the field grows to before it starts scrolling.
        type: number
        default: 10
        optional: true

    -   name: placeholder
        description: The placeholder shown while the field is empty.
        type: string
        optional: true

slots:
    -   name: default
        description: Content rendered above the field, for instance suggestions or context pills.

    -   name: actions
        description: Extra controls rendered next to the send button, such as a model picker.

requiredIcons:
    - arrow-up
    - paperclip
    - stop
    - xmark
---

# Prompt input

`FluxAiPromptInput` is the composer of a conversation. The field grows with what is typed until it reaches `max-rows` and then scrolls, <kbd>Enter</kbd> submits, <kbd>Shift</kbd> + <kbd>Enter</kbd> inserts a newline, and while a response streams the send button makes room for a stop button.

::: render
render=../../code/ai/prompt-input/preview.vue
:::

::: tip
Submitting is blocked while the prompt is empty or holds only whitespace, so there is no need to guard the `submit` handler. The emitted payload is the trimmed prompt.
:::

::: info
The composer never clears itself. Reset `v-model` in the `submit` handler once the prompt has been accepted, so a failed request can leave the text in place.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Bind the prompt with `v-model` and handle `submit`. The composer keeps the text until you clear it.
example=../../code/ai/prompt-input/basic.vue
:::

::: example Streaming || While `is-streaming` is set the send button is swapped for a stop button that emits `stop`.
example=../../code/ai/prompt-input/streaming.vue
:::

::: example Suggestions || The default slot sits above the field, which is where [Suggestions](./suggestions) belong.
example=../../code/ai/prompt-input/suggestions.vue
:::

::: example Attachments || Binding `v-model:attachments` adds an attach button and a removable pill per file.
example=../../code/ai/prompt-input/attachments.vue
:::

::: example Drag and drop || Wrap the composer in a [Drop zone](../../components/drop-zone) to accept files that are dragged onto it.
example=../../code/ai/prompt-input/drop-zone.vue
:::

## Used components

- [Icon](../../components/icon)
- [Primary button](../../components/button/primary)
- [Secondary button](../../components/button/secondary)
