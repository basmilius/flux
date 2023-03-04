<template>
    <div class="flux-dashboard">
        <div class="flux-dashboard-scroll-fade"/>

        <flux-container class="flux-dashboard-container">
            <div class="flux-dashboard-top-bar">
                <slot name="top-bar"/>
            </div>

            <div class="flux-dashboard-content">
                <slot/>
            </div>
        </flux-container>

        <aside
            v-if="isSidebarOpen"
            class="flux-dashboard-sidebar">
            <slot name="sidebar"/>
        </aside>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { ref } from 'vue-demi';
    import { FluxContainer } from '../components';

    const isSidebarOpen = ref(true);
</script>

<style lang="scss">
    .flux-dashboard {
        position: relative;
        z-index: 0;

        &-container {
            margin-left: auto;
            margin-right: auto;
            padding: 30px;
            z-index: 0;
        }

        &-content {
            position: relative;
            z-index: 0;
        }

        &-scroll-fade {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 120px;
            background: linear-gradient(to bottom, var(--background) 75%, transparent);
            z-index: 1;
        }

        &-sidebar,
        &-top-bar {
            background: var(--surface-background);
            box-shadow: var(--shadow);
            z-index: 1;
        }

        &-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100dvh;
            width: 300px;
            border-right: 1px solid var(--surface-stroke);
        }

        &-top-bar {
            position: sticky;
            top: 30px;
            height: 60px;
            margin-bottom: 30px;
            border: 1px solid var(--surface-stroke);
            border-radius: var(--radius);
        }

        &-sidebar > .flux-menu {
            padding: 15px;
        }

        &-sidebar .flux-menu-item {
            padding-left: 15px;
            padding-right: 15px;
            height: 48px;

            span {
                font-weight: 500;
            }
        }

        @media (min-width: 1580px) {
            margin-left: 300px;
        }
    }
</style>
