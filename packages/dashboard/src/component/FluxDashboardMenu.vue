<template>
    <aside :class="$style.dashboardMenu">
        <FluxDashboardTopBar>
            <slot name="top-bar-start"/>

            <FluxIcon
                v-if="icon"
                :name="icon"/>

            <h1>{{ title }}</h1>

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
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';
    import $style from '$fluxDashboard/css/component/Dashboard.module.scss';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly title: string;
    }>();
</script>
