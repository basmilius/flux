<template>
    <main :class="[$style.dashboardContent, !isMenuCollapsed && $style.dashboardContentCollapsed]">
        <slot/>
    </main>
</template>

<script
    lang="ts"
    setup>
    import { useDashboardInjection } from '~flux/dashboard/composable';
    import $style from '~flux/dashboard/css/component/DashboardContent.module.scss';

    const {isMenuCollapsed} = useDashboardInjection();
</script>
