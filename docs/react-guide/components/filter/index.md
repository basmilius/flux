# Filter

`FluxFilter` provides a controlled filter state to its child controls. Pass the state record as `value` and update it in `onValueChange`. Each control reads its entry by `name`.

The filter menu opens each control in a nested window with back navigation. Controls can supply `defaultValue`; the provider initializes missing values and exposes reset and clear actions.

::: render
render=../../code/components/filter/preview.vue
:::

<FrontmatterDocs/>

## Available filters

- [Date](./date)
- [Date range](./date-range)
- [Option](./option)
- [Options](./options)
- [Range](./range)
- [Async option](./async-option)
- [Async options](./async-options)
- [Filter bar](./bar)

## Custom filters

Use `useFilterInjection()` to read `state`, update an entry with `setValue(name, value)` and return to the menu with `back()`. Attach a `filterDefinition` factory created with `defineFilter` to your component so the provider can read its label, defaults and value summary. This uses ordinary React code and needs no compiler plugin.

::: example Custom toggle filter || A boolean filter using the shared filter context and definition factory.
example=../../code/components/filter/custom/preview.vue
:::

<<< @/code/components/filter/custom/MyToggleFilter.vue

## Examples

::: example Basic || Controlled filter values.
example=../../code/components/filter/full.vue
:::

::: example Flyout || Put filters in a flyout.
example=../../code/components/filter/flyout.vue
:::
