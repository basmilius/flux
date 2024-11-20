---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected item changes.
        type: [ number ]

props:
    -   name: model-value
        description: The selected item index.
        type: number
        optional: true

    -   name: is-fill
        description: Allows the segmented control to fill in its parent.
        type: boolean
        optional: true

    -   name: items
        description: The items of the segmented control.
        type: FluxSegmentedControlItemObject[]
        optional: true
---

<script
    lang="ts"
    setup>
    import { FluxSegmentedControl } from '@basmilius/flux';
</script>

# Segmented control

This component is a UI element that allows users to choose between multiple options by selecting one of the multiple segments. Each segment is represented as a button with a distinct label, and the currently selected segment is visually indicated, for example, by a highlighted background. It is commonly used in navigation, forms, or settings, providing a compact and intuitive way for users to make a choice.

<Preview>
    <FluxSegmentedControl
        :items="[
            {icon: 'grid-2', label: 'Grid'},
            {icon: 'list', label: 'List'},
            {icon: 'rectangle-history', label: 'Stack'}
        ]"
        style="width: 390px"/>
</Preview>

<FrontmatterDocs/>

## Examples

Todo

## Types

```ts
type FluxSegmentedControlItemObject = {
    readonly icon?: IconName;
    readonly label?: string;
};
```

## Used components

- [Icon](./icon)
