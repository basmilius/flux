<template>
    <div style="max-width: 360px">
        <FluxBreadcrumb collapse="middle">
            <FluxBreadcrumbItem
                href="#"
                icon="house"
                label="Home"/>

            <FluxBreadcrumbItem
                href="#"
                label="Clients"/>

            <FluxBreadcrumbItem
                href="#"
                label="Acme Corporation"/>

            <FluxBreadcrumbItem
                href="#"
                label="Projects"/>

            <FluxBreadcrumbItem
                href="#"
                label="Website Redesign"/>

            <FluxBreadcrumbItem label="Homepage"/>
        </FluxBreadcrumb>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
