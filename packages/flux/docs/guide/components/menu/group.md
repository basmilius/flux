---
outline: deep

props:
    -   name: is-horizontal
        description: Indicates that the items should flow horizontally.
        type: boolean
        optional: true
        
slots:
    -   name: default
        description: The content of the group.
---

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>

# Menu group

This component provides a container for grouping menu items, adjusting its orientation based on the `isHorizontal` prop. When set to horizontal, it applies a specific style; otherwise, it defaults to a vertical layout.

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
