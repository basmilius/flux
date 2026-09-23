# useTranslate

Returns the function every Flux package translates its own strings with. A key is looked up in the app's [vue-i18n](../../guide/introduction/translations) messages first and falls back to the English Flux ships, so a string the app did not translate still reads as English instead of a key path.

The dictionary behind it holds the keys of every package, split into one file per package under `src/data/i18n`. A component that wants a string from another package, or a [custom filter](../../filter/components/filter#custom-filter-types) that wants `flux.cancel`, can reach it through the same function.

## Usage

```ts
import { useTranslate } from '@flux-ui/internals';

const translate = useTranslate();

translate('flux.cancel');
translate('flux.nSelected', {n: 3});
```

::: warning Composition API mode required
It reads `useI18n({useScope: 'global'})`, so the app's i18n instance has to be created with `legacy: false`. Call it in a component's setup, the same as any other composable.
:::

## Type declarations

```ts
type FluxTranslation = keyof typeof english;
type FluxTranslate = (key: FluxTranslation, params?: Record<string, string | number>) => string;

declare function useTranslate(): FluxTranslate;
```
