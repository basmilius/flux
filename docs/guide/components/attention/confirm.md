---
outline: deep

requiredIcons:
    - circle-check
---

# Confirm

This function displays a confirm with the specified properties and waits for the confirm to be closed before resolving the promise.

::: render
render=../../../code/guide/components/attention/confirm/preview.vue
:::

::: warning
This feature requires a parent [Root](../root) component to function correctly, as it is responsible for rendering the confirm.
:::

<FrontmatterDocs/>

## Functional API

Confirms can only be shown from code. An [Overlay](../overlay) should be used if you want
to show a confirm from within your template.

::: render
render=../../../code/guide/components/attention/confirm/functional.vue
:::

::: code-group

```ts [Example]
const result = await showConfirm({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Are you sure?'
});
```

```ts [Declaration]
declare function showConfirm(spec: FluxConfirmObject): Promise<void>;
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
- [Spacer](../spacer)
