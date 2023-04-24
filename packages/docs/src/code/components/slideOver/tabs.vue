<template>
    <flux-button-stack>
        <flux-secondary-button
            icon-before="arrow-left-to-line"
            label="Open"
            @click="isSlideOverOpened = true"/>
    </flux-button-stack>

    <flux-slide-over>
        <flux-pane v-if="isSlideOverOpened">
            <flux-pane-header title="Slide over">
                <flux-secondary-button
                    icon-before="xmark"
                    @click="isSlideOverOpened = false"/>
            </flux-pane-header>

            <flux-tabs>
                <template #tabs="{activeIndex, tabs, activate}">
                    <flux-tab-bar>
                        <template
                            v-for="(tab, index) of tabs"
                            :key="index">
                            <flux-tab-bar-item
                                :icon="tab.icon"
                                :is-active="activeIndex === index"
                                :label="tab.label"
                                @click="activate(index)"/>
                        </template>
                    </flux-tab-bar>
                </template>

                <flux-tab label="Common">
                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                    </flux-pane-body>
                </flux-tab>

                <flux-tab label="Advanced">
                    <flux-pane-body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero?
                    </flux-pane-body>
                </flux-tab>
            </flux-tabs>

            <flux-pane-footer>
                <flux-secondary-button
                    label="Close"
                    @click="isSlideOverOpened = false"/>

                <flux-spacer/>

                <flux-primary-button
                    icon-before="circle-check"
                    label="Save"
                    @click="isSlideOverOpened = false"/>
            </flux-pane-footer>
        </flux-pane>
    </flux-slide-over>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs } from '@fancee/flux';
    import { ref } from 'vue';

    const isSlideOverOpened = ref(false);
</script>
