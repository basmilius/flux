<template>
    <div class="flux-dashboard">
        <slot name="navigation"/>

        <slot name="menu"/>

        <div class="flux-dashboard-body">
            <slot name="header"/>
            <slot/>
        </div>

        <slot name="side"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { provide, ref } from 'vue';
    import { FluxDashboardInjectionKey } from '@/data';

    const isNavigationCollapsed = ref(true);

    provide(FluxDashboardInjectionKey, {
        isNavigationCollapsed
    });
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-dashboard {
        display: grid;
        grid-template-columns: auto 1fr;
        background: rgb(var(--gray-0));

        &-body {
            display: flex;
            flex-flow: column;
        }

        &-content {
            padding: 0 30px 30px;
            flex-grow: 1;
        }

        .flux-notice.is-fluid + &-content {
            padding-top: 30px;
        }

        :has(> &-menu) {
            grid-template-columns: auto 300px 1fr;
        }

        :has(> &-side) {
            grid-template-columns: auto 1fr 300px;
        }

        :has(> &-menu):has(> &-side) {
            grid-template-columns: auto 300px 1fr 300px;
        }
    }
</style>
