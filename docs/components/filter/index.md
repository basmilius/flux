---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the filter state changes.
        type: [ FluxFilterState ]

    -   name: clear
        description: Triggered when a filter's value is cleared via the trash button. Receives the name of the cleared filter.
        type: [ string ]

    -   name: reset
        description: Triggered when a filter is reset to its default value. Receives the name of the reset filter.
        type: [ string ]

props:
    -   name: model-value
        description: The filter state.
        type: FluxFilterState

slots:
    -   name: default
        description: This slot should contain filters or a separator.

requiredIcons:
    - angle-left
    - angle-right
    - circle-check
    - magnifying-glass
    - rotate-left
    - trash
---

# Filter

This component enables the creation of nested filter menus with support for state management, navigation, and optional reset functionality. It uses height transitions for smooth visual changes and dynamically organizes filter content based on provided slots, making it adaptable to varying needs.

::: render
render=../../code/components/filter/preview.vue
:::

::: tip
Don't make your view too complex. Limit yourself to one filter per view.
:::

<FrontmatterDocs/>

::: tip
Looking for a toolbar-style filter with a search input? See [Filter bar](./bar).
:::

## Available filters

- [Date](./date)
- [Date range](./date-range)
- [Option](./option)
- [Options](./options)
- [Range](./range)
- [Async option](./async-option)
- [Async options](./async-options)

## Common props

Every filter component (built-in and custom) accepts the following props in addition to its own:

<p><code><strong>default-value</strong>?: FluxFilterValue</code><br>
Initial value applied when state is <code>undefined</code>. Reset returns to this value.</p>

<p><code><strong>disabled</strong>?: boolean</code><br>
Filter is shown but not interactive.</p>

<p><code><strong>on-change</strong>?: (value: FluxFilterValue) =&gt; void</code><br>
Called after the filter's value mutates.</p>

<p><code><strong>on-clear</strong>?: () =&gt; void</code><br>
Called when the filter is reset.</p>

## Custom filter types

Build your own filter component by calling `defineFilter()` on the top level of `<script setup>`. The macro registers a factory that `FluxFilter` and `FluxFilterBar` invoke to obtain the filter's runtime metadata (label, icon, badge text, lifecycle, …). The component name does not matter — any component that calls `defineFilter()` is accepted.

::: warning Vite plugin required
`defineFilter()` is a compile-time macro. Add the plugin from `@flux-ui/components/vite` to your Vite config — without it the call is left as a no-op and the filter will not register.

```ts [vite.config.ts]
import { defineFilterMacro } from '@flux-ui/components/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        defineFilterMacro(),
        vue()
    ]
});
```
:::

::: example Custom toggle filter || Defining a boolean toggle filter using `defineFilter`.
example=../../code/components/filter/custom/preview.vue
:::

The toggle component above is implemented like this:

::: code-group

<<< @/code/components/filter/custom/MyToggleFilter.vue [MyToggleFilter.vue]
<<< @/code/components/filter/custom/preview.vue [Usage]

:::

## Examples

::: example Basic || A basic example of the filter.
example=../../code/components/filter/full.vue
:::

::: example Flyout || A filter that pops up when you press on a button.
example=../../code/components/filter/flyout.vue
:::

## Used components

- [Menu](../menu)
    - [Group](../menu/group)
    - [Item](../menu/item)
- [Window](../window)
