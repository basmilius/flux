---
outline: deep

emits:
    -   name: toggle
        description: Triggered when the expandable is being opened or closed.
        type: [ boolean ]

props:
    -   name: is-opened
        description: The state of the expandable.
        type: boolean
        optional: true

    -   name: label
        description: The label of the expandable header.
        type: string
        optional: true
        
slots:
    -   name: default
        description: The content of the expandable.
        
    -   name: header
        description: A custom header for the expandable.
        type:
            label: string
            isOpen: boolean
            close: "(): void"
            open: "(): void"
            toggle: "(): void"
        
    -   name: body
        description: A custom body for the expandable.
        type:
            label: string
            close: "(): void"

requiredIcons:
    - minus
    - plus
---

<script
    lang="ts"
    setup>
    import { FluxExpandable, FluxPane } from '@basmilius/flux';
</script>

# Expandable

This component provides a toggleable container for additional content. It consists of a header with a label and a body that holds the expandable content. When the header button is clicked, the body opens or closes to reveal or hide the content.

<Preview>
    <FluxPane>
        <FluxExpandable label="More options...">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa debitis deleniti dignissimos dolorem ducimus earum error facilis, fugit hic modi nulla odit praesentium rerum voluptate. Ipsum neque quasi sint?
        </FluxExpandable>
    </FluxPane>
</Preview>

::: tip
Multiple expandables can be grouped together using [Expandable Groups](./expandable-group).
:::

<FrontmatterDocs/>

## Examples

Todo

## Snippet

```vue
<FluxPane>
    <FluxExpandable label="More options...">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa debitis deleniti dignissimos dolorem ducimus earum error facilis, fugit hic modi nulla odit praesentium rerum voluptate. Ipsum neque quasi sint?
    </FluxExpandable>
</FluxPane>
```

## Used components

- [Icon](./icon)
