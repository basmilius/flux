<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            icon="house"
            label="Home"/>

        <FluxBreadcrumbItem
            href="#"
            label="Flux UI">
            <template #trailing>
                <FluxTag
                    color="info"
                    label="Beta"
                    size="small"/>
            </template>
        </FluxBreadcrumbItem>

        <FluxBreadcrumbItem label="Roadmap">
            <template #trailing>
                <FluxBadge
                    color="primary"
                    label="3"
                    size="small"/>
            </template>
        </FluxBreadcrumbItem>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBreadcrumb, FluxBreadcrumbItem, FluxTag } from '@flux-ui/components';
</script>
