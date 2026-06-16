<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="arrow-up-from-square"
                    icon-trailing="angle-right"
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
