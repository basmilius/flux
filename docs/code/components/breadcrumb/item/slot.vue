<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            label="Library"/>

        <FluxBreadcrumbItem href="#">
            <em>Components</em>
        </FluxBreadcrumbItem>

        <FluxBreadcrumbItem label="Breadcrumb"/>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
