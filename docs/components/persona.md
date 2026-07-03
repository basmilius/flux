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

The persona combines an avatar with a name and title to represent a user or entity. The avatar can show an image, initials, or an icon.

::: render
render=../code/components/persona/preview.vue
:::

<FrontmatterDocs/>

::: tip
In compact mode the name and title are hidden, so the persona button exposes the `name` as its `aria-label` to keep it accessible.
:::

## Examples

::: example Basic || A basic persona.
example=../code/components/persona/basic.vue
:::

::: example Compact || A compact persona.
example=../code/components/persona/compact.vue
:::

::: example Flyout || A persona with a flyout.
example=../code/components/persona/flyout.vue
:::

## Used components

- [Avatar](./avatar)
