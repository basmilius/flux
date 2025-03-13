<template>
    <div :class="$style.dashboard">
        <slot name="navigation"/>

        <slot name="menu"/>

        <div :class="$style.dashboardBody">
            <slot name="header"/>
            <slot/>
        </div>

        <slot name="side"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useRemembered } from '@basmilius/flux-internals';
    import { provide } from 'vue';
    import { FluxDashboardInjectionKey } from '$fluxDashboard/data';
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';

    const isNavigationCollapsed = useRemembered('dashboard-navigation-collapsed', true);

    provide(FluxDashboardInjectionKey, {
        isNavigationCollapsed
    });
</script>
