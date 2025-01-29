<template>
    <Preview>
        <FluxPane style="width: 300px">
            <FluxMenu>
                <FluxMenuItem
                    icon-after="angle-right"
                    icon-before="grid-2"
                    label="Dashboard"/>
            </FluxMenu>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
