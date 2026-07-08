<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            icon="house"
            label="Home"/>

        <FluxBreadcrumbItem
            href="#"
            icon="folder"
            label="Projects"/>

        <FluxBreadcrumbItem
            icon="file-lines"
            label="Report"/>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
