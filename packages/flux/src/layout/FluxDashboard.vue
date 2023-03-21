<template>
    <div class="flux-dashboard">
        <flux-container class="flux-dashboard-container">
            <div class="flux-dashboard-top-bar">
                <slot name="top-bar"/>
            </div>

            <div class="flux-dashboard-content">
                <slot/>
            </div>
        </flux-container>

        <aside
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

    const isSidebarOpen = ref(false);
</script>

<style lang="scss">
    .flux-dashboard {
        --background: rgb(var(--gray-2));

        position: relative;
        min-height: 100dvh;
        background: var(--background);
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

        &-sidebar,
        &-top-bar {
            background: rgb(var(--gray-0));
            box-shadow: var(--shadow);
            z-index: 1;
        }

        &-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            padding: 21px;
            height: 100dvh;
            width: 300px;
            border-right: 1px solid rgb(var(--gray-4) / .75);
        }

        &-top-bar {
            position: sticky;
            display: flex;
            top: 30px;
            height: 60px;
            margin-bottom: 30px;
            border: 1px solid rgb(var(--gray-4) / .75);
            border-radius: var(--radius);
        }

        &-sidebar > .flux-menu {
            padding: 15px;
        }

        &-sidebar .flux-menu-item.is-indented {
            margin-left: 36px;
        }

        &-sidebar .flux-menu-item:not(.is-indented) {
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
