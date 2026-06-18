<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="12"
            style="width: min(100%, 360px)">
            <FluxClickablePane
                type="button"
                @click="cards++">
                <FluxItem>
                    <FluxItemMedia
                        is-center
                        :size="36">
                        <FluxIcon
                            name="plus"
                            :size="18"
                            style="opacity: .6"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>Add a card</strong>
                        <span style="font-size: .875rem; opacity: .6">{{ cards }} cards in this column</span>
                    </FluxItemContent>

                    <FluxItemMedia is-center>
                        <FluxIcon
                            name="chevron-right"
                            style="opacity: .4"/>
                    </FluxItemMedia>
                </FluxItem>
            </FluxClickablePane>

            <FluxDropZone
                is-multiple
                @select-multiple="onSelect">
                <FluxPlaceholder
                    icon="paper-plane"
                    message="Drop files to attach them to the new card..."
                    style="width: 100%">
                    <FluxFlyout>
                        <template #opener="{open}">
                            <FluxSecondaryButton
                                icon-leading="upload"
                                label="Browse"
                                @click="open()"/>
                        </template>

                        <template #default="{close}">
                            <FluxPane style="max-width: 300px">
                                <FluxPaneBody>
                                    <FluxFlex
                                        align="center"
                                        :gap="9">
                                        <FluxIcon name="circle-info"/>
                                        <span>Choose files from your device, or drag them onto the zone.</span>
                                    </FluxFlex>

                                    <FluxSecondaryButton
                                        data-typography-aware
                                        label="Got it"
                                        @click="close()"/>
                                </FluxPaneBody>
                            </FluxPane>
                        </template>
                    </FluxFlyout>
                </FluxPlaceholder>
            </FluxDropZone>

            <FluxTagStack v-if="attachments.length > 0">
                <FluxTag
                    v-for="attachment in attachments"
                    :key="attachment"
                    is-deletable
                    icon="file"
                    :label="attachment"
                    @delete="removeAttachment(attachment)"/>
            </FluxTagStack>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxClickablePane, FluxDropZone, FluxFlex, FluxFlyout, FluxIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxPane, FluxPaneBody, FluxPlaceholder, FluxSecondaryButton, FluxTag, FluxTagStack } from '@flux-ui/components';
    import { ref } from 'vue';

    const cards = ref(3);
    const attachments = ref<string[]>(['design-spec.pdf']);

    function onSelect(files: FileList): void {
        for (const file of Array.from(files)) {
            attachments.value.push(file.name);
        }
    }

    function removeAttachment(name: string): void {
        attachments.value = attachments.value.filter(attachment => attachment !== name);
    }
</script>
