<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxDescriptionList title="Invoice Detail">
                    <FluxDescriptionItem
                        icon="file-lines"
                        label="Invoice Number">
                        9087XY4521
                    </FluxDescriptionItem>

                    <FluxDescriptionItem
                        icon="folder"
                        label="Document Number">
                        <FluxAction icon="copy"/>
                        INV-FURN-9087XY
                    </FluxDescriptionItem>

                    <FluxDescriptionItem
                        icon="circle-check"
                        label="Status">
                        <FluxBadge
                            color="success"
                            label="Success"/>
                    </FluxDescriptionItem>

                    <FluxDescriptionItem
                        icon="circle-question"
                        label="ETTN">
                        <FluxAction icon="copy"/>
                        7b90f6e2-9087-f...
                    </FluxDescriptionItem>

                    <FluxDescriptionItem
                        icon="arrow-up-right-from-square"
                        label="Portal">
                        <FluxLink
                            type="link"
                            href="#"
                            label="View in portal"/>
                    </FluxDescriptionItem>
                </FluxDescriptionList>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxLink, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
