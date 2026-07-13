---
outline: deep

slots:
    -   name: default
        description: Your application markup.
---

# Root

Some Flux features render into a shared root element instead of inline where you use them. `<FluxRoot>` provides that element and hosts the providers for [tooltips](./tooltip), [overlays](./overlay), [slide-overs](./slide-over), [snackbars](./attention/snackbar) and the programmatic [alerts](./attention/alert), [confirms](./attention/confirm) and [prompts](./attention/prompt). Wrap your application in a single `<FluxRoot>` near its entry point.

::: warning
Without a `<FluxRoot>` in your app these features silently do nothing: the call succeeds and the component mounts, but nothing is rendered and no error is thrown.
:::

<FrontmatterDocs/>

## Providers

FluxRoot internally renders the following provider components. These are not used directly, but are required for certain features to work:

- **FluxOverlayProvider** renders stacked [alerts](./attention/alert), [confirms](./attention/confirm) and [prompts](./attention/prompt) from the global store, and is the mount target that [overlays](./overlay) and [slide-overs](./slide-over) teleport into.
- **FluxSnackbarProvider** renders [snackbars](./attention/snackbar) with transition animations.
- **FluxTooltipProvider** renders [tooltips](./tooltip) with intelligent positioning relative to their trigger element.

::: tip
These providers are automatically included when you use FluxRoot. You do not need to import or configure them separately.
:::

## Snippet

```vue [App.vue]
<template>
    <FluxRoot>
        <!-- Your application -->
    </FluxRoot>
</template>

<script
    setup
    lang="ts">
    import { FluxRoot } from '@flux-ui/components';
</script>
```
