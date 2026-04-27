<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Programmatic dialogs

Flux ships two distinct ways of showing dialogs:

- **[`FluxOverlay`](../components/overlay)** — a template-driven container that you render conditionally with `v-if`. Best when the dialog has its own UI, lifecycle and interactions, or when it is tied to a route.
- **`showAlert` / `showConfirm` / `showPrompt` / `showSnackbar`** — imperative functions that mount a dialog from anywhere in your code. Best for short, ephemeral interactions that interrupt a user action.

This recipe lays out when to reach for which.

## When to use which

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Use case</FluxTableHeader>
                <FluxTableHeader>Reach for</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell>A complex form, a wizard, a deep-link target</FluxTableCell>
            <FluxTableCell><a href="../components/overlay"><code>FluxOverlay</code></a> (or <a href="../components/slide-over"><code>FluxSlideOver</code></a>)</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Confirm a destructive action ("Are you sure you want to delete?")</FluxTableCell>
            <FluxTableCell><a href="../components/attention/confirm"><code>showConfirm</code></a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Surface a one-off message after a save</FluxTableCell>
            <FluxTableCell><a href="../components/attention/snackbar"><code>showSnackbar</code></a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Ask the user for a single value (rename, enter URL, …)</FluxTableCell>
            <FluxTableCell><a href="../components/attention/prompt"><code>showPrompt</code></a></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Display a fatal error or terms acceptance</FluxTableCell>
            <FluxTableCell><a href="../components/attention/alert"><code>showAlert</code></a></FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

The rule of thumb: if the dialog has more than one input, or if it should survive a page reload (deep-linking), use a `FluxOverlay` driven by the router. Anything else is a programmatic dialog.

## Provider setup

All programmatic dialogs need a single [`FluxRoot`](../components/root) somewhere in your tree — typically wrapping your application. The functions throw if no root has been mounted.

```vue [App.vue]
<template>
    <FluxRoot>
        <RouterView/>
    </FluxRoot>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoot } from '@flux-ui/components';
</script>
```

## Confirm before deleting

`showConfirm` returns a `Promise<boolean>` that resolves to the user's choice. Combine it with `showSnackbar` for the success message:

```ts
import { showConfirm, showSnackbar } from '@flux-ui/components';

async function deleteProject(project: Project): Promise<void> {
    const confirmed = await showConfirm({
        icon: 'trash',
        title: 'Delete project',
        message: `Are you sure you want to delete "${project.name}"? This action cannot be undone.`
    });

    if (!confirmed) {
        return;
    }

    await api.deleteProject(project.id);

    showSnackbar({
        icon: 'circle-check',
        color: 'success',
        message: 'Project deleted.'
    });
}
```

## Prompt for a value

```ts
import { showPrompt } from '@flux-ui/components';

const name = await showPrompt({
    icon: 'pen',
    title: 'Rename workspace',
    message: 'Enter a new name for this workspace.',
    fieldLabel: 'Name',
    fieldPlaceholder: 'E.g. Acme Inc.'
});

if (name !== null) {
    await api.renameWorkspace(name);
}
```

`showPrompt` resolves to `null` when the user cancels.

## Snackbar with progress

`showSnackbar` returns a handle that lets you update the snackbar after it's mounted. Use it to surface long-running tasks:

```ts
import { showSnackbar } from '@flux-ui/components';

const snackbar = showSnackbar({
    icon: 'cloud-arrow-up',
    title: 'Uploading…',
    progressIndeterminate: true,
    isCloseable: false
});

await uploadFile(file, progress => {
    snackbar.update({
        progressIndeterminate: false,
        progressValue: progress,
        progressMax: 100,
        progressStatus: `${progress}%`
    });
});

snackbar.update({
    icon: 'circle-check',
    color: 'success',
    title: 'Uploaded',
    isCloseable: true
});
```

## Don't combine the two

Avoid mounting a `FluxOverlay` from inside a programmatic dialog handler — the overlay needs to be in your template tree to participate in the router. If you find yourself reaching for that combination, surface the overlay through a route instead and call `router.push` from the handler.
