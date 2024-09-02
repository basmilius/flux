<template>
    <aside :class="styles.dashboardMenu">
        <FluxDashboardTopBar>
            <slot name="top-bar-start"/>

            <FluxIcon
                v-if="icon"
                :variant="icon"/>

            <h1>{{ title }}</h1>

            <FluxSpacer/>

            <slot name="top-bar-end"/>
        </FluxDashboardTopBar>

        <div :class="styles.dashboardMenuBody">
            <slot/>
        </div>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxSpacer, IconNames } from '@basmilius/flux';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';
    import styles from '@/css/component/Dashboard.module.scss';

    export type Props = {
        readonly icon?: IconNames;
        readonly title: string;
    };

    defineProps<Props>();
</script>
