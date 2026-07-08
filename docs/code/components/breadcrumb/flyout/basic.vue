<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            icon="house"
            label="Home"/>

        <FluxBreadcrumbFlyout label="Acme Corporation">
            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="building"
                    is-active
                    label="Acme Corporation"/>

                <FluxMenuItem
                    icon-leading="building"
                    label="Globex"/>

                <FluxMenuItem
                    icon-leading="building"
                    label="Initech"/>
            </FluxMenuGroup>

            <FluxSeparator/>

            <FluxMenuGroup>
                <FluxMenuItem
                    icon-leading="plus"
                    label="New client"/>
            </FluxMenuGroup>
        </FluxBreadcrumbFlyout>

        <FluxBreadcrumbItem label="Website Redesign"/>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbFlyout, FluxBreadcrumbItem, FluxMenuGroup, FluxMenuItem, FluxSeparator } from '@flux-ui/components';
</script>
