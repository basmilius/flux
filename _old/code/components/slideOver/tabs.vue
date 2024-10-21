<template>
    <FluxButtonStack>
        <FluxSecondaryButton
            icon-before="arrow-left-to-line"
            label="Open"
            @click="isSlideOverOpened = true"/>
    </FluxButtonStack>

    <FluxSlideOver>
        <FluxPane v-if="isSlideOverOpened">
            <FluxPaneHeader title="Slide over">
                <FluxSecondaryButton
                    icon-before="xmark"
                    @click="isSlideOverOpened = false"/>
            </FluxPaneHeader>

            <FluxTabs>
                <template #tabs="{activeIndex, tabs, activate}">
                    <FluxTabBar>
                        <template
                            v-for="(tab, index) of tabs"
                            :key="index">
                            <FluxTabBarItem
                                :icon="tab.icon"
                                :is-active="activeIndex === index"
                                :label="tab.label"
                                @click="activate(index)"/>
                        </template>
                    </FluxTabBar>
                </template>

                <FluxTab label="Common">
                    <FluxPaneBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aperiam earum facilis fugiat in, itaque laboriosam, libero molestias nulla, pariatur qui quod sequi sint totam? Fuga ipsum placeat unde.
                    </FluxPaneBody>
                </FluxTab>

                <FluxTab label="Advanced">
                    <FluxPaneBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consequatur dolorem dolorum ducimus enim, fuga, hic illo labore libero, magnam minima odio pariatur porro quasi quidem quis repellat reprehenderit vero?
                    </FluxPaneBody>
                </FluxTab>
            </FluxTabs>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Close"
                    @click="isSlideOverOpened = false"/>

                <FluxSpacer/>

                <FluxPrimaryButton
                    icon-before="circle-check"
                    label="Save"
                    @click="isSlideOverOpened = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxSlideOver>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonStack, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSlideOver, FluxSpacer, FluxTab, FluxTabBar, FluxTabBarItem, FluxTabs } from '@basmilius/flux';
    import { ref } from 'vue';

    const isSlideOverOpened = ref(false);
</script>
