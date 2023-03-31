<template>
    <flux-pane class="api-component flux-typography-aware">
        <flux-tabs :model-value="slots.props ? 0 : (slots.emits ? 1 : 2)">
            <template #tabs="{activeIndex, children, tabs, activate}">
                <flux-pane-header
                    class="api-component-header"
                    :title="name">
                    <flux-tab-bar class="api-component-tabs">
                        <template
                            v-for="(tab, index) of tabs"
                            :key="index">
                            <flux-tab-bar-item
                                v-if="tab.label"
                                :icon="tab.icon"
                                :is-active="activeIndex === index"
                                :label="tab.label"
                                @click="activate(index)"/>
                        </template>
                    </flux-tab-bar>
                </flux-pane-header>
            </template>

            <template v-if="slots.props">
                <flux-tab
                    icon="wrench"
                    label="Props">
                    <table class="api-table">
                        <thead>
                        <slot name="head">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </slot>
                        </thead>
                        <tbody>
                        <slot name="props"/>
                        </tbody>
                    </table>
                </flux-tab>
            </template>

            <template v-if="slots.emits">
                <flux-tab
                    icon="bolt"
                    label="Emits">
                    <table class="api-table">
                        <thead>
                        <slot name="head">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </slot>
                        </thead>
                        <tbody>
                        <slot name="emits"/>
                        </tbody>
                    </table>
                </flux-tab>
            </template>

            <template v-if="slots.slots">
                <flux-tab
                    icon="draw-square"
                    label="Slots">
                    <table class="api-table">
                        <thead>
                        <slot name="head">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </slot>
                        </thead>
                        <tbody>
                        <slot name="slots"/>
                        </tbody>
                    </table>
                </flux-tab>
            </template>
        </flux-tabs>
    </flux-pane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneHeader, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs } from '@fancee/flux';
    import { useSlots } from 'vue';

    export interface Props {
        readonly name: string;
    }

    defineProps<Props>();

    const slots = useSlots();
</script>

<style lang="scss">
    .api-component {
        margin-top: 30px;
        margin-bottom: 30px;
        overflow: hidden;
        z-index: 0;

        &:first-of-type {
            margin-top: 0;
        }

        &:last-of-type {
            margin-bottom: 0;
        }

        &-header {
            height: 66px;
            padding-top: 0;
            background: rgb(var(--gray-1));
            border-bottom: 2px solid rgb(var(--gray-3));
            z-index: 1;

            .flux-pane-header-title {
                color: rgb(var(--primary-7));
                font-family: jetbrains-mono, monospace;
                font-size: 13px;
                font-weight: 900;

                &::before,
                &::after {
                    color: var(--foreground-prominent);
                }

                &::before {
                    content: '<Flux';
                }

                &::after {
                    content: '/>';
                }
            }
        }

        &-tabs {
            --tab-padding: 21px;

            margin-bottom: -3px;
            flex-grow: 1;

            .flux-tab-bar-tabs {
                justify-content: flex-end;
            }

            .flux-tab-bar-item {
                color: var(--foreground-prominent);
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;

                .flux-icon {
                    color: rgb(var(--primary-7));
                }
            }
        }
    }
</style>
