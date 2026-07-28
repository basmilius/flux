<template>
    <FluxSecondaryButton
        icon-leading="trash"
        label="Delete project"
        @click="isSheetOpened = true"/>

    <FluxSheet
        :is-draggable="false"
        @close="isSheetOpened = false">
        <FluxPane v-if="isSheetOpened">
            <FluxPaneHeader title="Delete project"/>

            <FluxPaneBody>
                <p>Deleting <strong>Aurora</strong> removes every board, task and attachment in it. This cannot be undone.</p>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSecondaryButton
                    label="Cancel"
                    @click="isSheetOpened = false"/>

                <FluxSpacer/>

                <FluxDestructiveButton
                    icon-leading="trash"
                    label="Delete"
                    @click="isSheetOpened = false"/>
            </FluxPaneFooter>
        </FluxPane>
    </FluxSheet>
</template>

<script
    setup
    lang="ts">
    import { FluxDestructiveButton, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton, FluxSheet, FluxSpacer } from '@flux-ui/components';
    import { ref } from 'vue';

    const isSheetOpened = ref(false);
</script>
