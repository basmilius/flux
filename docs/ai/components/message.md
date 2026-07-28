---
outline: deep

props:
    -   name: author
        description: The name shown above the turn. Defaults to a translated name for the role it carries, so Assistant, You or System.
        type: string
        optional: true

    -   name: avatar-fallback-initials
        description: The initials shown when the turn has no avatar image.
        type: string
        optional: true

    -   name: avatar-src
        description: The avatar of the turn, shown as its marker.
        type: string
        optional: true

    -   name: date-time
        description: The machine readable timestamp of the turn, rendered as the datetime attribute of the time element.
        type: string
        optional: true

    -   name: day
        description: The day this turn belongs to. Only read by a grouped conversation, which compares it with the turn above to place a day separator.
        type: string
        optional: true

    -   name: icon
        description: The icon shown as the marker of the turn, used when there is no avatar.
        type: FluxIconName
        optional: true

    -   name: is-streaming
        description: Marks the turn as still arriving. The turn reports itself as busy and holds its actions back until the answer is complete.
        type: boolean
        default: false
        optional: true

    -   name: role
        description: Whose turn this is.
        type: [ '"assistant"', '"system"', '"user"' ]

    -   name: when
        description: The human readable time of the turn, for instance 09:12 or 2 hours ago.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the turn.

    -   name: actions
        description: The actions of the turn, for instance copy, retry and a rating. Rendered as a toolbar and hidden until the turn is hovered or focused.

    -   name: footer
        description: A line below the content, for instance the sources an answer was built from.
---

# Message

A message is one turn of a conversation: a question from the user, an answer from the assistant or an instruction from the system. It carries a marker, the content and, when you give it one, a row of actions.

::: render
render=../../code/ai/message/preview.vue
:::

::: tip
The message renders no markdown of its own. Put [Streaming text](./streaming-text) in the default slot to turn a model response into formatted content, or plain text when there is nothing to format.
:::

::: warning
The message never formats a date. Both `when` and `date-time` are rendered as given, so the surrounding application decides whether a turn reads as `09:12`, `2 minutes ago` or `28 July 2026`.
:::

<FrontmatterDocs/>

## Anatomy

The three roles differ on purpose. A **user** turn is a bubble that hugs its own text and sits at the end of the line, because a question is short. An **assistant** turn runs the full width without a bubble, because an answer holds prose, lists, tables and code. A **system** turn is a sunken strip in small type, because it is context rather than conversation.

Inside a [Conversation](./conversation) the turn is a list item; on its own it is an article, so a single message stays valid HTML outside a chat.

## Examples

::: example Roles || The three roles side by side.
example=../../code/ai/message/roles.vue
:::

::: example Avatar and author || An avatar and an explicit `author` replace the icon and the default name, which is what a multi-user chat needs.
example=../../code/ai/message/avatar.vue
:::

::: example Actions || The `actions` slot becomes a toolbar with roving focus. It stays out of the way until the turn is hovered or focused.
example=../../code/ai/message/actions.vue
:::

::: example Streaming || While `is-streaming` is set the turn reports itself as busy, marks its author line and keeps its actions hidden until the answer is complete.
example=../../code/ai/message/streaming.vue
:::

::: example Footer || The `footer` slot holds what was true about the answer rather than what it said.
example=../../code/ai/message/footer.vue
:::

## Used components

- [Action](../../components/action)
- [Avatar](../../components/avatar)
- [Boxed icon](../../components/boxed-icon)
- [Conversation](./conversation)
