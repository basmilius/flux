<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxStack, showConfirm } from '@basmilius/flux';
    import { ref } from 'vue';

    const result = ref<boolean | null>(null);
    
    async function show(): Promise<void> {
        result.value = null;
        result.value = await showConfirm({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Are you sure?'
        });
    }
</script>

# Confirm

This function displays an confirm with the specified properties and waits for the confirm to be closed before resolving the promise.

<Preview>
    <FluxStack axis="horizontal" is-centered>
        <FluxSecondaryButton
            icon-before="circle-exclamation"
            label="Show confirm"
            @click="show()"/>
        <span v-if="result === true">✅</span>
        <span v-if="result === false">❌</span>
        <span v-if="result === null">🤔</span>
    </FluxStack>
</Preview>

::: warning
This feature requires a parent [Root](../root) component to function correctly, as it is responsible for rendering the confirm.
:::

## Signature

```typescript
function showConfirm(spec: FluxConfirmObject): Promise<void> {}
```

## FluxConfirmObject

- `id: number` &mdash; A unique identifier for the alert.
- `icon?: IconName` &mdash; (optional) The icon to be displayed in the alert.
- `message: string` &mdash; The message to be displayed in the alert.
- `title: string` &mdash; The title of the alert.

## Example

```typescript
showConfirm({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Are you sure?'
});
```
