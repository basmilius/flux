<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, showAlert } from '@basmilius/flux';
    
    function show(): void {
        showAlert({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Hello world'
        });
    }
</script>

# Alert

This function displays an alert with the specified properties and waits for the alert to be closed before resolving the promise.

<Preview>
    <FluxSecondaryButton
        icon-before="circle-exclamation"
        label="Show alert"
        @click="show()"/>
</Preview>

::: tip
Alerts can interrupt the user by taking over the entire screen. Consider using a [Notice](./notice) or [Snackbar](./snackbar) for less intrusive notifications.
:::

::: warning
This feature requires a parent [Root](../root) component to function correctly, as it is responsible for rendering the alert.
:::

## Functional API

```ts
function showAlert(spec: FluxAlertObject): Promise<void> {}

interface FluxAlertObject {
    readonly id: number;
    readonly icon?: IconName;
    readonly message: string;
    readonly title: string;

    onClose(): void;
}
```

## Example

```typescript
showAlert({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Hello world'
});
```
