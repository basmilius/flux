<template>
    <FluxDashboard>
        <template #navigation>
            <FluxDashboardNavigation>
                <!-- Navigation items. -->
            </FluxDashboardNavigation>
        </template>

        <template #menu>
            <FluxDashboardMenu
                title="Menu">
                <!-- Menu items. -->
            </FluxDashboardMenu>
        </template>

        <template #header>
            <FluxDashboardHeader
                title="Dashboard"/>
        </template>

        <FluxDashboardContent>
            <!-- Your application content here. -->
        </FluxDashboardContent>

        <template #side>
            <FluxDashboardSide
                title="Sidebar">
                <!-- Side bar content. -->
            </FluxDashboardSide>
        </template>
    </FluxDashboard>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboard, FluxDashboardContent, FluxDashboardHeader, FluxDashboardMenu, FluxDashboardNavigation, FluxDashboardSide } from '@flux-ui/dashboard';
</script>
