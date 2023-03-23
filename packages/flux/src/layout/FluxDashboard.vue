<template>
    <div
        class="flux-dashboard"
        :class="{
            'is-navigation-open': isNavigationOpen
        }">
        <div
            class="flux-dashboard-content"
            :inert="isNavigationOpen">
            <slot/>
        </div>

        <slot name="header"/>
        <slot name="navigation"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { computed, provide, ref, unref } from 'vue-demi';
    import { FluxDashboardApi, useBreakpoints } from '../composables';

    const {breakpoints} = useBreakpoints();

    const isNavigationOpen = ref(false);

    const isNavigationCollapsible = computed(() => !unref(breakpoints).xl);

    provide<FluxDashboardApi>('flux-dashboard', {
        isNavigationCollapsible,
        isNavigationOpen
    });
</script>

<style lang="scss">
    @use '../scss/mixin' as flux;

    .flux-dashboard {
        --header-height: 84px;
        --navigation-width: 300px;

        position: relative;
        height: 100dvh;
        width: 100dvw;
        font-size: 15px;
        overflow-x: hidden;

        &-content {
            position: relative;
            margin-top: var(--header-height);
            margin-left: var(--navigation-width);
            padding: 42px;
            z-index: 0;
        }

        &-header,
        &-navigation {
            position: fixed;
            top: 0;
        }

        &-header {
            left: var(--navigation-width);
            right: 0;
            height: var(--header-height);
        }

        &-navigation {
            left: 0;
            height: 100dvh;
            width: var(--navigation-width);
        }

        @include flux.breakpoint-down(lg) {
            &-content,
            &-header,
            &-navigation {
                transition: 360ms var(--swift-out);
                transition-property: opacity, transform;
            }

            &-content {
                margin-left: 0;
                padding: 21px;
            }

            &-header {
                left: 0;
            }

            &.is-navigation-open {
                overflow: hidden;
            }

            &.is-navigation-open &-content,
            &.is-navigation-open &-header {
                transform: translate3d(var(--navigation-width), 0, 0);
            }

            &.is-navigation-open &-content {
                opacity: .5;
            }

            &:not(.is-navigation-open) &-navigation {
                opacity: 0;
                pointer-events: none;
                transform: translate3d(-100%, 0, 0);
            }
        }
    }
</style>
