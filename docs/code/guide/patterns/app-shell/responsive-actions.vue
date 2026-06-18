<template>
    <Preview>
        <FluxPane style="width: min(100%, 640px); resize: horizontal; overflow: auto">
            <FluxToolbar floating-mode="top-end">
                <FluxToolbarGroup>
                    <FluxAction icon="arrow-up-a-z"/>
                    <FluxAction icon="filter"/>
                </FluxToolbarGroup>

                <FluxSeparator direction="vertical"/>

                <FluxAction
                    is-destructive
                    icon="trash"/>
            </FluxToolbar>

            <FluxPaneBody>
                <FluxFlex
                    direction="vertical"
                    :gap="15">
                    <FluxOverflowBar
                        alignment="start"
                        :gap="9">
                        <FluxSecondaryButton
                            v-for="filter in filters"
                            :key="filter"
                            :label="filter"/>

                        <template #overflow="{ items }">
                            <FluxSecondaryButton
                                v-if="items.length > 0"
                                icon-leading="ellipsis-h"
                                :label="`+${items.length}`"/>
                        </template>
                    </FluxOverflowBar>

                    <FluxAdaptiveGroup :gap="9">
                        <FluxAdaptiveSlot :priority="3">
                            <FluxSecondaryButton
                                icon-leading="upload"
                                label="Import"/>

                            <template #fallback>
                                <FluxSecondaryButton icon-leading="upload"/>
                            </template>
                        </FluxAdaptiveSlot>

                        <FluxAdaptiveSlot :priority="2">
                            <FluxSecondaryButton
                                icon-leading="arrow-up-from-square"
                                label="Export"/>

                            <template #fallback>
                                <FluxSecondaryButton icon-leading="arrow-up-from-square"/>
                            </template>
                        </FluxAdaptiveSlot>

                        <FluxAdaptiveSlot :priority="1">
                            <FluxPrimaryButton
                                icon-leading="plus"
                                label="New project"/>

                            <template #fallback>
                                <FluxPrimaryButton icon-leading="plus"/>
                            </template>
                        </FluxAdaptiveSlot>
                    </FluxAdaptiveGroup>

                    <FluxButtonGroup>
                        <FluxSecondaryButton icon-leading="list"/>
                        <FluxSecondaryButton icon-leading="grid-2"/>
                        <FluxPrimaryButton icon-leading="rectangle-history"/>
                    </FluxButtonGroup>
                </FluxFlex>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxAdaptiveGroup, FluxAdaptiveSlot, FluxButtonGroup, FluxFlex, FluxOverflowBar, FluxPane, FluxPaneBody, FluxPrimaryButton, FluxSecondaryButton, FluxSeparator, FluxToolbar, FluxToolbarGroup } from '@flux-ui/components';

    const filters = ['All', 'Active', 'Draft', 'Archived', 'Shared', 'Mine', 'Recent'];
</script>
