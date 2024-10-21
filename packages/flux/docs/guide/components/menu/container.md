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
</script>

# Menu

This component serves as the base structure for creating menus. It displays its child elements vertically, making it perfect for side navigations or flyout menus. It offers basic accessibility features to ensure better user interaction.

It allows you to easily insert custom content and handles keyboard navigation to enhance functionality. With this component, you can build structured and flexible navigation menus without much hassle.

<Preview>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="grid-2"
                    label="Overview"/>
            </FluxMenuGroup>
            <FluxSeparator/>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="rocket"
                    label="Releases"/>
                <FluxMenuItem
                    icon-before="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>
            <FluxSeparator/>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="gear"
                    label="Settings"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

Todo
