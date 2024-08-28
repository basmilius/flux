<template>
    <FluxDashboardTopBar>
        <slot name="start"/>

        <FluxIcon
            v-if="icon"
            :variant="icon"/>

        <h1>{{ title }}</h1>

        <FluxSpacer/>

        <slot name="end"/>
    </FluxDashboardTopBar>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxSpacer } from '@/component';
    import { useDashboardInjection } from '@/composable';
    import type { IconNames } from '@/data';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';

    type Props = {
        readonly icon?: IconNames;
        readonly title: string;
    };

    defineProps<Props>();

    const {isNavigationCollapsed} = useDashboardInjection();
</script>
