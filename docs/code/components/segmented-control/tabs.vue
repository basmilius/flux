<template>
    <FluxPane style="width: 100%">
        <FluxTabs>
            <template #tabs="{tabs, modelValue, activate}">
                <FluxPaneBody>
                    <FluxSegmentedControl
                        is-fill
                        :model-value="modelValue"
                        @update:model-value="activate">
                        <FluxSegmentedControlItem
                            v-for="(tab, index) in tabs"
                            :key="index"
                            :value="index"
                            :icon="tab.icon"
                            :label="tab.label"/>
                    </FluxSegmentedControl>
                </FluxPaneBody>
            </template>

            <FluxTab
                icon="grid-2"
                label="Grid">
                <FluxPaneBody>
                    Showing the knowledge base as a grid.
                </FluxPaneBody>
            </FluxTab>

            <FluxTab
                icon="list"
                label="List">
                <FluxPaneBody>
                    Showing the knowledge base as a list.
                </FluxPaneBody>
            </FluxTab>

            <FluxTab
                icon="rectangle-history"
                label="Stack">
                <FluxPaneBody>
                    Showing the knowledge base as a stack.
                </FluxPaneBody>
            </FluxTab>
        </FluxTabs>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxPaneBody, FluxSegmentedControl, FluxSegmentedControlItem, FluxTab, FluxTabs } from '@flux-ui/components';
</script>
