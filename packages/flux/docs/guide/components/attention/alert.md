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

## Signature

```typescript
function showAlert(spec: FluxAlertObject): Promise<void> {}
```

## FluxAlertObject

- `id: number` &mdash; A unique identifier for the alert.
- `icon?: IconName` &mdash; The icon to be displayed in the alert.
- `message: string` &mdash; The message to be displayed in the alert.
- `title: string` &mdash; The title of the alert.

## Example

```typescript
showAlert({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Hello world'
});
```
