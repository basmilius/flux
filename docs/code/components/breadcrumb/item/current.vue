<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            label="Library"/>

        <FluxBreadcrumbItem
            href="#"
            label="Components"/>

        <FluxBreadcrumbItem
            href="#"
            label="Breadcrumb"
            is-current/>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
