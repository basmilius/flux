<template>
    <FluxPane style="width: 300px">
        <FluxMenu>
            <FluxMenuGroup>
                <FluxMenuItem
                    command="⌘C"
                    icon-leading="clone"
                    label="Copy"/>

                <FluxMenuItem
                    command="⌘V"
                    icon-leading="clipboard"
                    label="Paste"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxPane } from '@flux-ui/components';
</script>
