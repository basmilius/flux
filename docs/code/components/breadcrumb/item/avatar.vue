<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            icon="house"
            label="Home"/>

        <FluxBreadcrumbItem
            href="#"
            label="Clients"/>

        <FluxBreadcrumbItem label="Naomi Watts">
            <template #leading>
                <FluxAvatar
                    alt="Naomi Watts"
                    fallback-initials="NW"
                    :size="21"/>
            </template>
        </FluxBreadcrumbItem>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBreadcrumb, FluxBreadcrumbItem } from '@flux-ui/components';
</script>
