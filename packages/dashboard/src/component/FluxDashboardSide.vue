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
    import { FluxSpacer } from '@basmilius/flux';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';

    defineProps<{
        readonly title: string;
    }>();
</script>
