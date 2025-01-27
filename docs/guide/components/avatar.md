---
outline: deep

emits:
    -   name: click
        description: Triggered when the avatar is clicked.
        type: [ MouseEvent ]

props:
    -   name: alt
        description: A brief description of the image that is shown.
        type: string
        optional: true

    -   name: fallback
        description: How the fallback to initials should look.
        type: [ '"colored"', '"neutral"' ]
        optional: true

    -   name: fallback-icon
        description: The icon that is used within the fallback.
        type: IconName
        optional: true

    -   name: fallback-initials
        description: The initials that are used for the fallback.
        type: string
        optional: true

    -   name: is-clickable
        description: Indicates that the avatar is clickable.
        type: boolean
        optional: true

    -   name: status
        description: The status dot that is shown within the avatar. E.g. an online status.
        type: ColorVariant
        optional: true

    -   name: url
        description: The url to the image source that is used in the avatar.
        type: string
        optional: true
---

# Avatar

The Avatar component is a versatile UI element designed to display an image, initials, or an icon. It accepts various props to dynamically render the appropriate content based on the provided input. This component is perfect for representing users or any entities that require a visual identifier.

::: render
render=../../code/guide/components/avatar/preview.vue
:::

::: tip
To display a person's name and title along with their avatar, consider using the [Persona](./persona) component.
:::

<FrontmatterDocs/>

## Examples

::: example Image with status || Avatars can include statuses to indicate conditions such as online status.
example=../../code/guide/components/avatar/image-with-status.vue
:::

::: example Initials || In the absence of an image, avatars can default to using initials.
example=../../code/guide/components/avatar/initials.vue
:::

::: example Icon || When no image is available, you can use an icon as a fallback instead of initials.
example=../../code/guide/components/avatar/icon.vue
:::

## Used components

- [Icon](./icon)
