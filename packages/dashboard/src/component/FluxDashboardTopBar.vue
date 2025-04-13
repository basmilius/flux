<template>
    <header :class="[$style.dashboardTopBar, !isMenuCollapsed && $style.dashboardTopBarCollapsed]">
        <slot/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import { useDashboardInjection } from '$fluxDashboard/composable';
    import $style from '$fluxDashboard/css/component/DashboardTopBar.module.scss';

    const {isMenuCollapsed} = useDashboardInjection();
</script>
