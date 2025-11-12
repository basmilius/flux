---
outline: deep

emits:
    -   name: click
        description: Triggered when the persona is clicked.
        type: [ MouseEvent ]

props:
    -   name: avatar-alt
        description: Alt tag for the image.
        type: string
        optional: true

    -   name: avatar-fallback
        description: Which fallback type to use. The colorized fallback displays a random color based on the content.
        type: [ '"colorized"', '"neutral"' ]
        optional: true
        default: colorized

    -   name: avatar-fallback-icon
        description: The fallback icon to use when no url or initials are provided.
        type: FluxIconName
        optional: true
        default: user

    -   name: avatar-fallback-initials
        description: The initials to use as fallback when no url or icon is provided.
        type: string
        optional: true

    -   name: avatar-size
        description: The size of the avatar.
        type: number
        optional: true
        
    -   name: avatar-src
        description: The URL of the image to use as the avatar.
        type: string
        optional: true

    -   name: is-compact
        description: If the compact version of the component should be used.
        type: boolean
        optional: true

    -   name: name
        description: The name of the entity being represented.
        type: string
        
    -   name: title
        description: The title of the entity being represented.
        type: string
        optional: true

requiredIcons:
    - user
---

# Persona

The Persona component is a versatile Vue component that combines an avatar, name, and title to provide a complete representation of a user or other entity. With the ability to display an image, initials, or an icon, the avatar portion of the component is fully customizable and can be adapted to suit your specific needs. The name and title fields are also customizable and can be used to display any relevant information about the entity being represented.

::: render
render=../../code/guide/components/persona/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic persona.
example=../../code/guide/components/persona/basic.vue
:::

::: example Compact || A compact persona.
example=../../code/guide/components/persona/compact.vue
:::

::: example Flyout || A persona with a flyout.
example=../../code/guide/components/persona/flyout.vue
:::

## Used components

- [Avatar](./avatar)
