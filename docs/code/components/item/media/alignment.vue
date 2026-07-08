<template>
    <FluxPane style="width: min(100%, 480px)">
        <FluxItemStack>
            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        color="primary"
                        name="folder"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent>
                    <strong>Centered media</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        With <code>is-center</code> the media stays vertically centered next to multiple lines of content.
                    </FluxText>
                </FluxItemContent>
            </FluxItem>

            <FluxItem>
                <FluxItemMedia :size="40">
                    <FluxBoxedIcon
                        color="primary"
                        name="folder"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent>
                    <strong>Top-aligned media</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        Without <code>is-center</code> the media aligns to the top of the content.
                    </FluxText>
                </FluxItemContent>
            </FluxItem>
        </FluxItemStack>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBoxedIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxText } from '@flux-ui/components';
</script>
