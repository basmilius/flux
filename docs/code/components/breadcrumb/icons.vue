<template>
    <Preview>
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
                icon="file"
                label="Report"/>
        </FluxBreadcrumb>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
