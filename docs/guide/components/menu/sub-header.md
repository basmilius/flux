---
outline: deep

props:
    -   name: icon-after
        description: Icon at the end of the sub header.
        type: IconName
        optional: true
        
    -   name: icon-before
        description: Icon at the start of the sub header.
        type: IconName
        optional: true
        
    -   name: label
        description: Label of the sub header.
        type: string
---

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>

# Menu sub header

This component is used for creating subheaders within menus. It can display an optional icon before and after the label, making it easy to visually separate different sections of a menu.

The label text is prominently displayed, and the subheader plays a role in organizing menu items into more digestible and structured sections. This component helps enhance the readability and usability of complex menus by providing clear visual breaks.

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
                <FluxMenuSubHeader label="Releases"/>
                <FluxMenuItem
                    icon-before="rocket"
                    label="Production"/>
                <FluxMenuItem
                    icon-before="cloud"
                    label="Cloud building"/>
                <FluxMenuItem
                    icon-before="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>
            <FluxSeparator/>
            <FluxMenuGroup>
                <FluxMenuSubHeader label="Manage"/>
                <FluxMenuItem
                    icon-before="gear"
                    label="Settings"/>
                <FluxMenuItem
                    icon-before="trash"
                    is-destructive
                    label="Delete"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

Todo
