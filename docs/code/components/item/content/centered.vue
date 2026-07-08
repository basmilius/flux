<template>
    <FluxPane style="width: min(100%, 420px)">
        <FluxItem>
            <FluxItemMedia :size="64">
                <FluxBoxedIcon
                    color="primary"
                    name="rocket"
                    :size="64"/>
            </FluxItemMedia>

            <FluxItemContent is-center>
                <strong>Project Aurora</strong>
                <FluxText
                    size="small"
                    color="muted">
                    Vertically centered next to a taller media element.
                </FluxText>
            </FluxItemContent>
        </FluxItem>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBoxedIcon, FluxItem, FluxItemContent, FluxItemMedia, FluxPane, FluxText } from '@flux-ui/components';
</script>
