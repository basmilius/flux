<template>
    <nav
        v-bind="$attrs"
        :class="isNavigationCollapsed ? $style.dashboardNavigationCollapsed : $style.dashboardNavigation">
        <header :class="$style.dashboardNavigationHeader">
            <FluxMenuItem
                icon-leading="bars"
                @click="isNavigationCollapsed = !isNavigationCollapsed"/>

            <router-link
                v-if="slots.logo"
                :class="$style.dashboardNavigationLogo"
                :to="logoLocation || '/'">
                <slot
                    name="logo"
                    v-bind="{isNavigationCollapsed}"/>
            </router-link>

            <FluxMenuItem
                icon-leading="ellipsis-h"
                @click="isMenuCollapsed = !isMenuCollapsed"/>
        </header>

        <div
            v-for="index of 2"
            :key="index"
            :class="$style.dashboardNavigationRoundingFix"/>

        <main :class="$style.dashboardNavigationNav">
            <slot/>
        </main>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenuItem } from '@flux-ui/components';
    import type { FluxTo } from '@flux-ui/types';
    import { useDashboardInjection } from '$fluxDashboard/composable';
    import $style from '$fluxDashboard/css/component/DashboardNavigation.module.scss';

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

    const {
        isMenuCollapsed,
        isNavigationCollapsed
    } = useDashboardInjection();
</script>
