<template>
    <FluxPane style="max-width: 300px">
        <FluxMenu is-large>
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
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@fancee/flux';
</script>
