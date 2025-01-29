<template>
    <FluxPane style="width: 300px; padding-top: 9px;">
        <FluxMenu>
            <FluxMenuTitle title="Company name"/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="user"
                    label="Users"/>

                <FluxMenuItem
                    icon-before="grid-2"
                    label="Dashboard layout"/>

                <FluxMenuItem
                    icon-before="cloud"
                    label="Cloud runners"/>

                <FluxMenuItem
                    icon-before="rectangle-history"
                    label="History"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-before="trash"
                    is-destructive
                    label="Deactivate"/>
            </FluxMenuGroup>
        </FluxMenu>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxMenuTitle, FluxPane, FluxSeparator } from '@basmilius/flux';
</script>
