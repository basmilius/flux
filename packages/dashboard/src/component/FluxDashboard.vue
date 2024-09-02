<template>
    <div :class="styles.dashboard">
        <slot name="navigation"/>

        <slot name="menu"/>

        <div :class="styles.dashboardBody">
            <slot name="header"/>
            <slot/>
        </div>

        <slot name="side"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { useRemembered } from '@basmilius/flux';
    import { provide } from 'vue';
    import { FluxDashboardInjectionKey } from '@/data';
    import styles from '@/css/component/Dashboard.module.scss';

    const isNavigationCollapsed = useRemembered('dashboard-navigation-collapsed', true);

    provide(FluxDashboardInjectionKey, {
        isNavigationCollapsed
    });
</script>
