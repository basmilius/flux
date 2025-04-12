<template>
    <FluxPane style="width: 300px; padding-top: 9px;">
        <FluxMenu>
            <FluxMenuTitle title="Company name"/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="user"
                    label="Users"/>

                <FluxMenuItem
                    icon-leading="grid-2"
                    label="Dashboard layout"/>

                <FluxMenuItem
                    icon-leading="cloud"
                    label="Cloud runners"/>

                <FluxMenuItem
                    icon-leading="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="trash"
                    is-destructive
                    label="Deactivate"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuTitle, FluxPane, FluxSeparator } from '@flux-ui/components';
</script>
