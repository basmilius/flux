<template>
    <div
        v-for="index of 2"
        :key="index"
        :class="isNavigationCollapsed ? styles.dashboardNavigationRoundingFixCollapsed : styles.dashboardNavigationRoundingFix"/>

    <nav
        v-bind="$attrs"
        :class="isNavigationCollapsed ? styles.dashboardNavigationCollapsed : styles.dashboardNavigation">
        <router-link
            v-if="slots.logo"
            :class="styles.dashboardNavigationLogo"
            :to="logoLocation || '/'">
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
    import type { To } from '@basmilius/flux';
    import { useSlots } from 'vue';
    import { useDashboardInjection } from '@/composable';
    import styles from '@/css/component/Dashboard.module.scss';

    defineOptions({
        inheritAttrs: false
    });

    defineProps<{
        logoLocation?: To
    }>();

    const {isNavigationCollapsed} = useDashboardInjection();
    const slots = useSlots();
</script>
