<template>
    <div
        v-for="index of 2"
        :key="index"
        :class="isNavigationCollapsed ? styles.dashboardNavigationRoundingFixCollapsed : styles.dashboardNavigationRoundingFix"/>

    <nav :class="isNavigationCollapsed ? styles.dashboardNavigationCollapsed : styles.dashboardNavigation">
        <router-link
            v-if="slots.logo"
            :class="styles.dashboardNavigationLogo"
            to="/">
            <slot
                name="logo"
                v-bind="{isNavigationCollapsed}"/>
        </router-link>

        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { useSlots } from 'vue';
    import { useDashboardInjection } from '@/composable';
    import styles from '@/css/component/Dashboard.module.scss';

    const {isNavigationCollapsed} = useDashboardInjection();
    const slots = useSlots();
</script>
