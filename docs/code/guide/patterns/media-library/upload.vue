<template>
    <Preview>
        <FluxPane style="width: min(100%, 520px)">
            <FluxPaneBody>
                <FluxDropZone
                    accept="image/*"
                    is-multiple>
                    <FluxPlaceholder
                        icon="image"
                        title="Drop images to upload"
                        message="PNG, JPG or WEBP up to 25 MB."
                        style="width: 100%">
                        <FluxSecondaryButton
                            icon-leading="upload"
                            label="Browse files"/>
                    </FluxPlaceholder>
                </FluxDropZone>
            </FluxPaneBody>

            <FluxPaneBody>
                <FluxItemStack>
                    <FluxItem
                        v-for="upload in uploads"
                        :key="upload.name">
                        <FluxItemMedia
                            is-center
                            :size="40">
                            <FluxBoxedIcon
                                color="primary"
                                name="image"
                                :size="40"/>
                        </FluxItemMedia>

                        <FluxItemContent is-center>
                            <strong>{{ upload.name }}</strong>
                            <FluxProgressBar
                                :value="upload.progress"
                                :max="100"/>
                            <span style="font-size: .875rem; opacity: .6">{{ upload.progress }}% of {{ upload.size }}</span>
                        </FluxItemContent>

                        <FluxItemActions is-center>
                            <FluxAction
                                icon="xmark"
                                aria-label="Cancel"/>
                        </FluxItemActions>
                    </FluxItem>

                    <FluxItem>
                        <FluxItemMedia
                            is-center
                            :size="40">
                            <FluxSkeleton
                                variant="rectangle"
                                :height="40"
                                :width="40"/>
                        </FluxItemMedia>

                        <FluxItemContent is-center>
                            <FluxSkeleton
                                variant="text"
                                width="50%"
                                :height="16"/>
                            <FluxProgressBar is-indeterminate/>
                            <FluxSkeleton
                                variant="text"
                                width="30%"
                                :height="12"/>
                        </FluxItemContent>
                    </FluxItem>
                </FluxItemStack>

                <FluxSpacing :size="12"/>

                <FluxClickablePane
                    type="button"
                    variant="well">
                    <FluxItem>
                        <FluxItemMedia
                            is-center
                            :size="40">
                            <FluxBoxedIcon
                                color="gray"
                                name="folder"
                                :size="40"/>
                        </FluxItemMedia>

                        <FluxItemContent is-center>
                            <strong>Browse files</strong>
                            <span style="font-size: .875rem; opacity: .6">Pick images from your device</span>
                        </FluxItemContent>

                        <FluxItemMedia is-center>
                            <FluxIcon
                                name="chevron-right"
                                style="opacity: .4"/>
                        </FluxItemMedia>
                    </FluxItem>
                </FluxClickablePane>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxBoxedIcon, FluxClickablePane, FluxDropZone, FluxIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxPaneBody, FluxPlaceholder, FluxProgressBar, FluxSecondaryButton, FluxSkeleton, FluxSpacing } from '@flux-ui/components';

    const uploads = [
        {name: 'mountain-range.jpg', size: '8.2 MB', progress: 72},
        {name: 'studio-portrait.png', size: '12.4 MB', progress: 35}
    ];
</script>
