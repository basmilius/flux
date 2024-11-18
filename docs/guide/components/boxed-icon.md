---
outline: deep

emits:
    -   name: click
        description: Triggered when the icon is clicked.
        type: [ MouseEvent ]

props:
    -   name: size
        description: The size of the icon.
        type: [ number, string ]
        optional: true

    -   name: variant
        description: The icon variant.
        type: IconName
---

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxStack } from '@basmilius/flux';
</script>

# Boxed icon

This component displays a single customizable Font Awesome icon, rendered as SVG in a box.

<Preview>
    <FluxStack
        axis="horizontal"
        :gap="15">
        <FluxBoxedIcon
            :size="90"
            variant="circle-check"/>
        <FluxBoxedIcon
            :size="90"
            variant="lock"/>
        <FluxBoxedIcon
            :size="90"
            variant="rocket"/>
    </FluxStack>
</Preview>

<FrontmatterDocs/>

## Used components

- [Icon](./icon)
