<template>
    <div
        class="flux-dashboard-navigation-rounding top"
        :class="{'is-collapsed': isNavigationCollapsed}"/>

    <div
        class="flux-dashboard-navigation-rounding bottom"
        :class="{'is-collapsed': isNavigationCollapsed}"/>

    <nav
        class="flux-dashboard-navigation"
        :class="{
            'is-collapsed': isNavigationCollapsed
        }">
        <router-link
            v-if="slots.logo"
            class="flux-dashboard-navigation-logo"
            to="/">
            <slot
                name="logo"
                v-bind="{isNavigationCollapsed}"/>
        </router-link>

        <slot/>
    </nav>
</template>

<script
    lang="ts"
    setup>
    import { useDashboardInjection } from '@/composable';
    import { useSlots } from 'vue';

    const {isNavigationCollapsed} = useDashboardInjection();
    const slots = useSlots();
</script>

<style lang="scss">
    @use '../css/mixin' as flux;

    .flux-dashboard-navigation {
        position: sticky;
        display: flex;
        top: 0;
        height: 100dvh;
        padding: 15px;
        width: 84px;
        flex-flow: column;
        gap: 15px;
        background: rgb(var(--primary-11));
        transition: width 210ms var(--swift-out);

        &-rounding {
            position: absolute;
            display: block;
            left: 300px;
            height: var(--radius);
            width: var(--radius);
            content: '';
            background: rgb(var(--primary-11));
            transition: left 210ms var(--swift-out);
            z-index: 10000;

            &.is-collapsed {
                left: 84px;
            }

            &::before {
                position: absolute;
                display: block;
                inset: 0;
                content: '';
                background: rgb(var(--gray-0));
            }

            &.top {
                top: 0;

                &::before {
                    border-top-left-radius: var(--radius);
                }
            }

            &.bottom {
                bottom: 0;

                &::before {
                    border-bottom-left-radius: var(--radius);
                }
            }
        }

        &-logo {
            display: flex;
            height: 54px;
            width: 54px;
            align-items: center;
            justify-content: center;

            svg {
                max-height: 48px;
                max-width: 48px;
                width: 100%;
            }
        }

        .flux-divider {
            margin: 3px 15px;

            &-line {
                background: rgb(var(--primary-10));
            }
        }

        .flux-menu {
            flex-grow: 1;
        }

        .flux-menu-item {
            --button-background: transparent;
            --button-background-hover: rgb(var(--primary-10));
            --button-background-active: rgb(var(--primary-9));
            --button-foreground: rgb(var(--primary-0));
            --button-icon: rgb(var(--primary-0));
            --button-stroke: transparent;

            padding: 15px;
            overflow: hidden;

            .flux-button-icon {
                font-size: 24px !important;
            }

            span {
                transition: opacity 210ms var(--swift-out);
                white-space: nowrap;
            }
        }

        &:not(.is-collapsed) {
            width: 300px;
        }

        &.is-collapsed {
            .flux-menu-item {
                width: 54px;

                span {
                    opacity: 0;
                }
            }
        }
    }
</style>
