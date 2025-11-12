---
outline: deep

props:
    -   name: avatar-alt
        description: A brief description of the image that is shown.
        type: string
        optional: true

    -   name: avatar-fallback
        description: How the fallback to initials should look.
        type: [ '"colored"', '"neutral"' ]
        optional: true

    -   name: avatar-fallback-icon
        description: The icon that is used within the fallback.
        type: FluxIconName
        optional: true

    -   name: avatar-fallback-initials
        description: The initials that are used for the fallback.
        type: string
        optional: true

    -   name: avatar-url
        description: The url to the image source that is used in the avatar.
        type: string
        optional: true

    -   name: is-flipped
        description: Flip the comment.
        type: boolean
        optional: true

    -   name: is-received
        description: Use a received appearance.
        type: boolean
        optional: true

    -   name: name
        description: The name of the comment's author.
        type: string

    -   name: period
        description: The period when the comment was created.
        type: string
        optional: true

slots:
    -   name: default
        description: The contents of the comment.

requiredIcons:
    - user
---

# Comment

This component represents a user comment with support for customizable details such as the author's name, avatar, and optional time information. It includes a structured layout with an avatar, header, and message body, allowing additional content to be provided via a slot. Styles can adjust its appearance, such as flipping or differentiating received comments.

::: render
render=../../code/guide/components/comment/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Incoming || An incoming comment that is used within a message thread.
example=../../code/guide/components/comment/incoming.vue
:::

::: example Outgoing || An outgoing comment that is used within a message thread.
example=../../code/guide/components/comment/outgoing.vue
:::

::: example Typing || An indication that someone is typing a message.
example=../../code/guide/components/comment/typing.vue
:::

## Used components

- [Avatar](./avatar)
