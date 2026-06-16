<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="grid-2"
                        icon-trailing="angle-right"
                        label="Dashboard"/>
                </FluxMenuGroup>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
