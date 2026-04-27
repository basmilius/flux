<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxPaneBody>
                <FluxOverflowBar
                    alignment="end"
                    :gap="9">
                    <FluxSecondaryButton
                        v-for="label in buttons"
                        :key="label"
                        :label="label"/>

                    <template #overflow="{ items }">
                        <FluxFlyout v-if="items.length > 0">
                            <template #opener="{toggle}">
                                <FluxSecondaryButton
                                    :label="`+${items.length} more`"
                                    @click="toggle"/>
                            </template>

                            <FluxMenu>
                                <component
                                    :is="item"
                                    v-for="(item, index) in items"
                                    :key="index"/>
                            </FluxMenu>
                        </FluxFlyout>
                    </template>
                </FluxOverflowBar>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlyout, FluxMenu, FluxOverflowBar, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';

    const buttons = ['Export', 'Import', 'Duplicate', 'Archive', 'Delete', 'Share', 'Print'];
</script>
