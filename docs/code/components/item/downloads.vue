<template>
    <FluxPane style="width: min(100%, 520px)">
        <FluxItemStack>
            <FluxItem
                v-for="download in downloads"
                :key="download.name">
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        color="primary"
                        name="file-lines"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>{{ download.name }}</strong>
                    <FluxProgressBar
                        :value="download.progress"
                        :max="100"/>
                    <span style="font-size: .875rem; opacity: .6">{{ download.progress }}% of {{ download.size }}</span>
                </FluxItemContent>

                <FluxItemActions is-center>
                    <FluxAction
                        icon="xmark"
                        aria-label="Cancel"/>
                </FluxItemActions>
            </FluxItem>
        </FluxItemStack>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxProgressBar } from '@flux-ui/components';

    const downloads = [
        {name: 'annual-report.pdf', size: '8.2 MB', progress: 72},
        {name: 'design-assets.zip', size: '254 MB', progress: 35}
    ];
</script>
