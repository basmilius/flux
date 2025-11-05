<template>
    <FluxPane style="max-width: max-content">
        <FluxPaneBody>
            <FluxFlyout
                direction="horizontal">
                <template #opener="{ open }">
                    <FluxPersona
                        name="Bas Milius"
                        title="Flux engineer"
                        :avatar-size="42"
                        avatar-src="https://avatars.githubusercontent.com/u/978257?v=4"
                        @click="open"/>
                </template>

                <FluxPaneHeader title="Bas Milius" sub-title="Flux engineer">
                    <template #before>
                        <FluxAvatar
                            :size="42"
                            src="https://avatars.githubusercontent.com/u/978257?v=4"/>
                    </template>
                </FluxPaneHeader>

                <FluxPaneBody style="max-width: 350px">
                    <p>a 29-year-old self-taught developer from The Netherlands</p>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton
                        icon-leading="message"
                        label="Send message"/>

                    <FluxSpacer/>

                    <FluxSecondaryButton
                        icon-leading="globe"
                        label="Website"/>
                </FluxPaneFooter>
            </FluxFlyout>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxFlyout, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPersona, FluxSecondaryButton, FluxSeparator, FluxSpacer } from '@flux-ui/components';
</script>
