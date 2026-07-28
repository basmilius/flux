---
outline: deep

props:
    -   name: title
        description: The title of the context, typically the name of the resource the user is viewing.
        type: string

    -   name: subtitle
        description: An optional subtitle shown below the title.
        type: string
        optional: true

    -   name: to
        description: The route to navigate to when the back button is pressed and the user is at the root level.
        type: FluxTo
        optional: true

    -   name: entry-to
        description: An override for the route registered as the entry point of this context. By default the closest matched named route is used.
        type: FluxTo
        optional: true

    -   name: href
        description: An external URL to navigate to when the back button is pressed and the user is at the root level.
        type: string
        optional: true

    -   name: rel
        description: The `rel` attribute applied to the back button when used as a link.
        type: string
        optional: true

    -   name: target
        description: The `target` attribute applied to the back button when used as a link.
        type: string
        optional: true

    -   name: tabindex
        description: The `tabindex` attribute applied to the back button.
        type: [ string, number ]
        optional: true

    -   name: icon
        description: An icon registered with the context. It is not rendered by the context header itself, but is available to anything that lists the contexts, such as `FluxApplicationMenuContextSwitcher`.
        type: FluxIconName
        optional: true

    -   name: type
        description: The pressable type applied to the back button when used as a link.
        type: FluxPressableType
        optional: true

requiredIcons:
    - angle-left
---

# Application menu context

The application menu context is the header of a context menu panel. It renders the title and subtitle of the current context together with a back button that either navigates to the parent level (when the user has drilled down through the context stack) or follows the route passed via `to`/`href` (when the user opened the context directly).

The back button decides which of the two it is by asking the parent `FluxApplication` how deep the context stack currently is, so the same markup works whether the context was reached by drilling down or opened straight from a URL.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu/context/snippet.vue [FluxApplicationMenuContext.vue]

:::

## Used components

- [Button](../../../components/button)
    - [Secondary](../../../components/button/secondary)
