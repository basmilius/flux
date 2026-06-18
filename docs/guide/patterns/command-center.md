# Command center & dialogs

A command center turns every action in your app into something searchable and keyboard-driven. This recipe pairs a global `FluxCommandPalette` — grouped, tabbed and sub-action aware — with a quick-command list, then layers the dialog surfaces that commands open onto: a windowed `FluxOverlay`, a confirmation overlay, and a contextual snackbar.

::: render
render=../../code/guide/patterns/command-center/preview.vue
:::

The palette is fed entirely through its `sources` prop, so navigation, actions and recent items stay declarative. Below it, a `FluxCommandPaletteGroup` header and a row of `FluxCommandPaletteItem` components mirror the palette's visual language for an always-visible quick-command shelf. Open the palette with the button (or wire up `has-keyboard-shortcut` for ⌘K) and activating any item raises a snackbar.

## Examples

::: example Dialog surfaces || Commands rarely act in isolation — they open things. A `FluxWindow` inside a `FluxOverlay` navigates from an action list to a detail view rendered through `FluxDynamicView`, a second overlay confirms a destructive action, and a `FluxSnackbar` reports the result.
example=../../code/guide/patterns/command-center/dialogs.vue
:::

::: example Quick action pane || A compact `FluxMenuPane` packs shortcuts, inline toggles and a badge into a single pane — ideal for a context menu or a popover triggered from a toolbar.
example=../../code/guide/patterns/command-center/quick-menu.vue
:::

## Used components

`FluxCommandPalette`, `FluxCommandPaletteGroup`, `FluxCommandPaletteItem`, `FluxOverlay`, `FluxWindow`, `FluxDynamicView`, `FluxSnackbar`, `FluxMenuPane`, `FluxMenu`, `FluxMenuGroup`, `FluxMenuItem`, `FluxMenuSubHeader`, `FluxPane`, `FluxPaneHeader`, `FluxPaneBody`, `FluxPaneFooter`, `FluxFlex`, `FluxIcon`, `FluxBadge`, `FluxToggle`, `FluxSeparator`, `FluxSpacer`, `FluxPrimaryButton`, `FluxSecondaryButton`.
