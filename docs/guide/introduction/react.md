# React

Flux UI includes a native React package alongside its Vue packages. It shares the same component names, design tokens, Sass modules, and public package APIs without depending on the Vue runtime.

[Open the interactive React showcase](/react/).

## Installation

```sh
bun add @flux-ui/react react react-dom
```

Load the compiled stylesheet once and render the application below `FluxRoot`:

```tsx
import { FluxRoot } from "@flux-ui/react";
import "@flux-ui/react/style.css";

export function App() {
    return <FluxRoot>{/* application content */}</FluxRoot>;
}
```

`FluxRoot` hosts imperative dialogs and notifications. Components that do not use those APIs can also be rendered independently.

## Migrating a component

Imports move to one package entry point:

```tsx
import { FluxFormField, FluxFormInput, FluxPrimaryButton } from "@flux-ui/react";
```

Keep the existing Flux component names and translate Vue template conventions into React props:

- The default slot becomes `children`.
- Named slots become node props or render props such as `before`, `after`, `header`, and `opener`.
- Events use React names such as `onClick`, `onValueChange`, and `onCheckedChange`.
- Two-way bindings become controlled props plus a change callback.
- Injection APIs are exposed as React providers, contexts, and hooks.

```tsx
export function NameField() {
    return (
        <FluxFormField label="Name">
            <FluxFormInput value="Ada" onValueChange={(value) => console.log(value)} />
        </FluxFormField>
    );
}
```

## Package coverage

`@flux-ui/react` includes the public component, hook, utility, data, and type surfaces from the core components, Application, AI, Flow, Statistics, Visuals, Internals, and Types packages. Flow and Statistics integrations keep their native third-party engines while exposing React lifecycle and rendering behavior.

See the package README for examples and development commands.
