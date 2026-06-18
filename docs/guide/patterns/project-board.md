# Project board

A project board turns a backlog into a glanceable, draggable workflow: columns for each stage, and cards that pack priority, labels, activity and assignees into a single tile. This recipe composes the kanban, card and contextual-action components into one board you can drag, open and extend.

::: render
render=../../code/guide/patterns/project-board/preview.vue
:::

Each column is a `FluxKanbanColumn`, and every card is a `FluxKanbanItem` wrapped in a `FluxContextMenu` so a right-click exposes card actions. Inside the card, `FluxFlex` lays out a priority `FluxBadge`, a `FluxChip` branch reference, a `FluxTagStack` of labels, a `FluxBadgeStack` of activity counters and a `FluxAvatarGroup` of assignees. Interactive children render with `type="none"` so the whole card stays a single drag target. Drag a card and the `@move` handler reorders the underlying data.

## Examples

::: example Card detail || A `FluxSlideOver` opened from a button. The body uses the full `FluxItem` family — `FluxItemStack`, `FluxItemMedia`, `FluxItemContent` and `FluxItemActions` — to list assignees, each removable through a `FluxRemove` button.
example=../../code/guide/patterns/project-board/card-detail.vue
:::

::: example Quick add || A `FluxClickablePane` "add card" tile with no nested interactive elements, paired with a `FluxDropZone` for attachments. A `FluxFlyout` hint sits alongside the zone, and dropped files surface as deletable `FluxTag`s.
example=../../code/guide/patterns/project-board/quick-add.vue
:::

## Used components

`FluxKanban`, `FluxKanbanColumn`, `FluxKanbanItem`, `FluxContextMenu`, `FluxMenu`, `FluxMenuGroup`, `FluxMenuItem`, `FluxSeparator`, `FluxFlyout`, `FluxSlideOver`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`, `FluxItem`, `FluxItemStack`, `FluxItemMedia`, `FluxItemContent`, `FluxItemActions`, `FluxClickablePane`, `FluxDropZone`, `FluxPlaceholder`, `FluxAvatar`, `FluxAvatarGroup`, `FluxBadge`, `FluxBadgeStack`, `FluxTag`, `FluxTagStack`, `FluxChip`, `FluxRemove`, `FluxFlex`, `FluxSpacer`, `FluxIcon`, `FluxPrimaryButton`, `FluxSecondaryButton`.
