<template>
    <aside :class="$style.dashboardSide">
        <FluxDashboardTopBar>
            <slot name="top-bar-start"/>

            <h1>{{ title }}</h1>

            <FluxSpacer/>

            <slot name="top-bar-end"/>
        </FluxDashboardTopBar>

        <slot/>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxSpacer } from '@flux-ui/components';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';
    import $style from '$fluxDashboard/css/component/DashboardPane.module.scss';

    defineProps<{
        readonly title: string;
    }>();
</script>
