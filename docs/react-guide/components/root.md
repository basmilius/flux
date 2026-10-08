# Root

Mount one `FluxRoot` around your application. It renders the imperative dialogs and snackbar providers, and makes its content inert while a dialog is open. Declarative overlays and tooltips use their own React portals.

<FrontmatterDocs/>

## Snippet

```tsx
import { FluxRoot } from '@flux-ui/react';
export default function Example() {
    return (
        <>
            <FluxRoot></FluxRoot>
        </>
    );
}
```
