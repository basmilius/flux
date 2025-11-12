<template>
    <FluxDashboard>
        <template #navigation>
            <Navigation/>
        </template>
    </FluxDashboard>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboard } from '@flux-ui/dashboard';
    import Navigation from './navigation.vue';
</script>
