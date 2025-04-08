<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuItem
                    icon-leading="grid-2"
                    icon-trailing="angle-right"
                    label="Dashboard"/>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@flux-ui/flux';
</script>
