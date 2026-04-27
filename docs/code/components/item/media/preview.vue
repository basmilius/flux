<template>
    <Preview>
        <FluxPane style="width: min(100%, 420px)">
            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="48">
                    <FluxAvatar
                        alt="Project icon"
                        fallback-icon="rocket"
                        :size="48"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>Project Aurora</strong>
                    <span style="font-size: .875rem; opacity: .6">Created last week</span>
                </FluxItemContent>
            </FluxItem>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxItem, FluxItemContent, FluxItemMedia, FluxPane } from '@flux-ui/components';
</script>
