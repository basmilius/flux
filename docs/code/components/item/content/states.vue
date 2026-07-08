<template>
    <FluxPane style="width: min(100%, 420px)">
        <FluxItemStack>
            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        color="primary"
                        name="file-lines"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>Title only</strong>
                </FluxItemContent>
            </FluxItem>

            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        color="primary"
                        name="file-lines"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent>
                    <strong>Title with description</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        A supporting line of text below the title.
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
