<template>
    <FluxPane style="width: min(100%, 420px)">
        <FluxItemStack>
            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="32">
                    <FluxAvatar
                        alt="Bas Milius"
                        :size="32"
                        src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>Small</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        32px
                    </FluxText>
                </FluxItemContent>
            </FluxItem>

            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="48">
                    <FluxAvatar
                        alt="Bas Milius"
                        :size="48"
                        src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>Medium</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        48px
                    </FluxText>
                </FluxItemContent>
            </FluxItem>

            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="64">
                    <FluxAvatar
                        alt="Bas Milius"
                        :size="64"
                        src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>Large</strong>
                    <FluxText
                        size="small"
                        color="muted">
                        64px
                    </FluxText>
                </FluxItemContent>
            </FluxItem>
        </FluxItemStack>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxPane, FluxText } from '@flux-ui/components';
</script>
