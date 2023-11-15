<template>
    <FluxPane
        v-height-transition
        class="api-component flux-typography-aware">
        <FluxTabs :model-value="slots.props ? 0 : (slots.emits ? 1 : 2)">
            <template #tabs="{activeIndex, children, tabs, activate}">
                <FluxPaneHeader
                    class="api-component-header"
                    :title="name">
                    <FluxTabBar class="api-component-tabs">
                        <template
                            v-for="(tab, index) of tabs"
                            :key="index">
                            <FluxTabBarItem
                                v-if="tab.label"
                                :icon="tab.icon"
                                :is-active="activeIndex === index"
                                :label="tab.label"
                                tabindex="-1"
                                @click="activate(index)"/>
                        </template>
                    </FluxTabBar>
                </FluxPaneHeader>
            </template>

            <template v-if="slots.props">
                <FluxTab
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
                </FluxTab>
            </template>

            <template v-if="slots.emits">
                <FluxTab
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
                </FluxTab>
            </template>

            <template v-if="slots.slots">
                <FluxTab
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
                </FluxTab>
            </template>
        </FluxTabs>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneHeader, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs, heightTransition } from '@fancee/flux';
    import { useSlots } from 'vue';

    export interface Props {
        readonly name: string;
    }

    const vHeightTransition = heightTransition;

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
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 1px;
                text-transform: uppercase;

                .flux-icon {
                    color: rgb(var(--primary-7));
                }
            }
        }
    }
</style>
