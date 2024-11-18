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
        type: ColorVariant
        optional: true

    -   name: icon
        description: The icon that is shown at the start of the snackbar.
        type: IconName
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

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, FluxSnackbar, showSnackbar } from '@basmilius/flux';
    import ActionsExample from '../../../code/guide/components/attention/snackbar/actions.vue';
    import GlobalExample from '../../../code/guide/components/attention/snackbar/global.vue';

    function functionalExample(): void {
        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: 'Changes saved successfully.'
        });
    }
</script>

# Snackbar

Snackbars are used to notify the user about tasks that have been or will be performed by the system. They can also include actions that the user can select.

<Preview>
    <FluxSnackbar
        :actions="{update: 'Update', later: 'Later'}"
        icon="circle-arrow-up"
        message="A new version of macOS is available."
        title="Update available"
        is-rendered/>
</Preview>

::: tip
For notifications that need prominence, consider using the [Notice](./notice) component.
:::

<FrontmatterDocs/>

## Functional API

Snackbars can be part of your template and controlled with `v-if`, but they also have an api that you can use within scripts.

```ts
function showSnackbar(options: FluxSnackbarObject): Promise<void> {}
```

<Preview>
    <FluxPrimaryButton
        label="Show Snackbar"
        @click="functionalExample()"/>
</Preview>

```ts
showSnackbar({
    color: 'success',
    duration: 3000,
    icon: 'circle-check',
    message: 'Changes saved successfully.'
});

interface FluxSnackbarObject {
    readonly id: number;
    readonly actions?: Record<string, string>;
    readonly color?: ColorVariant;
    readonly duration?: number;
    readonly icon?: IconName;
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
}
```

## Examples

### Global

Snackbars render globally by-default.

<Preview>
    <GlobalExample/>
</Preview>

<<< @/code/guide/components/attention/snackbar/global.vue

### Actions

Actions can be added to the snackbar to request for input.

<Preview>
    <ActionsExample/>
</Preview>

<<< @/code/guide/components/attention/snackbar/actions.vue

## Used components

- [Action](../action)
- [Icon](../icon)
- [Progress bar](../progress-bar)
- [Spinner](../spinner)
