<template>
    <FluxDashboardNavigation>
        <template #logo>
            <!-- Optional slot for the logo. -->
        </template>

        <FluxMenu>
            <!-- Menu items here. -->
        </FluxMenu>
    </FluxDashboardNavigation>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboardNavigation } from '@flux-ui/dashboard';
    import { FluxMenu } from '@flux-ui/components';
</script>
