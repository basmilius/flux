<template>
    <Preview>
        <FluxPane style="width: min(100%, 420px)">
            <FluxItemStack>
                <FluxItem>
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxAvatar
                            alt="Bas Milius"
                            :size="40"
                            src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>Avatar</strong>
                        <span style="font-size: .875rem; opacity: .6">Profile photo with fallback</span>
                    </FluxItemContent>
                </FluxItem>

                <FluxItem>
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <FluxBoxedIcon
                            color="primary"
                            name="image"
                            :size="40"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>Boxed icon</strong>
                        <span style="font-size: .875rem; opacity: .6">Icon in a colored container</span>
                    </FluxItemContent>
                </FluxItem>

                <FluxItem>
                    <FluxItemMedia
                        is-center
                        :size="40">
                        <img
                            alt="Thumbnail"
                            src="https://picsum.photos/seed/flux/80"
                            style="border-radius: var(--radius)">
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>Image</strong>
                        <span style="font-size: .875rem; opacity: .6">Raw image thumbnail</span>
                    </FluxItemContent>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBoxedIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane } from '@flux-ui/components';
</script>
