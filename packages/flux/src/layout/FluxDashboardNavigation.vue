<template>
    <aside class="flux-dashboard-navigation">
        <header class="flux-dashboard-navigation-header">
            <img
                class="flux-dashboard-navigation-header-logo"
                :src="logoUrl"
                :alt="applicationName"/>

            <span class="flux-dashboard-navigation-header-name">
                {{ applicationName }}
            </span>

            <flux-secondary-button
                v-if="$slots.apps"
                icon-before="grid3"
                @click="toggleAppSwitcher"/>
        </header>

        <main class="flux-dashboard-navigation-body">
            <flux-vertical-window-transition :is-back="isAppSwitcherVisible">
                <nav
                    v-if="isAppSwitcherVisible"
                    key="apps"
                    class="flux-dashboard-navigation-app-switcher">
                    <slot
                        name="apps"
                        v-bind="{closeAppSwitcher, openAppSwitcher, toggleAppSwitcher}"/>
                </nav>

                <nav
                    v-else
                    key="navigation"
                    class="flux-dashboard-navigation-nav">
                    <slot/>
                </nav>
            </flux-vertical-window-transition>
        </main>

        <footer
            v-if="$slots.footer"
            class="flux-dashboard-navigation-footer">
            <slot name="footer"/>
        </footer>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import { inject, ref } from 'vue-demi';
    import { FluxSecondaryButton } from '../components';
    import { FluxVerticalWindowTransition } from '../transition';

    export interface Props {
        readonly applicationName: string;
        readonly logoUrl: string;
    }

    defineProps<Props>();

    const {isNavigationOpen} = inject('flux-dashboard', {
        isNavigationOpen: ref(false)
    });

    const isAppSwitcherVisible = ref(false);

    function closeAppSwitcher(): void {
        isAppSwitcherVisible.value = false;
    }

    function openAppSwitcher(): void {
        isAppSwitcherVisible.value = false;
    }

    function toggleAppSwitcher(): void {
        isAppSwitcherVisible.value = !isAppSwitcherVisible.value;
    }
</script>

<style lang="scss">
    .flux-dashboard-navigation {
        display: flex;
        flex-flow: column;
        background: rgb(var(--gray-0));
        border-right: 1px solid rgb(var(--gray-4) / .75);

        &-body {
            display: flex;
            padding: 21px;
            flex-flow: column;
            flex-grow: 1;
            gap: 21px;
        }

        &-footer {
            padding: 21px;
            border-top: 1px solid rgb(var(--gray-4) / .75);
            color: var(--foreground-secondary);
            font-size: 14px;
            text-align: center;

            a {
                color: inherit;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        &-header {
            display: flex;
            height: 84px;
            padding: 0 21px;
            align-items: center;
            gap: 15px;
            border-bottom: 1px solid rgb(var(--gray-4) / .75);

            &-logo {
                height: 45px;
                width: 45px;
            }

            &-name {
                flex-grow: 1;
                color: var(--foreground-prominent);
                font-size: 18px;
                font-weight: 600;
            }
        }

        &-nav {
            flex-grow: 1;
        }

        .flux-menu-item:not(.is-indented) {
            position: relative;
            height: 48px;

            span {
                color: var(--foreground-prominent);
                font-weight: 600;
            }

            &::after {
                position: absolute;
                display: block;
                top: 12px;
                right: 12px;
                bottom: 12px;
                width: 4px;
                content: '';
                background: rgb(var(--primary-0));
                border-radius: 99px;
                opacity: 0;
                transition: opacity 180ms var(--swift-out);
            }

            &.is-active {
                &::after {
                    opacity: 1;
                }

                span {
                    color: rgb(var(--primary-0));
                }
            }
        }
    }
</style>
