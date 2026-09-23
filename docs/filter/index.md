# Flux Filter

Flux Filter narrows down a data set. A filter menu lets a user pick a date, a range, one option or several, and keeps what they picked in a single state object you bind with `v-model`. `FluxFilter` shows those filters as a nested menu; `FluxFilterBar` puts them in a toolbar with a search field and a badge for every active filter.

::: render
render=../code/filter/components/filter/preview.vue
:::

## Highlights

- **One state object.** Every filter writes to its own key, so the state is a plain record you can put in the URL or send to an API.
- **Built-in filters.** Date, date range, a single option, several options and a numeric range, with async variants that fetch their options on demand.
- **Your own filters.** `defineFilter()` turns any component into a filter, with the label, icon and badge text it needs to sit next to the built-in ones.
- **Reset and clear.** A filter can carry a default value to reset to; clearing removes it from the state.

Start with [Filter](./components/filter) for the menu, or [Bar](./components/bar) for the toolbar.
