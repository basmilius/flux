---
outline: deep

props:
    -   name: placeholder
        description: Custom placeholder text for the search input.
        type: string
        optional: true

    -   name: sources
        description: The data sources that provide items to the command palette.
        type: FluxCommandSource[]
        required: true

emits:
    -   name: select
        description: Emitted when an item is activated.
        args:
            -   name: item
                type: FluxCommandSourceItem

expose:
    -   name: open
        description: Opens the command palette.

    -   name: close
        description: Closes the command palette.
---

# Command Palette

A searchable command palette that can be opened with `⌘K` (Mac) or `Ctrl+K` (Windows/Linux). It provides quick access to navigation, actions, and entity search through a unified interface.

Items are organized through sources, where each source represents a group of related items. Sources can optionally appear as horizontal tabs for scoped filtering. Items within a source can have sub-actions, which are shown after selecting the item.

::: render
render=../../code/guide/components/command-palette/basic.vue
:::

<FrontmatterDocs/>

## Sources

Sources are the core building blocks of the command palette. Each source has a `key`, `label`, and a list of `items`. Set `tab: true` to show the source as a tab in the tab bar. Set `global: true` to make the source visible across all tabs.

```ts
type FluxCommandSource = {
    readonly key: string;
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly tab?: boolean;
    readonly global?: boolean;
    readonly items: FluxCommandSourceItem[];
};
```

## Items

Each item has a label, optional icon, and an `onActivate` callback. Items can also have a `command` string (e.g. `⌘D`) displayed as a keyboard shortcut badge, and `subActions` for secondary actions.

```ts
type FluxCommandSourceItem = {
    readonly id: string | number;
    readonly label: string;
    readonly subLabel?: string;
    readonly icon?: FluxIconName;
    readonly command?: string;
    readonly subActions?: FluxCommandSubAction[];
    readonly onActivate: () => void;
};
```

## Sub-actions

When an item has `subActions`, selecting it will show a sub-action menu instead of immediately activating the item. This is useful for entities that have multiple possible actions, such as "View", "Edit", or "Delete".

```ts
type FluxCommandSubAction = {
    readonly label: string;
    readonly icon?: FluxIconName;
    readonly onActivate: () => void;
};
```

## Examples

::: example Basic || A basic command palette with navigation and actions. Press `⌘K` or click the button to open.
example=../../code/guide/components/command-palette/basic.vue
:::

::: example Multiple sources || A command palette with multiple sources, tabs, and sub-actions.
example=../../code/guide/components/command-palette/with-sources.vue
:::

::: example Complex || A full-featured command palette with navigation, entity search, standalone actions with sub-menus (Theme, Language, Export), recent items, and keyboard shortcut badges.
example=../../code/guide/components/command-palette/complex.vue
:::

## Keyboard shortcuts

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open / close the command palette |
| `↑` / `↓` | Navigate through items |
| `←` / `→` | Navigate through tabs (when search is empty) |
| `Enter` | Activate the highlighted item |
| `Escape` | Close the palette, or exit sub-actions |
| `Backspace` | Go back one breadcrumb level (when search is empty) |
