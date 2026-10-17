# Dark mode

Flux uses CSS color schemes for its design tokens. Set the `dark` attribute on the document element to switch the whole app, or set `colorScheme` on a section to preview a theme locally.

```tsx
import { useState } from 'react';
import { FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/react';

export function ThemePreview() {
    const [dark, setDark] = useState(false);

    return (
        <section style={{colorScheme: dark ? 'dark' : 'light'}}>
            <FluxPane>
                <FluxPaneBody>
                    <FluxSecondaryButton
                        label={dark ? 'Use light mode' : 'Use dark mode'}
                        onClick={() => setDark(value => !value)}
                    />
                </FluxPaneBody>
            </FluxPane>
        </section>
    );
}
```

For an app-wide toggle, update `document.documentElement.toggleAttribute('dark', dark)` in an effect. To follow the operating system, use CSS:

```css
:root {
    color-scheme: light dark;
}
```
