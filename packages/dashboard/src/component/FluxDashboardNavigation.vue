<template>
    <nav
        v-bind="$attrs"
        :class="isNavigationCollapsed ? $style.dashboardNavigationCollapsed : $style.dashboardNavigation">
        <router-link
            v-if="slots.logo"
            :class="$style.dashboardNavigationLogo"
            :to="logoLocation || '/'">
            <slot
                name="logo"
                v-bind="{isNavigationCollapsed}"/>
        </router-link>

        <div
            v-for="index of 2"
            :key="index"
            :class="$style.dashboardNavigationRoundingFix"/>

        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import type { FluxTo } from '@flux-ui/types';
    import { useDashboardInjection } from '$fluxDashboard/composable';
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';

    defineOptions({
        inheritAttrs: false
    });

    defineProps<{
        logoLocation?: FluxTo
    }>();

    const slots = defineSlots<{
        default(): any;
        logo?(): any;
    }>();

    const {isNavigationCollapsed} = useDashboardInjection();
</script>
