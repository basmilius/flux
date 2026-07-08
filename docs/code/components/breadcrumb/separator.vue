<template>
    <FluxBreadcrumb separator="slash-forward">
        <FluxBreadcrumbItem
            href="#"
            label="Documents"/>

        <FluxBreadcrumbItem
            href="#"
            label="Invoices"/>

        <FluxBreadcrumbItem label="2026"/>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
