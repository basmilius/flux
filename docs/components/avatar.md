---
outline: deep

emits:
    -   name: click
        description: Triggered when the avatar is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the button is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the button is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: alt
        description: A brief description of the image that is shown.
        type: string
        optional: true

    -   name: fallback
        description: How the fallback to initials should look.
        type: [ '"colorized"', '"neutral"' ]
        optional: true
        default: colorized

    -   name: fallback-colors
        description: The fallback colors available. Only specify if you want to override the default colorful set.
        type: string[]
        optional: true

    -   name: is-loading
        description: Shows a loading spinner over the avatar.
        type: boolean
        optional: true

    -   name: fallback-icon
        description: The icon that is used within the fallback.
        type: FluxIconName
        optional: true

    -   name: fallback-initials
        description: The initials that are used for the fallback.
        type: string
        optional: true

    -   name: size
        description: The size in pixels of the avatar.
        type: number
        optional: true

    -   name: src
        description: The url to the image source that is used in the avatar.
        type: string
        optional: true

    -   name: status
        description: The status dot that is shown within the avatar. E.g. an online status.
        type: FluxColor
        optional: true

    -   name: status-icon
        description: An icon shown instead of the status dot, colored by the status. Requires status to be set.
        type: FluxIconName
        optional: true

    -   name: tabindex
        description: The tabindex of the button, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true
        
    -   name: type
        description: The pressable type of the avatar. Defaults to a non-interactive image.
        type: [ '"button"', '"link"', '"route"', '"none"' ]
        default: none
        optional: true

    -   name: href
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the button's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the button's type is set to route. This integrates with Vue Router.
        type: FluxTo
        optional: true
---

# Avatar

The avatar displays an image, initials, or an icon to represent a user or entity. It renders the appropriate content based on the props you provide.

::: render
render=../code/components/avatar/preview.vue
:::

::: tip
To display a person's name and title along with their avatar, consider using the [Persona](./persona) component.
:::

::: tip
The `status-icon` prop works together with `status`: the icon replaces the status dot and takes the status color, so `status` must be set for the icon to appear.
:::

::: tip Accessibility
When a `src` fails to load, the avatar automatically falls back to its initials or icon, so a broken image is never shown. The `role="img"` attribute is only applied when `type` is `none`; for interactive avatars (`button`, `link`, `route`) the underlying element keeps its native role.
:::

<FrontmatterDocs/>

## Examples

::: example Image with status || Avatars can include statuses to indicate conditions such as online status.
example=../code/components/avatar/image-with-status.vue
:::

::: example Status icon || Set a `status-icon` to replace the status dot with an icon, colored by the status, to convey richer presence states.
example=../code/components/avatar/status-with-icon.vue
:::

::: example Initials || In the absence of an image, avatars can default to using initials.
example=../code/components/avatar/initials.vue
:::

::: example Icon || When no image is available, you can use an icon as a fallback instead of initials.
example=../code/components/avatar/icon.vue
:::

## Used components

- [Icon](./icon)
