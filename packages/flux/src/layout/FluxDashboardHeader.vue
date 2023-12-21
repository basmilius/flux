<template>
    <header class="flux-dashboard-header">
        <div class="flux-dashboard-header-content">
            <FluxSecondaryButton
                v-if="isNavigationCollapsible"
                :icon-before="isNavigationOpen ? 'xmark' : 'bars'"
                @click="isNavigationOpen = !isNavigationOpen"/>

            <slot name="before-title"/>

            <h1>{{ title }}</h1>

            <slot name="start"/>

            <FluxSpacer/>

            <slot name="end"/>
        </div>
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
        background: rgb(var(--gray-0) / .9);
        backdrop-filter: blur(5px) saturate(180%);
        border-bottom: 1px solid rgb(var(--gray-4) / .75);
        box-shadow: var(--shadow-sm);

        &-content {
            display: flex;
            height: inherit;
            margin-left: auto;
            margin-right: auto;
            max-width: 2100px;
            padding-left: 21px;
            padding-right: 21px;
            align-items: center;
            gap: 18px;

            @include flux.breakpoint-up(xl) {
                padding-left: 42px;
                padding-right: 42px;
            }
        }

        h1 {
            font-size: 18px;
        }

        .flux-persona {
            margin-right: -15px;
        }
    }
</style>
