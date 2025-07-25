<template>
    <aside :class="[$style.dashboardMenu, isMenuCollapsed && $style.dashboardMenuCollapsed]">
        <FluxDashboardTopBar>
            <slot name="top-bar-start"/>

            <FluxIcon
                v-if="icon"
                :name="icon"/>

            <h1 v-if="title">
                {{ title }}
            </h1>

            <FluxSpacer/>

            <slot name="top-bar-end"/>
        </FluxDashboardTopBar>

        <div :class="$style.dashboardMenuBody">
            <slot/>
        </div>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxSpacer } from '@flux-ui/components';
    import type { FluxIconName } from '@flux-ui/types';
    import { useDashboardInjection } from '$fluxDashboard/composable';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';
    import $style from '$fluxDashboard/css/component/DashboardPane.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();

    const {isMenuCollapsed} = useDashboardInjection();
</script>
