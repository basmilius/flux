---
outline: deep

emits:
    -   name: click
        description: Triggered when the badge is clicked.
        type: [ MouseEvent ]

    -   name: delete
        description: Triggered when the delete button is clicked.
        type: [ ]

props:
    -   name: color
        description: The color of the badge.
        type: ColorVariant
        optional: true

    -   name: dot
        description: Shows a dot instead of an icon at the start of the badge.
        type: boolean
        optional: true

    -   name: icon
        description: The icon that is used in the badge.
        type: IconName
        optional: true

    -   name: is-clickable
        description: Indicates that the badge is clickable.
        type: boolean
        optional: true

    -   name: is-deletable
        description: Indicates that the badge is deletable.
        type: boolean
        optional: true

    -   name: is-loading
        description: Shows a loading state within the badge instead of the icon or dot.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the badge.
        type: string

requiredIcons:
    - xmark
---

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxBadgeStack } from '@basmilius/flux';
</script>

# Badge

The Badge component serves as a label for specific elements in the UI. It can be used, for example, to display the status of an order or highlight important information.

<Preview>
    <FluxBadgeStack>
        <FluxBadge label="Prospect"/>
        <FluxBadge
            color="danger"
            dot
            label="Attention"/>
        <FluxBadge
            color="success"
            icon="circle-check"
            label="Completed"/>
        <FluxBadge
            is-loading
            label="Running"/>
        <FluxBadge
            is-deletable
            label="Prospect"/>
    </FluxBadgeStack>
</Preview>

::: tip
Flux also has [Tags](./tag), which look similar to badges.
:::

<FrontmatterDocs/>

## Examples

### Basic

A basic badge can give more information about something else.

### Dot

A badge with a dot can be used to indicate status of something. For example the status of a server or the payment status of an order.

### Icon

Icons within badges can be used to improve the meaning of the badge. This can for example be used to display features of something.

### Loading

Badges with a loading state can be used to indicate that a row within a table is doing something, such as saving a particular row.
