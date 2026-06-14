<template>
    <Preview>
        <FluxBreadcrumb>
            <FluxBreadcrumbItem
                href="#"
                label="Library"/>

            <FluxBreadcrumbItem
                href="#"
                label="Components"/>

            <FluxBreadcrumbItem label="Breadcrumb" />
        </FluxBreadcrumb>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
