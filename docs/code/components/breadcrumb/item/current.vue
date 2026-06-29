<template>
    <Preview>
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
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
