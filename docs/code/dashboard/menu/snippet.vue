<template>
    <FluxDashboardMenu>
        <template #top-bar-start>
            <!-- Optional content in the start. -->
        </template>

        <template #top-bar-end>
            <!-- Optional content in the end. -->
        </template>

        <FluxMenu>
            <!-- Menu items here. -->
        </FluxMenu>
    </FluxDashboardMenu>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboardMenu } from '@flux-ui/dashboard';
    import { FluxMenu } from '@flux-ui/components';
</script>
