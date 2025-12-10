<template>
    <FluxDashboardNavigation>
        <FluxMenu>
            <FluxMenuItem
                type="route"
                v-for="route in routes"
                :label="route.title"
                :to="{ name: route.name }"
                @click="closeNavigation"/>

            <FluxSpacer/>

            <FluxMenuItem
                :icon-leading="collapseIcon"
                :label="isNavigationCollapsed ? 'Expand' : 'Collapse'"/>
        </FluxMenu>
    </FluxDashboardNavigation>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboardNavigation, useDashboardInjection } from '@flux-ui/dashboard';
    import { FluxMenu, FluxMenuItem, FluxSpacer } from '@flux-ui/components';
    import { computed } from 'vue';

    const routes = [
        {title: 'Home', name: 'Home'},
        {title: 'About', name: 'About'},
        {title: 'Contact', name: 'Contact'},
        {title: 'Settings', name: 'Settings'},
    ];

    const { isNavigationCollapsed } = useDashboardInjection();

    const collapseIcon = computed(() => isNavigationCollapsed.value ? "angle-left" : "angle-right");

    function closeNavigation(): void {
        isNavigationCollapsed.value = true;
    }
</script>
