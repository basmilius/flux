<template>
    <FluxLayerPane style="max-width: 390px">
        <FluxClickablePaneHeader
            title="Bas Milius"
            sub-title="View your profile"
            href="#">
            <template #before>
                <FluxAvatar
                    alt="Bas Milius"
                    fallback-icon="user"
                    :size="36"/>
            </template>
        </FluxClickablePaneHeader>

        <FluxPane>
            <FluxPaneBody>Manage your account details, security and preferences.</FluxPaneBody>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxClickablePaneHeader, FluxLayerPane, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
