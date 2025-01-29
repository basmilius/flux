<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showPrompt } from '@basmilius/flux';
    import { ref } from 'vue';

    const result = ref<string | null>(null);
    
    async function show(): Promise<void> {
        result.value = null;
        result.value = await showPrompt({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'What is your name?',
            fieldLabel: 'Name'
        });
    }
</script>

# Prompt

This function displays a prompt with the specified properties and waits for the input to be entered before resolving the promise.

::: render
render=../../../code/guide/components/attention/prompt/preview.vue
:::

::: warning
This feature requires a parent [Root](../root) component to function correctly, as it is responsible for rendering the prompt.
:::

<FrontmatterDocs/>

## Functional API

Prompts can only be shown from code. An [Overlay](../overlay) should be used if you want
to show a prompt from within your template.

<FluxPrimaryButton
    label="Show prompt"
    @click="show()"/>

<span v-if="result">{{ result }}</span>
<span v-else-if="result === false">❌ Canceled</span>
<span v-else>⌛️ Waiting for prompt...</span>

::: code-group

```ts [Example]
const result = await showPrompt({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'What is your name?',
    fieldLabel: "Name"
});
```

```ts [Signature]
function showPrompt(spec: FluxPromptObject): Promise<void> {}
```

```ts [Options]
type FluxPromptObject = {
    readonly id: number;
    readonly icon?: IconName;
    readonly message: string;
    readonly title: string;
    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: InputType;

    onCancel(): void;
    onConfirm(text: string): void;
};
```

:::

## Used components

- [Button](../button)
- [Form field](../form/field)
- [Form input](../form/input)
- [Overlay](../overlay)
- [Pane](../pane/base)
- [Pane footer](../pane/footer)
- [Pane header](../pane/header)
- [Pane body](../pane/body)
- [Spacer](../spacer)
