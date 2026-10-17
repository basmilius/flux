# Focus trap

Use the `useFocusTrap` hook with a DOM ref. React has no template directive syntax.

```tsx
import { useRef } from 'react';
import { useFocusTrap } from '@flux-ui/react';

export function FocusRegion({active}: {active: boolean}) {
    const element = useRef<HTMLDivElement>(null);
    useFocusTrap(element, active);

    return (
        <div ref={element}>
            <button type="button">First action</button>
            <button type="button">Second action</button>
        </div>
    );
}
```

See [useFocusTrap](../composables/useFocusTrap) for the signature. Test focus entry, escape handling and focus restoration as part of your dialog or popup integration.
