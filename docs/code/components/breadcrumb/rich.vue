<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            icon="house"
            label="Home"/>

        <FluxBreadcrumbFlyout label="Clients">
            <FluxMenuItem
                icon-leading="building"
                is-active
                label="Clients"/>

            <FluxMenuItem
                icon-leading="folder"
                label="Projects"/>

            <FluxMenuItem
                icon-leading="file-lines"
                label="Invoices"/>
        </FluxBreadcrumbFlyout>

        <FluxBreadcrumbItem label="Naomi Watts">
            <template #leading>
                <FluxAvatar
                    alt="Naomi Watts"
                    fallback-initials="NW"
                    :size="21"/>
            </template>

            <template #trailing>
                <FluxBadge
                    color="success"
                    label="VIP"
                    size="small"/>
            </template>
        </FluxBreadcrumbItem>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBadge, FluxBreadcrumb, FluxBreadcrumbFlyout, FluxBreadcrumbItem, FluxMenuItem } from '@flux-ui/components';
</script>
