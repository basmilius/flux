<template>
    <FluxBreadcrumb>
        <FluxBreadcrumbItem
            href="#"
            icon="house"
            label="Home"/>

        <FluxBreadcrumbItem
            href="#"
            label="Clients"/>

        <FluxBreadcrumbFlyout label="Naomi Watts">
            <template #leading>
                <FluxAvatar
                    alt="Naomi Watts"
                    fallback-initials="NW"
                    :size="21"/>
            </template>

            <FluxMenuItem
                image-src="https://i.pravatar.cc/64?img=1"
                is-active
                label="Naomi Watts"/>

            <FluxMenuItem
                image-src="https://i.pravatar.cc/64?img=2"
                label="Oscar Nunez"/>

            <FluxMenuItem
                image-src="https://i.pravatar.cc/64?img=3"
                label="Priya Patel"/>
        </FluxBreadcrumbFlyout>
    </FluxBreadcrumb>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBreadcrumb, FluxBreadcrumbFlyout, FluxBreadcrumbItem, FluxMenuItem } from '@flux-ui/components';
</script>
