---
outline: deep

slots:
    -   name: default
        description: Your application markup.
---

# Root

Some functionality of Flux require a root element where other elements can be injected into. This component should be used as the main component of your application.

Alerts, confirms and snackbars are all rendered here for example.

<FrontmatterDocs/>

## Providers

FluxRoot internally renders the following provider components. These are not used directly, but are required for certain features to work:

- **FluxOverlayProvider** — Renders stacked [alerts](./attention/alert), [confirms](./attention/confirm) and [prompts](./attention/prompt) from the global store.
- **FluxSnackbarProvider** — Renders [snackbars](./attention/snackbar) with transition animations.
- **FluxTooltipProvider** — Renders [tooltips](./tooltip) with intelligent positioning relative to their trigger element.

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
