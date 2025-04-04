<template>
    <FluxDashboardTopBar>
        <slot name="start"/>

        <FluxIcon
            v-if="icon"
            :variant="icon"/>

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
    import { FluxIcon, FluxIconName, FluxSpacer } from '@basmilius/flux';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();
</script>
