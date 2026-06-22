<template>
    <FluxSplitButton :flyout-width="208">
        <template #button>
            <FluxSecondaryButton
                icon-leading="download"
                label="Export"
                @click="onExport('PDF')"/>
        </template>

        <template #flyout="{close}">
            <FluxMenu>
                <FluxMenuGroup>
                    <FluxMenuItem
                        icon-leading="file-pdf"
                        label="Export as PDF"
                        @click="onExport('PDF'); close();"/>
                    <FluxMenuItem
                        icon-leading="table-cells"
                        label="Export as CSV"
                        @click="onExport('CSV'); close();"/>
                    <FluxMenuItem
                        icon-leading="share-nodes"
                        label="Share dashboard"
                        @click="onShare(); close();"/>
                </FluxMenuGroup>
            </FluxMenu>
        </template>
    </FluxSplitButton>
</template>

<script
    lang="ts"
    setup>
    import { FluxMenu, FluxMenuGroup, FluxMenuItem, FluxSecondaryButton, FluxSplitButton, showSnackbar } from '@flux-ui/components';

    function onExport(format: string): void {
        showSnackbar({icon: 'download', message: `${format} export is not available in this demo.`});
    }

    function onShare(): void {
        showSnackbar({icon: 'share-nodes', message: 'Sharing is not available in this demo.'});
    }
</script>
