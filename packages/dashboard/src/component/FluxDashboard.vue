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
    import { useRemembered } from '@flux-ui/internals';
    import type { VNode } from 'vue';
    import { provide } from 'vue';
    import { FluxDashboardInjectionKey } from '$fluxDashboard/data';
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';

    defineSlots<{
        default(): VNode;
        header(): VNode;
        navigation(): VNode;
        menu(): VNode;
        side(): VNode;
    }>();

    const isNavigationCollapsed = useRemembered('dashboard-navigation-collapsed', true);

    provide(FluxDashboardInjectionKey, {
        isNavigationCollapsed
    });
</script>
