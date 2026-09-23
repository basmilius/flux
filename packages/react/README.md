# @flux-ui/react

Native React components for Flux UI. The package lives alongside the Vue packages, uses the same design tokens and styles, and has no Vue runtime dependency.

[Open the React showcase](https://flux-ui.dev/react/) or run it locally with `bun run showcase`.

## Install

```sh
bun add @flux-ui/react react react-dom
```

Import the stylesheet once at the application entry point:

```tsx
import "@flux-ui/react/style.css";
```

Wrap the application in `FluxRoot` when using imperative dialogs or snackbars:

```tsx
import { FluxRoot } from "@flux-ui/react";

export function App() {
    return <FluxRoot>{/* routes and application content */}</FluxRoot>;
}
```

## Example

```tsx
import { FluxFormField, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneHeader, FluxPrimaryButton } from "@flux-ui/react";

export function Profile() {
    return (
        <FluxPane>
            <FluxPaneHeader title="Profile" subtitle="Update your details" />
            <FluxPaneBody>
                <FluxFormField label="Display name">
                    <FluxFormInput placeholder="Ada Lovelace" />
                </FluxFormField>
                <FluxPrimaryButton label="Save" isSubmit />
            </FluxPaneBody>
        </FluxPane>
    );
}
```

React event props follow React conventions (`onClick`, `onValueChange`, `onCheckedChange`). Named Vue slots are represented as React props such as `before`, `after`, and `end`; the default slot is `children`.

## Package coverage

The React package contains native ports of the complete public Flux surface:

- Core components, forms, navigation, tables, trees, Kanban, calendars, filters, overlays, dialogs, notifications, and utilities
- Application shell components
- AI conversation, prompt, streaming Markdown, reasoning, tool-call, and usage components
- Flow editor nodes, handles, edges, viewport controls, routing, geometry, and layout utilities
- Statistics charts, legends, trackers, KPIs, and chart option/conversion utilities
- Visual highlighters, connectors, effects, and media components
- Shared types, color constants, hooks, focus helpers, input masks, transitions, and stores

The package entry point is checked against every public export of `@flux-ui/components`, `@flux-ui/application`, `@flux-ui/ai`, `@flux-ui/flow`, `@flux-ui/statistics`, `@flux-ui/visuals`, `@flux-ui/internals`, and `@flux-ui/types` with `bun run audit:exports`.

## Vue-to-React conventions

Component names remain the same. The default slot becomes `children`; named slots become node or render props such as `before`, `after`, `header`, and `opener`. Events follow React conventions such as `onClick`, `onValueChange`, and `onCheckedChange`. Vue two-way bindings become a controlled value plus its change callback.

For example, an imperative dialog can be opened from any event handler below `FluxRoot`:

```tsx
import { FluxPrimaryButton, showConfirm } from "@flux-ui/react";

export function DeleteButton() {
    async function remove() {
        if (await showConfirm({ title: "Delete item?", message: "This cannot be undone." })) {
            // Delete the item.
        }
    }

    return <FluxPrimaryButton label="Delete" onClick={remove} />;
}
```

## Development

```sh
bun run audit:exports
bun run test
bun run build
```

The Vite build emits ESM, CSS, source maps, and TypeScript declarations in `dist`.
