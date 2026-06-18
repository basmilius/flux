<template>
    <Preview>
        <FluxPane style="width: min(100%, 480px)">
            <FluxItem>
                <FluxItemMedia
                    is-center
                    :size="40">
                    <FluxBoxedIcon
                        color="info"
                        name="user-plus"
                        :size="40"/>
                </FluxItemMedia>

                <FluxItemContent is-center>
                    <strong>Jane Doe</strong>
                    <span style="font-size: .875rem; opacity: .6">Invited you to collaborate</span>
                </FluxItemContent>

                <FluxItemActions is-center>
                    <FluxSecondaryButton label="Decline"/>
                    <FluxPrimaryButton label="Accept"/>
                </FluxItemActions>
            </FluxItem>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBoxedIcon, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxPane, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
