<template>
    <aside class="flux-dashboard-menu">
        <FluxDashboardTopBar>
            <slot name="top-bar-start"/>

            <FluxIcon
                v-if="icon"
                :variant="icon"/>

            <h1>{{ title }}</h1>

            <FluxSpacer/>

            <slot name="top-bar-end"/>
        </FluxDashboardTopBar>

        <div class="flux-dashboard-menu-body">
            <slot/>
        </div>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxSpacer } from '@/component';
    import type { IconNames } from '@/data';
    import FluxDashboardTopBar from './FluxDashboardTopBar.vue';

    type Props = {
        readonly icon?: IconNames;
        readonly title: string;
    };

    defineProps<Props>();
</script>

<style lang="scss">
    .flux-dashboard {
        &-menu {
            position: sticky;
            top: 0;
            height: 100dvh;
            background: rgb(var(--gray-1));
            border-right: 1px solid rgb(var(--gray-3));
            overflow: auto;

            &-body {
                padding: 0 18px 30px;
            }

            .flux-menu-sub-header {
                background: linear-gradient(to bottom, rgb(var(--gray-1)) 75%, transparent);
            }
        }

        &-menu &-top-bar {
            background: rgb(var(--gray-1) / .9);
        }
    }
</style>
