# Font Awesome

Register icon definitions before rendering components. The React package maintains its own icon registry.

```tsx
import { fluxRegisterIcons, FluxIcon } from '@flux-ui/react';
import { faCircleCheck } from '@fortawesome/pro-regular-svg-icons';

fluxRegisterIcons({faCircleCheck});

export function SavedIcon() {
    return <FluxIcon name="circle-check" />;
}
```

Use the Font Awesome package licensed for your project. Register each icon listed under “Required icons” on the component pages, as well as icons passed through your own props.
