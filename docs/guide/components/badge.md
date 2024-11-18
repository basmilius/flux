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
    import BasicExample from '../../code/guide/components/badge/basic.vue';
    import DotExample from '../../code/guide/components/badge/dot.vue';
    import IconExample from '../../code/guide/components/badge/icon.vue';
    import LoadingExample from '../../code/guide/components/badge/loading.vue';
</script>

# Badge

The Badge component serves as a label for specific elements in the UI. It can be used, for example, to display the status of an order or highlight important information.

<Preview>
    <FluxBadgeStack>
        <FluxBadge label="Help wanted"/>
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
    </FluxBadgeStack>
</Preview>

::: tip
Flux also has [Tags](./tag), which look similar to badges.
:::

<FrontmatterDocs/>

## Examples

### Basic

A simple badge can deliver additional insights about an entity.

<Preview>
    <BasicExample/>
</Preview>

<<< @/code/guide/components/badge/basic.vue

### Dot

A dot badge is useful for indicating statuses, for instance, the status of a server.

<Preview>
    <DotExample/>
</Preview>

<<< @/code/guide/components/badge/dot.vue

### Icon

Including icons in badges can improve their clarity, for instance, indicating an app's release status.

<Preview>
    <IconExample/>
</Preview>

<<< @/code/guide/components/badge/icon.vue

### Loading

A loading state badge can signify that a table row is processing, for instance, retrieving data.

<Preview>
    <LoadingExample/>
</Preview>

<<< @/code/guide/components/badge/loading.vue

## Used components

- [Icon](./icon)
- [Spinner](./spinner)
