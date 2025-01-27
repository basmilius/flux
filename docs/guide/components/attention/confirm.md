---
outline: deep

requiredIcons:
- circle-check
---

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showConfirm } from '@basmilius/flux';
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

<FluxPrimaryButton
    label="Show confirm"
    @click="show()"/>

<span v-if="result === true">✅ Accepted</span>
<span v-if="result === false">❌ Declined</span>
<span v-if="result === null">⌛️ Waiting for confirmation...</span>

::: code-group

```ts [Example]
const result = await showConfirm({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'Are you sure?'
});
```

```ts [Signature]
function showConfirm(spec: FluxConfirmObject): Promise<void> {}
```

```ts [Options]
type FluxConfirmObject = {
    readonly id: number;
    readonly icon?: IconName;
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
- [Pane](../pane/base)
- [Pane footer](../pane/footer)
- [Pane header](../pane/header)
- [Pane body](../pane/body)
- [Spacer](../spacer)
