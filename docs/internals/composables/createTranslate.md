# createTranslate

This function builds the composable a package translates its own strings with. It is handed the English dictionary that ships with the package and returns a `useTranslate` style composable, so every Flux package resolves its strings the same way without repeating the lookup.

A key is looked up in the app's [vue-i18n](../../guide/introduction/translations) messages first and falls back to the dictionary when the app did not translate it. That fallback is what keeps a component from ever rendering a raw key path, which is also why a package ships its English strings in source instead of a locale file.

## Usage

```ts
import { createTranslate } from '@flux-ui/internals';

const english = {
    'flux.example.cancel': 'Cancel',
    'flux.example.nSelected': '{n} selected'
} as const;

export default createTranslate(english);
```

```ts
const translate = useExampleTranslate();

translate('flux.example.cancel');
translate('flux.example.nSelected', {n: 3});
```

The dictionary types the keys, so an editor autocompletes them while any other string is still accepted. That is what lets `@flux-ui/statistics` call `createTranslate()` without a dictionary and put the series, slice and axis names it is given through the same lookup: a name that is not a known key comes back unchanged.

::: warning Composition API mode required
The returned composable reads `useI18n({useScope: 'global'})`, so the app's i18n instance has to be created with `legacy: false`. Call it in a component's setup, the same as any other composable.
:::

Placeholders are written as `{name}` and are filled from the second argument, in the app's translation as well as in the English fallback.

## Type declarations

```ts
type TranslateParams = Record<string, string | number>;

type TranslateFunction<K extends string> = (
    key: K | (string & {}),
    params?: TranslateParams
) => string;

export declare function createTranslate<T extends Record<string, string>>(
    english?: T
): () => TranslateFunction<keyof T & string>;
```
