<template>
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
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSeparator } from '@fancee/flux';
</script>
