---
outline: deep

requiredIcons:
    - circle-check
---

# Confirm

This function displays a confirm with the specified properties and waits for the confirm to be closed before resolving the promise. The promise resolves to `true` when the confirm is accepted and to `false` when it is cancelled.

::: render
render=../../code/components/attention/confirm/preview.vue
:::

::: warning Requires FluxRoot
Confirms render through a parent [`<FluxRoot>`](../root). Without one in your app, nothing appears and no error is thrown.
:::

<FrontmatterDocs/>

## Functional API

Confirms can only be shown from code. An [Overlay](../overlay) should be used if you want
to show a confirm from within your template.

::: render
render=../../code/components/attention/confirm/functional.vue
:::

The `id`, `onCancel` and `onConfirm` properties of `FluxConfirmObject` are filled in by the store, so they are omitted from the spec you pass in.

::: code-group

```ts [Example]
const result = await showConfirm({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Are you sure?'
});
```

```ts [Declaration]
declare function showConfirm(spec: Omit<FluxConfirmObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<boolean>;
```

```ts [Options]
type FluxConfirmObject = {
    readonly id: number;
    readonly icon?: FluxIconName;
    readonly message: string;
    readonly title: string;

    onCancel(): void;
    onConfirm(): void;
};
```

:::

## Used components

- [Button](../button)
- [Overlay](../overlay)
- [Pane](../pane)
    - [Body](../pane/body)
    - [Footer](../pane/footer)
    - [Header](../pane/header)
- [Spacer](../layout/spacer)
