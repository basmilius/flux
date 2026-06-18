# Data management

A management table is more than rows and columns: it combines bulk selection, inline editing, contextual actions and faceted filtering. This recipe assembles the `FluxTable` family with form controls and the filter components into one editable screen.

::: render
render=../../code/guide/patterns/data-management/preview.vue
:::

Each row carries a `FluxFormCheckbox`; selecting any row reveals a `FluxTableBar` with a `FluxSplitButton` for bulk actions. The product name is a `FluxInlineEdit`, stock is a `FluxQuantitySelector`, and status is a `FluxBadge` — every cell is interactive without ever nesting one clickable element inside another.

> For a server-driven `FluxDataTable` wired to a `FluxFilterBar`, see [Filterable data table](./filterable-data-table).

## Examples

::: example Faceted filters || A `FluxFilter` popover combining every filter type — single and multi option (sync and async), date, date range and a formatted range — plus standalone `FluxPagination`.
example=../../code/guide/patterns/data-management/filters.vue
:::

::: example Category tree || A `FluxTreeView` category browser with a `FluxContextMenu` — right-click a node for actions.
example=../../code/guide/patterns/data-management/categories.vue
:::

## Used components

`FluxTable`, `FluxTableRow`, `FluxTableHeader`, `FluxTableCell`, `FluxTableActions`, `FluxTableBar`, `FluxPaginationBar`, `FluxPagination`, `FluxFormCheckbox`, `FluxInlineEdit`, `FluxQuantitySelector`, `FluxSplitButton`, `FluxSecondaryButton`, `FluxAction`, `FluxBoxedIcon`, `FluxBadge`, `FluxTag`, `FluxTagStack`, `FluxChip`, `FluxFilter`, `FluxFilterOption`, `FluxFilterOptions`, `FluxFilterOptionAsync`, `FluxFilterOptionsAsync`, `FluxFilterDate`, `FluxFilterDateRange`, `FluxFilterRange`, `FluxContextMenu`, `FluxTreeView`, `FluxMenu`, `FluxMenuGroup`, `FluxMenuItem`, `FluxSeparator`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`, `FluxFlex`, `FluxFlexItem`, `FluxIcon`.
