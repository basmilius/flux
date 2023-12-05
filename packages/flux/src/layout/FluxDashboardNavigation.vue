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

            <FluxSecondaryButton
                v-if="slots.apps"
                icon-before="grid-2"
                @click="toggleAppSwitcher"/>
        </header>

        <main class="flux-dashboard-navigation-body">
            <FluxBreakthroughTransition :is-back="isAppSwitcherVisible">
                <nav
                    v-if="isAppSwitcherVisible"
                    key="apps"
                    class="flux-dashboard-navigation-app-switcher">
                    <slot
                        v-bind="{closeAppSwitcher, openAppSwitcher, toggleAppSwitcher}"
                        name="apps"/>
                </nav>

                <nav
                    v-else
                    :key="navigationKey"
                    class="flux-dashboard-navigation-nav">
                    <slot/>
                </nav>
            </FluxBreakthroughTransition>
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
    import { ref, useSlots } from 'vue';
    import { FluxSecondaryButton } from '@/components';
    import { FluxBreakthroughTransition } from '@/transition';

    export interface Props {
        readonly applicationName: string;
        readonly logoUrl: string;
        readonly navigationKey?: string;
    }

    withDefaults(defineProps<Props>(), {
        navigationKey: 'navigation'
    });

    const slots = useSlots();

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
            padding: 15px;
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
                height: 36px;
                width: 36px;
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

            .flux-expandable-body .flux-menu-group {
                margin-top: 3px;
            }
        }

        &-app-switcher .flux-menu-item-image {
            height: 30px;
            width: 30px;
        }
    }
</style>
