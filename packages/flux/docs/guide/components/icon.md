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
    import { FluxIcon, FluxStack } from '@basmilius/flux';
</script>

# Icon

This component displays a single customizable Font Awesome icon, rendered as SVG. It is commonly used in various Flux components, including [Buttons](./button), and can be easily styled with CSS.

Please refer to [Font Awesome](../introduction/font-awesome) to read more about the usage of icons.

There is also a [Boxed icon](./boxed-icon) variant available.

<Preview>
    <FluxStack
        axis="horizontal"
        :gap="36">
        <FluxIcon
            :size="48"
            variant="circle-check"/>
        <FluxIcon
            :size="48"
            variant="lock"/>
        <FluxIcon
            :size="48"
            variant="rocket"/>
    </FluxStack>
</Preview>

<FrontmatterDocs/>
