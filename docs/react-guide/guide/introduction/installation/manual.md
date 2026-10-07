# Installation

The React components live in `@flux-ui/react`. Core, application, AI, flow, statistics and visual components all use this entry point.

This branch is still under review. The commands below describe the package API; the local examples use the workspace package.

```sh
bun add @flux-ui/react react react-dom
```

Import the stylesheet once and place `FluxRoot` around your application. It renders the dialog and snackbar providers.

```tsx
import { createRoot } from 'react-dom/client';
import { FluxRoot } from '@flux-ui/react';
import '@flux-ui/react/style.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
    <FluxRoot>
        <App />
    </FluxRoot>
);
```

## Controlled inputs

Pass the current value and a change callback. Text inputs can report `null` when cleared, so normalize that when keeping a string in state.

```tsx
import { useState } from 'react';
import { FluxFormField, FluxFormInput } from '@flux-ui/react';

export function NameField() {
    const [name, setName] = useState('');

    return (
        <FluxFormField label="Name">
            <FluxFormInput
                value={name}
                onValueChange={value => setName(String(value ?? ''))}
            />
        </FluxFormField>
    );
}
```

Checkboxes and toggles use `checked` and `onCheckedChange`. Components with other controlled values document their callbacks in the props table.

## Children and render props

Use `children` for content. Named content is passed through props such as `before`, `after`, `header` and `footer`. Some props accept a function; use the signature on the component page.

```tsx
import { FluxFlyout, FluxSecondaryButton } from '@flux-ui/react';

export function Actions() {
    return (
        <FluxFlyout opener={({toggle}) => (
            <FluxSecondaryButton label="Actions" onClick={toggle} />
        )}>
            {({close}) => <FluxSecondaryButton label="Close" onClick={close} />}
        </FluxFlyout>
    );
}
```

## Icons

Register the icons your app and its components use with `fluxRegisterIcons`. See [Font Awesome](../font-awesome) and each component's required icons.

## Current support

The package declares React 18.3 or newer. This branch's tests run against React 19. Review [port status](/react/status) before depending on it in production.
