<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
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
                    <strong>Bas Milius</strong>
                    <span style="font-size: .875rem; opacity: .6">Engineer</span>
                </FluxItemContent>

                <FluxItemActions is-center>
                    <FluxAction
                        icon="pen"
                        aria-label="Edit"/>
                    <FluxAction
                        is-destructive
                        icon="trash"
                        aria-label="Remove"/>
                </FluxItemActions>
            </FluxItem>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxAvatar, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane } from '@flux-ui/components';
</script>
