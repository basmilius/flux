---
outline: deep

props:
    -   name: is-grouped
        description: Renders a day separator above every entry whose `day` differs from the entry before it.
        type: boolean
        default: false
        optional: true

slots:
    -   name: default
        description: The entries of the feed, one FluxActivityFeedItem per entry.
---

# Activity feed

The activity feed shows who did what and when: an audit trail, the history of a ticket or the stream of a project. It renders its entries as a list and connects their markers with the same rail as the [Timeline](../timeline/).

::: render
render=../../code/components/activity-feed/preview.vue
:::

::: tip
Reach for the [Timeline](../timeline/) when you are telling a story: a shipping status, an onboarding flow, a roadmap. Reach for the activity feed when you are logging events: an actor, a short sentence and a timestamp, repeated many times.
:::

::: warning
The feed never formats a date. Both `when` and `date-time` are rendered as given, so the surrounding application decides whether an entry reads as `10:04`, `2 hours ago` or `13 March 2026`. Luxon is already a peer dependency of Flux, which makes `DateTime#toRelative()` and `DateTime#toISO()` a natural pair for these two props.
:::

<FrontmatterDocs/>

## Examples

::: example Basic || Every entry names its actor, what happened and when it happened.
example=../../code/components/activity-feed/basic.vue
:::

::: example System events || Entries without an actor use an icon and a color as their marker, which sets automated events apart from the ones people caused.
example=../../code/components/activity-feed/system.vue
:::

::: example Details || The `details` slot adds a body to an entry, for instance the comment that was left or the commits that were pushed.
example=../../code/components/activity-feed/details.vue
:::

::: example Grouped by day || Set `is-grouped` and give each entry a `day` label to separate the feed into days. The label is yours to format, the feed only compares it with the entry above.
example=../../code/components/activity-feed/grouped.vue
:::

## Used components

- [Activity feed item](./item)
- [Timeline](../timeline/)
