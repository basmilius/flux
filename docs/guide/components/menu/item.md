---
outline: deep

emits:
    -   name: click
        description: Triggered when the menu item is clicked.
        type: [ MouseEvent ]

    -   name: mouseenter
        description: Triggered when the menu item is being hovered.
        type: [ MouseEvent ]

    -   name: mouseleave
        description: Triggered when the menu item is not being hovered anymore.
        type: [ MouseEvent ]

props:
    -   name: type
        description: The type of menu item.
        type: [ '"button"', '"link"', '"route"' ]
        default: button
        optional: true

    -   name: disabled
        description: Disable the menu item.
        type: boolean
        optional: true

    -   name: icon-after
        description: The icon at the end of the menu item.
        type: IconName
        optional: true

    -   name: icon-before
        description: The icon at the start of the menu item.
        type: IconName
        optional: true

    -   name: is-loading
        description: Shows a loading state within the menu item instead of the icon at the start.
        type: boolean
        optional: true

    -   name: label
        description: The label that is shown in the menu item.
        type: string
        optional: true
        
    -   name: command
        description: The label of the menu item command.
        type: string
        optional: true

    -   name: command-icon
        description: The icon of the menu item command.
        type: string
        optional: true

    -   name: command-loading
        description: Enables the loading state of the command.
        type: boolean
        optional: true

    -   name: image-url
        description: An image that shows instead of the before icon.
        type: string
        optional: true

    -   name: is-active
        description: Indicates that the menu item is active.
        type: boolean
        optional: true

    -   name: is-destructive
        description: Indicates that the menu item is a destructive action.
        type: boolean
        optional: true

    -   name: is-highlighted
        description: Indicates that the menu item is highlighted.
        type: boolean
        optional: true

    -   name: is-indented
        description: Indicates that the menu item is indented (e.g. in a sub-menu structure).
        type: boolean
        optional: true

    -   name: is-selectable
        description: Indicates that the menu item is selectable.
        type: boolean
        optional: true

    -   name: is-selected
        description: Indicates that the menu item is selected. Only works if is-selectable is also enabled.
        type: boolean
        optional: true

    -   name: tabindex
        description: The tabindex of the menu item, works exactly the same as html.
        type: [ 'string', 'number' ]
        optional: true

    -   name: href
        description: This prop is enabled if the menu item's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: rel
        description: This prop is enabled if the menu item's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: target
        description: This prop is enabled if the menu item's type is set to link. It's the same as the <a> HTML element.
        type: string
        optional: true

    -   name: to
        description: This prop is enabled if the menu item's type is set to route. This integrates with Vue Router.
        type: To
        optional: true
---

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>

# Menu item

This component is designed to be a flexible menu item that fits into a navigation or action menu. It leverages the properties of buttons and can display icons, images, and commands to suit various needs.

You can customize it with different states like active, selected, or highlighted, and it's capable of handling click events. Its versatility makes it easy to integrate into any menu structure, enhancing the user experience with well-defined actions and options.

<Preview>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                icon-after="angle-right"
                icon-before="grid-2"
                label="Dashboard"/>
        </FluxMenu>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

Todo
