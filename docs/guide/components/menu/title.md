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
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuTitle, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>

# Menu title

This component is used to display a title within a menu. The title is highlighted, enhancing the visual structure of the menu by clearly indicating different sections or overall context. This simple yet effective component ensures that users can easily identify the purpose or category of the menu items that follow.

<Preview>
    <FluxPane style="width: 300px; padding-top: 9px;">
        <FluxMenu>
            <FluxMenuTitle title="Manage"/>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="user"
                    label="Users"/>
                <FluxMenuItem
                    icon-before="grid-2"
                    label="Dashboard layout"/>
                <FluxMenuItem
                    icon-before="cloud"
                    label="Cloud runners"/>
                <FluxMenuItem
                    icon-before="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>
            <FluxSeparator/>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="trash"
                    is-destructive
                    label="Deactivate"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</Preview>

<FrontmatterDocs/>

## Examples

Todo
