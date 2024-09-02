<template>
    <aside :class="styles.dashboardSide">
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
    import styles from '@/css/component/Dashboard.module.scss';

    export type Props = {
        readonly title: string;
    };

    defineProps<Props>();
</script>
