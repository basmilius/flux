<template>
    <aside class="flux-dashboard-side">
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
    import { FluxSpacer } from '@/component';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';

    type Props = {
        readonly title: string;
    };

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-dashboard {
        &-side {
            position: sticky;
            top: 0;
            height: 100dvh;
            background: rgb(var(--gray-1));
            border-left: 1px solid rgb(var(--gray-3));
            overflow: auto;
        }

        &-side &-top-bar {
            background: rgb(var(--gray-1) / .9);
        }
    }
</style>
