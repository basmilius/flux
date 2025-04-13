<template>
    <FluxDashboardTopBar :class="y > 0 ? $style.dashboardHeaderScrolled : $style.dashboardHeader">
        <slot name="start"/>

        <FluxIcon
            v-if="icon"
            :name="icon"/>

        <h1 v-if="title">
            {{ title }}
        </h1>

        <FluxSpacer/>

        <slot name="end"/>
    </FluxDashboardTopBar>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxSpacer } from '@flux-ui/components';
    import { useScrollPosition } from '@flux-ui/internals';
    import type { FluxIconName } from '@flux-ui/types';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';
    import $style from '$fluxDashboard/css/component/DashboardTopBar.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();

    const {y} = useScrollPosition();
</script>
