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
                        <FluxSecondaryButton
                            v-if="items.length > 0"
                            :label="`+${items.length} more`"/>
                    </template>
                </FluxOverflowBar>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxOverflowBar, FluxPane, FluxPaneBody, FluxSecondaryButton } from '@flux-ui/components';

    const buttons = ['Export', 'Import', 'Duplicate', 'Archive', 'Delete', 'Share', 'Print'];
</script>
