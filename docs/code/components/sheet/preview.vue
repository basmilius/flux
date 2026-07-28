<template>
    <Preview>
        <FluxSecondaryButton
            icon-leading="arrow-up-from-square"
            label="Share"
            @click="isSheetOpened = true"/>

        <FluxSheet
            is-closeable
            @close="isSheetOpened = false">
            <FluxPane v-if="isSheetOpened">
                <FluxPaneHeader title="Share this page"/>

                <FluxItemStack>
                    <FluxItem
                        v-for="target of targets"
                        :key="target.label">
                        <FluxItemMedia is-center>
                            <FluxIcon :name="target.icon"/>
                        </FluxItemMedia>

                        <FluxItemContent is-center>
                            <strong>{{ target.label }}</strong>
                        </FluxItemContent>
                    </FluxItem>
                </FluxItemStack>

                <FluxPaneFooter>
                    <FluxSpacer/>

                    <FluxSecondaryButton
                        label="Cancel"
                        @click="isSheetOpened = false"/>
                </FluxPaneFooter>
            </FluxPane>
        </FluxSheet>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxIconName } from '@flux-ui/types';
    import { FluxIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPaneFooter, FluxPaneHeader, FluxSecondaryButton, FluxSheet, FluxSpacer } from '@flux-ui/components';
    import { ref } from 'vue';

    const targets: { icon: FluxIconName; label: string }[] = [
        {icon: 'copy', label: 'Copy link'},
        {icon: 'envelope', label: 'Send as email'},
        {icon: 'message', label: 'Share in chat'}
    ];

    const isSheetOpened = ref(false);
</script>
