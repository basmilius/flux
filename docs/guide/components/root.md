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
