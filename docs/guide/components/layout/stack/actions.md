---
outline: deep

slots:
    -   name: default
        description: The action buttons or other interactive elements to display.
---

# Actions

Actions is a horizontal container for action buttons with built-in keyboard navigation. It uses a focus zone to enable arrow key navigation between child elements, making it accessible for keyboard users.

<FrontmatterDocs/>

## Snippet

```vue
<template>
    <FluxActions>
        <FluxPrimaryButton label="Save"/>
        <FluxSecondaryButton label="Cancel"/>
        <FluxDestructiveButton label="Delete"/>
    </FluxActions>
</template>

<script
    setup
    lang="ts">
    import { FluxActions, FluxPrimaryButton, FluxSecondaryButton, FluxDestructiveButton } from '@flux-ui/components';
</script>
```

## Used components

- [Stack](./)
