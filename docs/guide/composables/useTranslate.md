# useTranslate

This composable resolves the strings the components render. A key the app translated through [vue-i18n](../introduction/translations) wins, and everything else falls back to the English dictionary that ships with `@flux-ui/components`, so a key path is never rendered as-is.

Use it in a component of your own to reach for a string Flux already carries, such as a cancel button or an empty state, instead of hard-coding it next to components that do follow the locale.

## Usage

```ts
import { useTranslate } from '@flux-ui/components';

const translate = useTranslate();

const cancel = translate('flux.cancel');
const summary = translate('flux.nSelected', {n: 3});
```

The second argument fills the placeholders in a string. Those are written as `{name}` and are replaced in the fallback as well, so a string reads correctly in an app that translated nothing.

::: tip
The key type is the dictionary itself, which means the editor autocompletes the available keys and a key that no longer exists fails to compile. The full list is on the [Translations](../introduction/translations) page.
:::

## Type declarations

```ts
type FluxTranslation = keyof typeof english;

type FluxTranslate = (
    key: FluxTranslation,
    params?: Record<string, string | number>
) => string;

declare function useTranslate(): FluxTranslate;
```
