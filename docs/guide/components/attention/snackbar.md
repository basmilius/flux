---
outline: deep

emits:
    -   name: action
        description: Triggered when an action is clicked.
        type: [ string ]

    -   name: close
        description: Triggered when the snackbar is closed.
        type: [ ]

props:
    -   name: actions
        description: The actions that are shown in the snackbar. As key-value pairs.
        type: Record<string, string>
        optional: true

    -   name: color
        description: The color of the snackbar.
        type: FluxColorVariant
        optional: true

    -   name: icon
        description: The icon that is shown at the start of the snackbar.
        type: FluxIconName
        optional: true

    -   name: is-closeable
        description: Allows the snackbar to be closed manually.
        type: boolean
        optional: true

    -   name: is-loading
        description: Adds a loading state at the start of the snackbar.
        type: boolean
        optional: true

    -   name: is-rendered
        description: Renders the snackbar inline instead of globally.
        type: boolean
        optional: true

    -   name: message
        description: The message of the snackbar.
        type: string
        optional: true

    -   name: progress-indeterminate
        description: Indicates that the progress bar is in an indeterminate state.
        type: bool
        optional: true

    -   name: progress-max
        description: Sets the max value of the progress bar.
        type: number
        optional: true

    -   name: progress-min
        description: Sets the min value of the progress bar.
        type: number
        optional: true

    -   name: progress-status
        description: Sets the status message of the progress bar.
        type: string
        optional: true

    -   name: progress-value
        description: Sets the value of the progress bar.
        type: number
        optional: true

    -   name: sub-message
        description: The sub-message of the snackbar.
        type: string
        optional: true

    -   name: title
        description: The title of the snackbar.
        type: string
        optional: true

requiredIcons:
    - xmark
---

# Snackbar

Snackbars are used to notify the user about tasks that have been or will be performed by the system. They can also include actions that the user can select.

::: render
render=../../../code/guide/components/attention/snackbar/preview.vue
:::

::: tip
For notifications that need prominence, consider using the [Notice](./notice) component.
:::

<FrontmatterDocs/>

## Functional API

Snackbars can be part of your template and controlled with `v-if`, but they also have an api that you can use within scripts.

::: render
render=../../../code/guide/components/attention/snackbar/functional.vue
:::

::: code-group

```ts [Example]
showSnackbar({
    color: 'success',
    duration: 3000,
    icon: 'circle-check',
    message: 'Changes saved successfully.'
});
```

```ts [Declaration]
declare function showSnackbar(options: FluxSnackbarObject): Promise<void>;
```

```ts [Options]
export type FluxSnackbarObject = {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: FluxColorVariant;
    readonly duration?: number;
    readonly icon?: FluxIconName;
    readonly isCloseable?: boolean;
    readonly isLoading?: boolean;
    readonly isRendered?: boolean;
    readonly message?: string;
    readonly progressIndeterminate?: boolean;
    readonly progressMax?: number;
    readonly progressMin?: number;
    readonly progressStatus?: string;
    readonly progressValue?: number;
    readonly subMessage?: string;
    readonly title?: string;

    onAction?(actionKey: string): void;
    onClose?(): void;
};
```

:::

## Examples

::: example Global || Snackbars render globally by-default.
example=../../../code/guide/components/attention/snackbar/global.vue
:::

::: example Actions || Actions can be added to the snackbar to request for input.
example=../../../code/guide/components/attention/snackbar/actions.vue
:::

## Used components

- [Action](../action)
- [Icon](../icon)
- [Progress bar](../progress-bar)
- [Spinner](../spinner)
