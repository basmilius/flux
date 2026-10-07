# Filter

`FluxFilter` provides a controlled filter state to its child controls. Pass the state record as `value` and update it in `onValueChange`. Each control reads its entry by `name`.

The React implementation displays these controls directly. It does not build the nested window navigation of the original implementation. Initialize defaults in your state, and implement reset or clear by updating that state yourself.

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

Compose a controlled component with `value` and `onValueChange`. This example uses a flyout and menu items. It does not require a compile-time macro or Vite plugin. The compatibility `defineFilter` and injection helpers are not connected to the context used by the native React filter controls.

::: example Custom toggle filter || A controlled boolean filter composed from React components.
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
