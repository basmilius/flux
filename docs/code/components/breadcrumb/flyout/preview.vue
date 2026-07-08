<template>
    <Preview>
        <FluxBreadcrumb>
            <FluxBreadcrumbItem
                href="#"
                icon="house"
                label="Home"/>

            <FluxBreadcrumbFlyout label="Acme Corporation">
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
            </FluxBreadcrumbFlyout>

            <FluxBreadcrumbItem label="Website Redesign"/>
        </FluxBreadcrumb>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbFlyout, FluxBreadcrumbItem, FluxMenuItem } from '@flux-ui/components';
</script>
