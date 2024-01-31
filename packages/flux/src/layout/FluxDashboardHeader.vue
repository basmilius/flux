<template>
    <header class="flux-dashboard-header">
        <FluxSecondaryButton
            v-if="isNavigationCollapsible"
            :icon-before="isNavigationOpen ? 'xmark' : 'bars'"
            @click="isNavigationOpen = !isNavigationOpen"/>

        <slot name="before-title"/>

        <h1>{{ title }}</h1>

        <slot name="start"/>

        <FluxSpacer/>

        <slot name="end"/>
    </header>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton, FluxSpacer } from '@/component';
    import { useDashboardInjection } from '@/composable';

    export interface Props {
        readonly title: string;
    }

    defineProps<Props>();

    const {
        isNavigationCollapsible,
        isNavigationOpen
    } = useDashboardInjection();
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-dashboard-header {
        display: flex;
        padding-left: 21px;
        padding-right: 21px;
        align-items: center;
        gap: 18px;
        background: rgb(var(--gray-0));
        border-bottom: 1px solid rgb(var(--gray-4) / .75);
        box-shadow: var(--shadow-sm);

        h1 {
            font-size: 18px;
        }

        .flux-persona {
            margin-right: -15px;
        }

        @include flux.breakpoint-up(xl) {
            padding-left: 42px;
            padding-right: 42px;
        }
    }
</style>
