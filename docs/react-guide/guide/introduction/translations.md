# Translations

Set `locale` and `messages` on `FluxRoot` to translate built-in labels and your own components. Message dictionaries can use dotted keys or nested objects.

```tsx
import {FluxRoot, FluxSecondaryButton, createTranslate} from '@flux-ui/react';
import {useState} from 'react';

const messages = {
    nl: {
        'flux.close': 'Sluiten',
        'flux.cancel': 'Annuleren',
        greeting: 'Hallo {name}'
    }
};
const useTranslate = createTranslate({greeting: 'Hello {name}'});

function Greeting() {
    const translate = useTranslate();
    return <p>{translate('greeting', {name: 'Bas'})}</p>;
}

export function App() {
    const [locale, setLocale] = useState('nl');
    return <FluxRoot locale={locale} messages={messages}>
        <Greeting/>
        <FluxSecondaryButton label="Switch language" onClick={() => setLocale(locale === 'nl' ? 'en' : 'nl')}/>
    </FluxRoot>;
}
```

Changing `locale` updates components using the provider. A locale such as `nl-NL` uses the `nl` dictionary if no `nl-NL` dictionary exists. Missing messages fall back to the component’s English dictionary, then to the key itself. Parameters such as `{name}` are replaced with their supplied values.

Use `FluxLocaleProvider` to override these settings for part of the tree without adding another root. `useFluxLocale()` reads the active locale, and `useFluxTranslate()` translates the built-in core labels.

To connect an existing translation library, pass `translate={(key, params) => ...}`. Return `undefined` for unknown keys to allow Flux’s dictionary fallback. The custom translator receives the parameters and handles their interpolation.
