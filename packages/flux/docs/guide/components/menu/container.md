---
outline: deep

props:
    -   name: is-large
        description: Enables a larger mode for the menu.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The content of the menu.
---

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@basmilius/flux';
    import BasicExample from '../../../code/guide/components/menu/container/basic.vue';
    import PaneExample from '../../../code/guide/components/menu/container/pane.vue';
</script>

# Menu

This component serves as the base structure for creating menus. It displays its child elements vertically, making it perfect for side navigations or flyout menus. It offers basic accessibility features to ensure better user interaction.

It allows you to easily insert custom content and handles keyboard navigation to enhance functionality. With this component, you can build structured and flexible navigation menus without much hassle.

<Preview>
    <FluxPane style="width: 300px">
        <BasicExample/>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

### Basic

A basic menu that consists of a few items.

<Preview>
    <BasicExample style="width: 270px"/>
</Preview>

<<< @/code/guide/components/menu/container/basic.vue

### Pane

Panes have first class support for menus inside them. Place a menu directly inside a Pane to create a contained menu.

<Preview>
    <PaneExample style="width: 270px"/>
</Preview>

<<< @/code/guide/components/menu/container/pane.vue
