<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="heart"
                    label="My liked videos"/>

                <FluxMenuItem
                    icon-leading="arrow-up-from-square"
                    label="My uploads"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
