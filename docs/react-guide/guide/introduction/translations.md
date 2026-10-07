# Translations

The React port does not yet have the locale integration of the original Flux packages. Several components currently render English labels directly.

`createTranslate(english)` returns a function that creates a translator for the supplied dictionary. It substitutes named parameters but does not select a locale or subscribe to locale changes.

```tsx
import { createTranslate } from '@flux-ui/react';

const useTranslate = createTranslate({greeting: 'Hello {name}'});

export function Greeting() {
    const translate = useTranslate();
    return <p>{translate('greeting', {name: 'Bas'})}</p>;
}
```

Locale providers, translated built-in labels and date formatting parity remain part of the [port work](/react/status).
