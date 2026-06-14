<template>
    <Preview>
        <FluxBreadcrumb>
            <FluxBreadcrumbItem
                href="#"
                label="Home"/>

            <FluxBreadcrumbItem
                href="#"
                label="Users"/>

            <FluxBreadcrumbItem
                href="#"
                label="Bas Milius"/>

            <FluxBreadcrumbItem label="Profile"/>
        </FluxBreadcrumb>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
