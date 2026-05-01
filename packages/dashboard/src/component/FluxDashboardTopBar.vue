<template>
    <header :class="[$style.dashboardTopBar, !isMenuCollapsed && $style.dashboardTopBarCollapsed]">
        <slot/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import { useDashboardInjection } from '~flux/dashboard/composable';
    import $style from '~flux/dashboard/css/component/DashboardTopBar.module.scss';

    const {isMenuCollapsed} = useDashboardInjection();
</script>
