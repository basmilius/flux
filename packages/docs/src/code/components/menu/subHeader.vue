<template>
    <FluxPane style="max-width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuSubHeader label="Group 1"/>

                <FluxMenuItem
                    icon-before="circle"
                    label="Menu item 1"/>

                <FluxMenuItem
                    icon-before="circle"
                    label="Menu item 2"/>

                <FluxMenuItem
                    icon-before="circle"
                    label="Menu item 3"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuSubHeader label="Group 2"/>

                <FluxMenuItem
                    icon-before="circle"
                    label="Menu item 4"/>

                <FluxMenuItem
                    icon-before="circle"
                    label="Menu item 5"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuSubHeader, FluxPane, FluxSeparator } from '@fancee/flux';
</script>
