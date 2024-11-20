---
outline: deep

slots:
    - name: default
      description: The buttons within the group.
---

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxSecondaryButton } from '@basmilius/flux';
</script>

# Button group

This component groups multiple buttons together. It modifies the border radius of the buttons and removes any gaps between them.

<Preview>
    <FluxButtonGroup>
        <FluxSecondaryButton label="Left"/>
        <FluxSecondaryButton label="Center"/>
        <FluxSecondaryButton label="Right"/>
    </FluxButtonGroup>
</Preview>

<FrontmatterDocs/>

## Snippet

```vue
<FluxButtonGroup>
    <FluxSecondaryButton label="Left"/>
    <FluxSecondaryButton label="Center"/>
    <FluxSecondaryButton label="Right"/>
</FluxButtonGroup>
```
