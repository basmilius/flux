---
outline: deep

emits:
    -   name: update:model-value
        description: The updated selected color.
        type: [ string ]

props:
    -   name: model-value
        description: The selected color.
        type: string
        optional: true

    -   name: colors
        description: The default set of colors that are shown as options.
        type: string[]
        optional: true

    -   name: is-custom-allowed
        description: If a custom color is allowed, the color picker is enabled and allows the user to select a custom color.
        type: boolean
        optional: true

requiredIcons:
    - ellipsis-h
---

<script
    lang="ts"
    setup>
    import { FluxColorSelect, FluxPane, FluxPaneBody } from '@basmilius/flux';
</script>

# Color select

This component allows users to select a color from a predefined set or choose a custom color using a color picker. It includes visual indications for selected and unselected colors, and supports additional actions in a flyout pane for advanced color selection.

<Preview>
    <FluxPane style="width: 390px">
        <FluxPaneBody>
            <FluxColorSelect is-custom-allowed/>
        </FluxPaneBody>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Snippet

```vue
<FluxColorSelect
    v-model="color"
    is-custom-allowed/>
```

## Used components

- [Button](./button)
- [Color picker](./color-picker)
- [Flyout](./flyout)
- [Icon](./icon)
- [Pane](./pane)
