---
outline: deep

props:
    -   name: appear
        description: Also plays the transition on the initial render.
        type: boolean
        optional: true

    -   name: delay
        description: The delay in milliseconds that every next item adds.
        type: number
        optional: true
        default: 30

    -   name: max
        description: The largest delay in milliseconds a single item can get, so a long list does not keep the visitor waiting.
        type: number
        optional: true
        default: 300

    -   name: tag
        description: The element that wraps the items.
        type: string
        optional: true
        default: div

slots:
    -   name: default
        description: The items that should be animated. Every item needs its own key.
---

# Stagger

The stagger transition fades a list in item by item, each one starting a fixed step after the one before it. Use it for content that arrives as a set, such as a notification list, search results or the cards on a dashboard.

::: render
render=../../code/components/transitions/stagger/preview.vue
:::

::: tip
Every item needs a `key`, the same as a Vue `TransitionGroup`. Items that move because another item was added or removed animate to their new place as well.
:::

::: info Only entering items are staggered
The delay counter restarts for every batch, so a single item added to a list that is already on screen appears right away instead of waiting for the items before it. Items that leave fade out at once, without holding their place in the layout. When the visitor prefers reduced motion, the items only fade and the stagger is dropped.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Every item starts 30 milliseconds after the one before it.
example=../../code/components/transitions/stagger/basic.vue
:::

::: example Cadence || A larger `delay` spreads the items further apart, while `max` keeps the last item from arriving too late.
example=../../code/components/transitions/stagger/delay.vue
:::

::: example Notifications || A list that grows and shrinks: the first render staggers, later arrivals appear right away.
example=../../code/components/transitions/stagger/notifications.vue
:::
