<template>
    <main :class="[$style.dashboardContent, !isMenuCollapsed && $style.dashboardContentCollapsed]">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import { useDashboardInjection } from '$fluxDashboard/composable';
    import $style from '$fluxDashboard/css/component/DashboardContent.module.scss';

    const {isMenuCollapsed} = useDashboardInjection();
</script>
