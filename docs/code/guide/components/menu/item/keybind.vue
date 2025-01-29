<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuItem
                command="⌘C"
                icon-before="clone"
                label="Copy"/>

            <FluxMenuItem
                command="⌘V"
                icon-before="clipboard"
                label="Paste"/>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuItem, FluxPane } from '@basmilius/flux';
</script>
