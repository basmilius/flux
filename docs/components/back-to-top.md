---
outline: deep

props:
    -   name: label
        description: The accessible label of the button. Defaults to a translated "Back to top".
        type: string
        optional: true

    -   name: offset
        description: The scroll distance in pixels before the button appears.
        type: number
        default: 300
        optional: true

    -   name: position
        description: The bottom corner the button sits in. Logical, so it flips in right-to-left layouts.
        type: [ '"start"', '"end"' ]
        default: end
        optional: true

    -   name: target
        description: The scroll container to watch. Watches the document when omitted.
        type: HTMLElement
        optional: true

slots:
    -   name: default
        description: Replaces the button entirely. Bind cssClass on the replacement so it keeps its place.
        type:
            cssClass: string
            scrollToTop: "(): void"

requiredIcons:
    - arrow-up
---

# Back to top

The back to top button floats above the page once the reader has scrolled past a threshold and brings them back to the start of the page or of a scroll container.

::: render
render=../code/components/back-to-top/preview.vue
:::

::: tip
The button scrolls smoothly, unless the reader asked for reduced motion. It also resets focus afterwards, so the next tab press starts at the beginning of the content again. Give a scroll container a `tabindex="-1"` to get that for the container as well.
:::

::: warning
The button is positioned against the viewport. Give an ancestor of the button a `transform`, `filter` or `contain: paint` when it should sit in the corner of a scroll container instead.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Without a target the button watches the page itself, which is all a long article needs.
example=../code/components/back-to-top/basic.vue
:::

::: example Offset || Raise the offset when the button should only show up after a serious amount of scrolling.
example=../code/components/back-to-top/offset.vue
:::

::: example Scroll container || Point the button at a scroll container, for instance the results panel of a split view. The corner it sits in is configurable.
example=../code/components/back-to-top/scroll-container.vue
:::

::: example Custom button || The default slot replaces the button entirely. Bind the class it hands you so the replacement keeps its place.
example=../code/components/back-to-top/custom-button.vue
:::

## Used components

- [Button](./button)
    - [Secondary](./button/secondary)
- [Tooltip](./tooltip)
