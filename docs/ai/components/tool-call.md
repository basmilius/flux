---
outline: deep

emits:
    -   name: update:isExpanded
        description: Triggered when the tool call is folded open or closed.
        type: [ boolean ]

props:
    -   name: arguments
        description: The arguments the model passed to the tool. A string that parses as JSON and an object are both pretty printed; anything else is shown exactly as it arrived.
        type: [ 'string', 'Record<string, unknown>' ]
        optional: true

    -   name: duration
        description: How long the call took, in seconds.
        type: number
        optional: true

    -   name: is-expanded
        description: Whether the detail is folded open. Supports v-model.
        type: boolean
        default: false
        optional: true

    -   name: name
        description: The name of the tool that was invoked.
        type: string

    -   name: result
        description: The output the tool returned. A long result is cut off with a button to show the rest.
        type: string
        optional: true

    -   name: status
        description: The outcome of the call. Each status brings its own dot color and wording.
        type: [ '"running"', '"success"', '"error"' ]
        default: success
        optional: true

slots:
    -   name: arguments
        description: Replaces the rendering of the arguments. Receives the formatted string as value.

    -   name: result
        description: Replaces the rendering of the result, including its truncation. Receives the raw string as value.

requiredIcons:
    - angle-right
    - check
    - copy
---

# Tool call

`FluxAiToolCall` shows that the model reached for a tool: which tool it was, what it was given, what came back and how that went. Collapsed it is a single line written the way the call would have been written in code, so a response that used five tools still reads as a response. Fold it open for the full arguments and the result.

::: render
render=../../code/ai/tool-call/preview.vue
:::

::: tip
The tool name, the arguments and the result are model output, and Flux treats them that way. They are rendered as text, never as markup, so a result containing `<script>` or `<img onerror>` shows those characters instead of running them.
:::

::: warning
`status` is the only thing that says whether a call worked. It is not derived from `result`, because an empty result is a perfectly good success and a filled one is a perfectly good failure. Set it yourself.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A call with its arguments and its result. The status defaults to success.
example=../../code/ai/tool-call/basic.vue
:::

::: example Statuses || Running, succeeded and failed. A call that is running or failed says so in words next to its dot; a call that succeeded leaves that word to assistive technology, because next to the duration it adds nothing.
example=../../code/ai/tool-call/status.vue
:::

::: example Expanded || `is-expanded` supports `v-model`, so the fold can be driven from outside, for example to open the call that is currently running.
example=../../code/ai/tool-call/expanded.vue
:::

::: example Arguments || Arguments are pretty printed when they parse as JSON. A model that stopped halfway through its arguments produces a string that does not parse, and that string is shown as it is rather than dropped.
example=../../code/ai/tool-call/arguments.vue
:::

::: example Long results || A result past the configured limit of 900 characters is cut off and the rest moves behind a button, so one chatty tool cannot push the rest of the conversation off the screen. Copy always copies the whole thing.
example=../../code/ai/tool-call/truncation.vue
:::

::: example Custom result || The `result` slot takes over the rendering entirely, for a tool whose output is better read as components than as text.
example=../../code/ai/tool-call/slots.vue
:::

## The collapsed line

The line names the tool and, when the arguments parse as an object, summarizes them as a signature: `search(query: "flux ui", limit: 10)`. Long values are cut and a long signature ends in an ellipsis; the fold has the untouched version. Arguments that are not an object have no shape to summarize, and the line shows `search()`.

## Grouping calls

The component is a thin layer over [Expandable](../../components/expandable/), so a `FluxExpandableGroup` around a run of tool calls turns them into an accordion where only one detail is open at a time.

## Used components

- [Expandable](../../components/expandable/)
- [Icon](../../components/icon)
