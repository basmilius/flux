# Component index

The complete public surface of `@flux-ui/components`, grouped as in the official
docs. Doc URLs follow `https://flux-ui.dev/components/<path>`.

> **Two global rules for this whole skill** (stated here, not repeated per
> section): (1) **Every export name is build-verified** against the package's
> build entry (`src/component/index.ts`) — exact named exports, not guesses.
> (2) Names are stable, but the library evolves — assume the **latest** 3.x
> (installed via `@latest`) and for exact **props/emits/slots/`v-model`** always
> read the component's doc page (each has the same `Props` / `Emits` / `Slots` /
> `Examples` layout).

Names look mechanical but several groups deviate from their doc path — those are
called out in SKILL.md §3 and marked **⚠** below.

## Actions

| Doc path      | Export          | Purpose |
| ------------- | --------------- | ------- |
| `action`      | `FluxAction`      | Single action element |
| `action-bar`  | `FluxActionBar`   | Bar of actions |
| `action-pane` | `FluxActionPane`  | Pane of actions |
| `pressable`   | `FluxPressable`   | Low-level pressable wrapper |
| `remove`      | `FluxRemove`      | Remove/delete affordance |
| `layout/flex/action` | `FluxActionStack` ⚠ | Row/stack of actions |

## Buttons

| Doc path                | Export                    | Purpose |
| ----------------------- | ------------------------- | ------- |
| `button`                | `FluxButton`              | Base button |
| `button/primary`        | `FluxPrimaryButton` ⚠     | Main action (use sparingly) |
| `button/secondary`      | `FluxSecondaryButton` ⚠   | Secondary action |
| `button/destructive`    | `FluxDestructiveButton` ⚠ | Dangerous/delete action |
| `button/group`          | `FluxButtonGroup`         | Joined button group |
| `button/split`          | `FluxSplitButton` ⚠       | Action + attached menu |
| `button/primary-link`   | `FluxPrimaryLinkButton` ⚠ | Link styled as primary button |
| `button/secondary-link` | `FluxSecondaryLinkButton` ⚠ | Link styled as secondary button |
| `button/publish`        | `FluxPublishButton`       | Publish action |
| `layout/flex/button`    | `FluxButtonStack` ⚠       | Lay several buttons in a row |

Button `type`: `"button" | "link" | "route" | "none"`. For `"link"` use
`href`/`rel`/`target`; for `"route"` use `:to` (`FluxTo`, Vue Router). Common
props: `label`, `icon-leading`, `icon-trailing`, `size`, `is-filled`,
`is-loading`, `is-submit`, `disabled`.

> **Use the named variants, not bare `FluxButton`.** `FluxButton` is the internal
> base and its public props type requires `cssClass`/`cssClassIcon`/`cssClassLabel`,
> so `<FluxButton>` fails type-check. Reach for `FluxPrimaryButton`,
> `FluxSecondaryButton`, `FluxDestructiveButton`, `FluxAction`, etc.

## Attention (dialogs & inline)

Programmatic functions live in `@flux-ui/components`; the rendered components are
internal to `FluxRoot`. See `references/dialogs-and-feedback.md`.

| Doc path             | Export / function           | Purpose |
| -------------------- | --------------------------- | ------- |
| `attention/alert`    | `showAlert`                 | Fatal error / forced acknowledgement |
| `attention/confirm`  | `showConfirm`               | Confirm a destructive action |
| `attention/prompt`   | `showPrompt`                | Ask for a single value |
| `attention/snackbar` | `showSnackbar` / `FluxSnackbar` | Transient toast/snackbar |
| `attention/notice`   | `FluxNotice`                | Inline notice block |
| `layout/flex/notice` | `FluxNoticeStack` ⚠         | Stack of notices |

## Forms (see references/forms.md for composition)

| Doc path                  | Export | Purpose |
| ------------------------- | ------ | ------- |
| `form`                    | `FluxForm` | Form wrapper |
| `form/field`              | `FluxFormField` | Label/hint/error wrapper for one control |
| `form/field/addition`     | `FluxFormFieldAddition` | One extra hint/error row |
| `form/input`              | `FluxFormInput` | Text input |
| `form/input/addition`     | `FluxFormInputAddition` | Inline input affix |
| `form/input/group`        | `FluxFormInputGroup` | Grouped inputs |
| `form/number-input`       | `FluxFormNumberInput` | Numeric text input |
| `form/text-area`          | `FluxFormTextArea` | Multi-line text |
| `form/select`             | `FluxFormSelect` | Select control |
| `form/select/async`       | `FluxFormSelectAsync` | Async-loaded select |
| `form/combobox`           | `FluxFormCombobox` | Combobox (input + filtered options) |
| `form/tags-input`         | `FluxFormTagsInput` | Tag/token entry input |
| `form/checkbox`           | `FluxFormCheckbox` | Single checkbox |
| `form/checkbox/group`     | `FluxFormCheckboxGroup` | Group of checkboxes |
| `form/radio/item`         | `FluxFormRadio` ⚠ | A single radio |
| `form/radio`              | `FluxFormRadioGroup` ⚠ | Radio group (the `index` page is the group) |
| `form/toggle`             | `FluxToggle` ⚠ | On/off switch (**no `Form`**) |
| `form/slider`             | `FluxFormSlider` | Single-value slider |
| `form/slider/ranged`      | `FluxFormRangeSlider` ⚠ | Range slider |
| `form/rating`             | `FluxFormRating` | Star/rating input |
| `form/quantity-selector`  | `FluxQuantitySelector` ⚠ | Stepper number input (**no `Form`**) |
| `form/pin-input`          | `FluxFormPinInput` | PIN/OTP entry |
| `form/date`               | `FluxFormDateInput` ⚠ | Date picker field |
| `form/date-range`         | `FluxFormDateRangeInput` ⚠ | Date range field |
| `form/date-time`          | `FluxFormDateTimeInput` ⚠ | Date + time field |
| `form/time`               | — (coming soon) | Time-only field not yet shipped |
| `form/time-zone-picker`   | `FluxFormTimeZonePicker` | Time-zone picker |
| `form/tree-view-select`   | `FluxFormTreeViewSelect` | Tree-structured select |
| `color/picker`            | `FluxColorPicker` | Color picker |
| `color/select`            | `FluxColorSelect` | Color select |
| `form/section`            | `FluxFormSection` | Titled form section |
| `form/row`                | `FluxFormRow` | Form row layout |
| `form/column`             | `FluxFormColumn` | Form column layout |
| `form/grid`               | `FluxFormGrid` | Form grid layout |

## Layout

The `Layout` path segment is **dropped** from the export name (⚠).

| Doc path                 | Export | Purpose |
| ------------------------ | ------ | ------- |
| `layout/flex`            | `FluxFlex` ⚠ | Flexbox container |
| `layout/flex/item`       | `FluxFlexItem` ⚠ | Flex child control |
| `layout/grid`            | `FluxGrid` ⚠ | Grid container |
| `layout/grid/column`     | `FluxGridColumn` ⚠ | Grid column |
| `layout/container`       | `FluxContainer` ⚠ | Max-width container |
| `layout/aspect-ratio`    | `FluxAspectRatio` ⚠ | Aspect-ratio box |
| `layout/scroller`        | `FluxScroller` ⚠ | Scroll container |
| `virtual-scroller`       | `FluxVirtualScroller` | Virtualised scroll container (large lists; no `layout/` prefix) |
| `layout/spacer`          | `FluxSpacer` ⚠ | Flexible space |
| `layout/spacing`         | `FluxSpacing` ⚠ | Spacing helper |
| `layout/sticky`          | `FluxSticky` ⚠ | Sticky positioning |
| `layout/split-view`      | `FluxSplitView` ⚠ | Resizable split view |
| `layout/split-view/pane` | `FluxSplitViewPane` ⚠ | Split-view pane |
| `divider`                | `FluxDivider` | Divider |
| `separator`              | `FluxSeparator` | Separator |
| `adaptive-group`         | `FluxAdaptiveGroup` | Adaptive overflow group |
| `adaptive-slot`          | `FluxAdaptiveSlot` | Adaptive slot |
| `overflow-bar`           | `FluxOverflowBar` | Overflowing toolbar/bar |

Flex "stack" helpers live under `layout/flex/*` but export as `Flux*Stack` (⚠):
`FluxActionStack`, `FluxBadgeStack`, `FluxButtonStack`, `FluxInfoStack`,
`FluxNoticeStack`, `FluxTagStack`.

## Panes & surfaces

| Doc path             | Export | Purpose |
| -------------------- | ------ | ------- |
| `pane`               | `FluxPane` | Card/surface primitive |
| `pane/header`        | `FluxPaneHeader` | Pane header |
| `pane/body`          | `FluxPaneBody` | Pane body |
| `pane/footer`        | `FluxPaneFooter` | Pane footer |
| `pane/group`         | `FluxPaneGroup` | Group of panes |
| `pane/clickable`     | `FluxClickablePane` ⚠ | Clickable pane (**variant to front**) |
| `pane/media`         | `FluxPaneMedia` | Media area in a pane |
| `pane/illustration`  | `FluxPaneIllustration` | Illustration area |
| `pane/layer-pane`    | `FluxLayerPane` / `FluxLayerPaneSecondary` | Layered pane (+ secondary layer) |
| `placeholder`        | `FluxPlaceholder` | Empty/placeholder state |
| `skeleton`           | `FluxSkeleton` | Loading skeleton |
| `root`               | `FluxRoot` | App-level wrapper (required for dialogs/tooltips) |

`FluxRoot` internally renders `FluxOverlayProvider`, `FluxSnackbarProvider`,
`FluxTooltipProvider` — these are exported but **not used directly**.

## Data display

| Doc path          | Export | Purpose |
| ----------------- | ------ | ------- |
| `table`           | `FluxTable` | Low-level table |
| `table/header`    | `FluxTableHeader` | Table header |
| `table/row`       | `FluxTableRow` | Table row |
| `table/cell`      | `FluxTableCell` | Table cell |
| `table/actions`   | `FluxTableActions` | Row actions |
| `table/bar`       | `FluxTableBar` | Table toolbar |
| `data-table`      | `FluxDataTable` | High-level data table |
| `pagination`      | `FluxPagination` | Pagination |
| `pagination/bar`  | `FluxPaginationBar` | Pagination bar |
| `kanban`          | `FluxKanban` | Kanban board |
| `kanban/column`   | `FluxKanbanColumn` | Kanban column |
| `kanban/item`     | `FluxKanbanItem` | Kanban card |
| `tree-view`       | `FluxTreeView` | Tree view |
| `timeline`        | `FluxTimeline` | Timeline |
| `timeline/item`   | `FluxTimelineItem` | Timeline entry |
| `calendar`        | `FluxCalendar` | Calendar |
| `calendar/item`   | `FluxCalendarItem` | Calendar entry |
| `date-picker`     | `FluxDatePicker` | Standalone date picker |
| `gallery`         | `FluxGallery` | Image gallery |
| `gallery/item`    | `FluxGalleryItem` | Gallery item |
| `item`            | `FluxItem` | List item |
| `item/content`    | `FluxItemContent` | Item content |
| `item/media`      | `FluxItemMedia` | Item media |
| `item/actions`    | `FluxItemActions` | Item actions |
| `item/stack`      | `FluxItemStack` | Stack of items |
| `description-list`      | `FluxDescriptionList` | Description list (term/detail pairs) |
| `description-list/item` | `FluxDescriptionItem` ⚠ | One entry (**`List` dropped**, not `…ListItem`) |
| `inline-edit`     | `FluxInlineEdit` | Inline-editable value |
| `comment`         | `FluxComment` | Comment block |
| `persona`         | `FluxPersona` | Person summary |
| `avatar`          | `FluxAvatar` | Avatar |
| `avatar-group`    | `FluxAvatarGroup` | Group of overlapping avatars |
| `progress-bar`    | `FluxProgressBar` | Progress bar |
| `spinner`         | `FluxSpinner` | Loading spinner |
| `ticks`           | `FluxTicks` | Tick marks |

## Navigation

| Doc path              | Export | Purpose |
| --------------------- | ------ | ------- |
| `breadcrumb`          | `FluxBreadcrumb` | Breadcrumb trail |
| `breadcrumb/item`     | `FluxBreadcrumbItem` | Breadcrumb item |
| `menu`                | `FluxMenu` | Menu |
| `menu/item`           | `FluxMenuItem` | Menu item |
| `menu/group`          | `FluxMenuGroup` | Menu group |
| `menu/options`        | `FluxMenuOptions` | Menu options block |
| `menu/collapsible`    | `FluxMenuCollapsible` | Collapsible menu section |
| `menu/title`          | `FluxMenuTitle` | Menu title |
| `menu/sub-header`     | `FluxMenuSubHeader` | Menu sub-header |
| `menu/flyout`         | `FluxMenuFlyout` | Menu in a flyout |
| `menu/pane`           | `FluxMenuPane` | Pane/surface inside a menu |
| `context-menu`        | `FluxContextMenu` | Right-click / context menu |
| `tabs`                | `FluxTabs` | Tabs |
| `tabs/tab`            | `FluxTab` | A tab |
| `tab-bar`             | `FluxTabBar` | Tab bar |
| `tab-bar/item`        | `FluxTabBarItem` | Tab bar item |
| `stepper`             | `FluxStepper` | Stepper/wizard |
| `stepper/steps`       | `FluxStepperSteps` | Stepper steps wrapper |
| `stepper/step`        | `FluxStepperStep` | Stepper step |
| `command-palette`     | `FluxCommandPalette` / `FluxCommandPaletteGroup` / `FluxCommandPaletteItem` | Command palette (⌘K) |
| `toolbar`             | `FluxToolbar` | Toolbar |
| `toolbar/group`       | `FluxToolbarGroup` | Toolbar group |
| `segmented-control`   | `FluxSegmentedControl` | Segmented control |
| `segmented-control/item` | `FluxSegmentedControlItem` | Segmented item |
| `link`                | `FluxLink` | Inline link |

## Overlays & transient surfaces

| Doc path     | Export | Purpose |
| ------------ | ------ | ------- |
| `overlay`    | `FluxOverlay` | Template-driven modal/dialog container |
| `slide-over` | `FluxSlideOver` | Slide-over panel |
| `flyout`     | `FluxFlyout` | Anchored popover/flyout |
| `tooltip`    | `FluxTooltip` | Tooltip |
| `window`     | `FluxWindow` | Multi-level popover/menu container — `#default="{ navigate }"` root + named sub-view slots (`#x="{ back }"`); used inside a `FluxFlyout` for drill-in menus (e.g. a profile menu) |
| `tour`       | `FluxTour` / `FluxTourItem` | Guided product tour; each step is a `FluxTourItem` (targets an element via `target`, optional `title`, step content in the default slot) |

## Small UI bits

| Doc path       | Export | Purpose |
| -------------- | ------ | ------- |
| `badge`        | `FluxBadge` / `FluxBadgeStack` ⚠ | Badge (+ stack) |
| `chip`         | `FluxChip` | Chip |
| `tag`          | `FluxTag` / `FluxTagStack` ⚠ | Tag (+ stack) |
| `info`         | `FluxInfo` / `FluxInfoStack` ⚠ | Info text (+ stack) |
| `icon`         | `FluxIcon` | Icon (Font Awesome name) |
| `boxed-icon`   | `FluxBoxedIcon` | Icon in a box |
| `disabled`     | `FluxDisabled` | Disabled-state wrapper |
| `expandable`   | `FluxExpandable` | Expand/collapse |
| `expandable/group` | `FluxExpandableGroup` | Accordion group |
| `drop-zone`    | `FluxDropZone` | File drop zone (scoped slot exposes `showPicker`) |
| `dynamic-view` | `FluxDynamicView` | Switchable view |
| `fader`        | `FluxFader` | Fade carousel |
| `fader-item`   | `FluxFaderItem` | Fade carousel item |
| `focal-point/editor` | `FluxFocalPointEditor` | Focal-point editor |
| `focal-point/image`  | `FluxFocalPointImage` | Focal-point image |

## Filter

| Doc path               | Export | Purpose |
| ---------------------- | ------ | ------- |
| `filter`               | `FluxFilter` | Filter root |
| `filter/bar`           | `FluxFilterBar` | Filter bar |
| `filter/option`        | `FluxFilterOption` | Single option filter |
| `filter/options`       | `FluxFilterOptions` | Multi-option filter |
| `filter/async-option`  | `FluxFilterOptionAsync` ⚠ | Async single option (**`Async` is a suffix**) |
| `filter/async-options` | `FluxFilterOptionsAsync` ⚠ | Async multi option |
| `filter/date`          | `FluxFilterDate` | Date filter |
| `filter/date-range`    | `FluxFilterDateRange` | Date-range filter |
| `filter/range`         | `FluxFilterRange` | Numeric range filter |

Custom filter controls read context via `useFilterInjection`; author reusable
filters with `defineFilter` (and the `defineFilterMacro` compile macro from the
`@flux-ui/components/vite` subpath). Root-exported helpers: `pickFilterCommon`,
`isFluxFilterOptionHeader`, `isFluxFilterOptionItem`.

## Visual (decorative — never load-bearing UI)

| Doc path                  | Export |
| ------------------------- | ------ |
| `visual/animated-colors`  | `FluxAnimatedColors` |
| `visual/border-beam`      | `FluxBorderBeam` |
| `visual/border-shine`     | `FluxBorderShine` |
| `visual/dot-pattern`      | `FluxDotPattern` |
| `visual/flickering-grid`  | `FluxFlickeringGrid` |
| `visual/grid-pattern`     | `FluxGridPattern` |

Use sparingly for hero/empty states; never as functional UI.

## Transitions (Vue transition components)

Base URL `https://flux-ui.dev/components/transitions/<name>`.

| Export | Notes |
| ------ | ----- |
| `FluxAutoHeightTransition` | Animate height changes (no doc page — internal helper) |
| `FluxAutoWidthTransition`  | Animate width changes (no doc page — internal helper) |
| `FluxBreakthroughTransition` | `transitions/breakthrough` |
| `FluxFadeTransition`         | `transitions/fade` |
| `FluxOverlayTransition`      | `transitions/overlay` |
| `FluxRouteTransition`        | `transitions/route` |
| `FluxSlideOverTransition`    | `transitions/slide-over` |
| `FluxTooltipTransition`      | `transitions/tooltip` |
| `FluxVerticalWindowTransition` | `transitions/vertical-window` |
| `FluxWindowTransition`       | `transitions/window` |

Use these to animate Flux surfaces consistently rather than hand-rolling
`<Transition>`.
