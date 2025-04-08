<template>
    <FluxDashboardTopBar>
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
    import { FluxIcon, FluxSpacer } from '@flux-ui/flux';
    import type { FluxIconName } from '@flux-ui/types';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';

    defineProps<{
        readonly icon?: FluxIconName;
        readonly title?: string;
    }>();
</script>
