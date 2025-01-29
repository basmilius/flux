---
outline: deep

requiredIcons:
- circle-check
---

# Alert

This function displays an alert with the specified properties and waits for the alert to be closed before resolving the promise.

::: render
render=../../../code/guide/components/attention/alert/preview.vue
:::

::: tip
Alerts can interrupt the user by taking over the entire screen. Consider using a [Notice](./notice) or [Snackbar](./snackbar) for less intrusive notifications.
:::

::: warning
This feature requires a parent [Root](../root) component to function correctly, as it is responsible for rendering the alert.
:::

<FrontmatterDocs/>

## Functional API

Alerts can only be shown from code. An [Overlay](../overlay) should be used if you want
to show an alert from within your template.

::: render
render=../../../code/guide/components/attention/alert/functional.vue
:::

::: code-group

```ts [Example]
showAlert({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Hello world'
});
```

```ts [Signature]
function showAlert(spec: FluxAlertObject): Promise<void> {}
```

```ts [Options]
type FluxAlertObject = {
    readonly id: number;
    readonly icon?: IconName;
    readonly message: string;
    readonly title: string;

    onClose(): void;
};
```

:::

## Used components

- [Button](../button)
- [Overlay](../overlay)
- [Pane](../pane/base)
- [Pane footer](../pane/footer)
- [Pane header](../pane/header)
- [Pane body](../pane/body)
- [Spacer](../spacer)
