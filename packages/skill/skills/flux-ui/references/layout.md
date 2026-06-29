# Layout & structure

Flux ships layout primitives so you compose structure with components rather than
raw CSS. Remember the naming quirk: the `Layout` path segment is **dropped** from
the export name (`layout/flex` → `FluxFlex`).

## Flex

```vue
<FluxFlex :direction="md ? 'horizontal' : 'vertical'" :gap="9">
  <!-- children, or FluxFlexItem for per-item control -->
</FluxFlex>
```

- `direction`: `"horizontal" | "vertical"`.
- `gap`: a **plain number in pixels** (`:gap="9"` renders `gap: 9px`). It is
  **not** a token-scale index.
- `align` (`FluxAlign`) and `justify` (`FluxJustify`) map to CSS
  `align-items` / `justify-content` (e.g. `align="center"`).
- `wrap` (`FluxFlexWrap`), `is-inline` (inline flex), and `tag` (render as a
  different element) round out the common props.
- `FluxFlexItem` wraps a child when you need item-level props.
- Stack helpers under `layout/flex/*` export as `Flux*Stack` (⚠ trap):
  `FluxActionStack`, `FluxBadgeStack`, `FluxButtonStack`, `FluxInfoStack`,
  `FluxNoticeStack`, `FluxTagStack`.

## Grid

`FluxGrid` + `FluxGridColumn` for column-based layouts. Exact column props on the
`layout/grid` doc page.

## Container & spacing

- `FluxContainer` — constrains content to a max width.
- `FluxSpacer` — flexible space that pushes siblings apart.
- `FluxSpacing` — explicit spacing helper.
- `FluxAspectRatio` — fixed aspect-ratio box (media).
- `FluxScroller` — managed scroll container.
- `FluxDivider` / `FluxSeparator` — visual separation.

## Split view

`FluxSplitView` + `FluxSplitViewPane` for resizable two-pane layouts (e.g.
list/detail). See the `layout/split-view` doc page.

## Adaptive / overflow

- `FluxAdaptiveGroup` + `FluxAdaptiveSlot` — show/collapse children based on
  available space (`useAdaptiveGroupInjection` for custom children).
- `FluxOverflowBar` — a bar that moves overflowing items into a menu.

## Pane as the surface primitive

For cards and grouped content, reach for `FluxPane` and its parts
(`FluxPaneHeader` / `FluxPaneBody` / `FluxPaneFooter`, plus `FluxPaneGroup`,
`FluxClickablePane` ⚠, `FluxPaneMedia`, `FluxPaneIllustration`, `FluxLayerPane`
(+ `FluxLayerPaneSecondary`)). Most doc examples place real content inside a
`FluxPaneBody`. For empty/loading states use `FluxPlaceholder` / `FluxSkeleton`.

For **list rows** use the item family (`FluxItem` + `FluxItemMedia` /
`FluxItemContent` / `FluxItemActions`, stacked in a `FluxItemStack`) — static rows
in a `FluxPane`, navigating rows as `FluxClickablePane` (one per row, not in a
shared stack). Copy-ready skeletons and the `FluxLayerPane` grouping:
`references/patterns.md` §5.

## Responsive logic

Drive responsive layout from `useBreakpoints()` (reactive `xs/sm/md/lg/xl` refs)
rather than CSS media queries when the change is structural (e.g. switching
`FluxFlex` direction). See `references/composables.md`.
