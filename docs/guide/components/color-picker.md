---
outline: deep

emits:
    -   name: update:model-value
        description: The updated selected color.
        type: [ "string | [number, number, number]" ]

props:
    -   name: model-value
        description: The selected color.
        type: [ "string", "[number, number, number]" ]
        optional: true

    -   name: is-alpha-enabled
        description: Enables the alpha slider.
        type: boolean
        optional: true

    -   name: type
        description: The color format used.
        type: [ '"hex"', '"rgb"', '"hsl"', '"hsv"' ]
        default: hex
        optional: true
---

<script
    lang="ts"
    setup>
    import { FluxColorPicker, FluxPane, FluxPaneBody } from '@basmilius/flux';
</script>

# Color picker

This component allows users to select and adjust colors in various formats, including HEX, RGB, HSV, and HSL. It features a hue and saturation slider, an optional alpha slider for transparency control, and input fields for precise value adjustments.

<Preview>
    <FluxPane style="width: 330px">
        <FluxColorPicker
            :model-value="[31, 75, 109]"
            type="rgb"/>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Snippet

```vue
<FluxColorPicker
    v-model="color"
    type="hex"/>
```

## Used components

- [Form field](./form/field)
- [Form input](./form/input)
- [Form slider](./form/slider)
