# Inbox

A two-pane mail client: a scrollable message list on the left and a reading pane on the right. The list combines a quick `FluxSegmentedControl` view switch, a searchable `FluxFilterBar`, and an `FluxItemStack` of richly composed rows — avatars, status badges and labels — while the reading pane renders the conversation as a `FluxComment` thread.

::: render
render=../../code/guide/patterns/inbox/preview.vue
:::

A `FluxSplitView` keeps the list and reader independently resizable. Each list row wraps a `FluxItem` in a `FluxClickablePane` so the whole row is a single click target that selects the active message. The reader header carries the sender's `FluxAvatar` and contextual actions; the body scrolls on its own inside a `FluxScroller`.

## Examples

::: example Conversation thread || A full reading pane: a `FluxNoticeStack` of status messages followed by a back-and-forth `FluxComment` thread that alternates between received and sent messages. Sender avatars fall back to initials, yours falls back to an icon.
example=../../code/guide/patterns/inbox/thread.vue
:::

::: example Virtualized message list || Thousands of messages rendered with `FluxVirtualScroller` for smooth scrolling, topped with a `FluxFader` that cross-fades through live notification headlines.
example=../../code/guide/patterns/inbox/virtual-list.vue
:::

## Used components

`FluxSplitView`, `FluxSplitViewPane`, `FluxScroller`, `FluxItem`, `FluxItemStack`, `FluxItemContent`, `FluxItemMedia`, `FluxItemActions`, `FluxClickablePane`, `FluxFilterBar`, `FluxFilterOption`, `FluxSegmentedControl`, `FluxSegmentedControlItem`, `FluxBadge`, `FluxChip`, `FluxAvatar`, `FluxComment`, `FluxNotice`, `FluxNoticeStack`, `FluxFader`, `FluxFaderItem`, `FluxVirtualScroller`, `FluxFlex`, `FluxSpacer`, `FluxSecondaryButton`, `FluxIcon`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`.
