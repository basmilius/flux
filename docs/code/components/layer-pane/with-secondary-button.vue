<template>
    <FluxLayerPane>
        <FluxLayerPaneSecondary>
            Team members

            <FluxSpacer/>

            <FluxSecondaryButton
                icon-leading="user-plus"
                label="Invite"/>
        </FluxLayerPaneSecondary>

        <FluxPane>
            <FluxItemStack>
                <FluxItem
                    v-for="member in members"
                    :key="member.name">
                    <FluxItemMedia
                        is-center
                        :size="36">
                        <FluxAvatar
                            :alt="member.name"
                            fallback-icon="user"
                            :size="36"/>
                    </FluxItemMedia>

                    <FluxItemContent is-center>
                        <strong>{{ member.name }}</strong>
                        <span>{{ member.role }}</span>
                    </FluxItemContent>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAvatar, FluxItem, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxLayerPaneSecondary, FluxPane, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';

    const members = [
        {name: 'Bas Milius', role: 'Engineer'},
        {name: 'Jane Doe', role: 'Designer'},
        {name: 'John Doe', role: 'Product manager'}
    ];
</script>
