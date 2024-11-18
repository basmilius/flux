<template>
    <FluxPane>
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="grid-2"
                    label="Menu item"/>
            </FluxMenuGroup>

            <FluxMenuGroup>
                <FluxMenuItem
                    v-for="i of 3"
                    :is-highlighted="i === 1"
                    icon-before="grid-2"
                    label="Menu item"/>
            </FluxMenuGroup>

            <FluxMenuGroup>
                <FluxMenuItem
                    v-for="_ of 2"
                    icon-before="grid-2"
                    label="Menu item"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
