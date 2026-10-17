# Height transitions

Wrap conditional content in `FluxAutoHeightTransition`. It measures the child, keeps it mounted while closing and restores its natural height after opening. Use `show` or conditional React children to control visibility.

```tsx
import {FluxAutoHeightTransition} from '@flux-ui/react';

export function Details({open}: {open: boolean}) {
    return (
        <FluxAutoHeightTransition show={open}>
            <div style={{transition: 'height 390ms var(--swift-out)'}}>
                Content that determines its own height.
            </div>
        </FluxAutoHeightTransition>
    );
}
```

The transition uses the child's height transition. Flux expandable and collapsible components already supply that styling. Custom child components must forward DOM attributes to their root element.
