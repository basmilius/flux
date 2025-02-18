<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                command="⌘C"
                icon-leading="clone"
                label="Copy"/>

            <FluxMenuItem
                command="⌘V"
                icon-leading="clipboard"
                label="Paste"/>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
