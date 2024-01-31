<template>
    <FluxPane style="max-width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
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
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane, FluxSeparator } from '@fancee/flux';
</script>
