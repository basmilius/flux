<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxStack, showPrompt } from '@basmilius/flux';
    import { ref } from 'vue';

    const result = ref<string | null>(null);
    
    async function show(): Promise<void> {
        result.value = null;
        result.value = await showPrompt({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'What is your name?',
            fieldLabel: "Name"
        });
    }
</script>

# Prompt

This function displays a prompt with the specified properties and waits for the input to be entered before resolving the promise.

<Preview>
    <FluxStack axis="horizontal" is-centered>
        <FluxSecondaryButton
            icon-before="circle-exclamation"
            label="Show prompt"
            @click="show()"/>
        <span v-if="result">{{ result }}</span>
        <span v-else>🤔</span>
    </FluxStack>
</Preview>

::: warning
This feature requires a parent [Root](../root) component to function correctly, as it is responsible for rendering the prompt.
:::

## Functional API

```ts
function showPrompt(spec: FluxPromptObject): Promise<void> {}

interface FluxPromptObject {
    readonly id: number;
    readonly icon?: IconName;
    readonly message: string;
    readonly title: string;
    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: InputType;

    onCancel(): void;
    onConfirm(text: string): void;
}
```

## Example

```typescript
showPrompt({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'What is your name?',
    fieldLabel: "Name"
});
```
