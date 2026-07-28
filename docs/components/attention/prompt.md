---
outline: deep

requiredIcons:
    - circle-check
---

# Prompt

This function displays a prompt with the specified properties and waits for the input to be entered before resolving the promise. The promise resolves to the entered text, or to `false` when the prompt is cancelled.

::: render
render=../../code/components/attention/prompt/preview.vue
:::

::: warning Requires FluxRoot
Prompts render through a parent [`<FluxRoot>`](../root). Without one in your app, nothing appears and no error is thrown.
:::

<FrontmatterDocs/>

## Functional API

Prompts can only be shown from code. An [Overlay](../overlay) should be used if you want
to show a prompt from within your template.

::: render
render=../../code/components/attention/prompt/functional.vue
:::

The `id`, `onCancel` and `onConfirm` properties of `FluxPromptObject` are filled in by the store, so they are omitted from the spec you pass in.

::: code-group

```ts [Example]
const result = await showPrompt({
    icon: 'circle-exclamation',
    title: 'Title',
    message: 'What is your name?',
    fieldLabel: "Name"
});
```

```ts [Declaration]
declare function showPrompt(spec: Omit<FluxPromptObject, 'id' | 'onCancel' | 'onConfirm'>): Promise<string | false>;
```

```ts [Options]
type FluxPromptObject = {
    readonly id: number;
    readonly icon?: FluxIconName;
    readonly message: string;
    readonly title: string;
    readonly fieldLabel: string;
    readonly fieldPlaceholder?: string;
    readonly fieldType?: FluxInputType;

    onCancel(): void;
    onConfirm(text: string): void;
};
```

:::

## Used components

- [Button](../button)
- [Form](../form)
    - [Field](../form/field)
    - [Input](../form/input)
- [Overlay](../overlay)
- [Pane](../pane)
    - [Body](../pane/body)
    - [Footer](../pane/footer)
    - [Header](../pane/header)
- [Spacer](../layout/spacer)
