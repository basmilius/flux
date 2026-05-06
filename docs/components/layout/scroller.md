---
outline: deep

props:
    -   name: direction
        description: The scrollable axis.
        type: '''horizontal'' | ''vertical'' | ''both'''
        optional: true
        default: vertical

    -   name: has-fade
        description: Apply a fade-mask at the scrollable edges that disappears when the user reaches the start or end.
        type: boolean
        optional: true

    -   name: snap
        description: Enable scroll-snap on the main axis.
        type: '''mandatory'' | ''proximity'''
        optional: true

    -   name: snap-align
        description: Align direct children to the snap points (sets `scroll-snap-align` on direct children).
        type: '''start'' | ''center'' | ''end'''
        optional: true

    -   name: tag
        description: The HTML tag to use for the scroller.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

slots:
    -   name: default
        description: The scrollable content.
---

# Scroller

A scroll container with custom scrollbar styling, optional fade-mask at the edges, and scroll-snap support. Use it inside fixed-size parents (panes, sidebars, modals) where the default browser scrollbar feels out of place.

::: render
render=../../code/components/layout/scroller/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Vertical || A vertical scroller with custom scrollbar.
example=../../code/components/layout/scroller/vertical.vue
:::

::: example Horizontal || A horizontal scroller, useful for card rails.
example=../../code/components/layout/scroller/horizontal.vue
:::

::: example Snap || Combine `direction` and `snap` to create snap-scrolling lists.
example=../../code/components/layout/scroller/snap.vue
:::

::: example Fade || Use `has-fade` to fade out content as it approaches the scrollable edges.
example=../../code/components/layout/scroller/fade.vue
:::
