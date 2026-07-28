# Flux AI

Flux AI is the set of building blocks a conversational product needs and a general component library has no business carrying: a composer that survives an IME, text that renders markdown while it is still arriving, a tool call you can fold open, a citation that points at the passage it came from.

It is deliberately a separate package. Streaming markdown pulls in a parser, and a consumer who will never build a chat should not pay for it.

## Highlights

- **Streaming that stays valid.** `FluxAiStreamingText` renders a response as it arrives, holds back an unterminated construct rather than flickering between interpretations, and escapes raw HTML instead of rendering it. A model response is untrusted input.
- **A composer that behaves.** `FluxAiPromptInput` grows with its content, submits on Enter, gives you a newline on Shift+Enter, and never submits mid-composition, which is the bug most chat inputs ship with.
- **The conversation itself.** `FluxAiConversation` follows the tail while an answer streams and lets go the instant the reader scrolls up, with a way back to the latest turn.
- **What the model did, not just what it said.** `FluxAiToolCall` shows the invocation, its arguments and its result; `FluxAiReasoning` folds the thinking away; `FluxAiCitation` marks a source inline without breaking the line box.
- **The controls around it.** `FluxAiModelSelect` picks the model, `FluxAiUsage` reports what a conversation consumed, `FluxAiSuggestions` offers the follow-ups.

## Relation to the other packages

Everything here builds on `@flux-ui/components`: the buttons, panes, form controls and icons are the ones you already use. `FluxComment` remains the right component for a human comment thread; the AI message is its sibling for a model turn, where the assistant runs full width because an answer holds prose, tables and code.

Start with [Installation](./introduction/installation), or head straight for [Conversation](./components/conversation).
