<template>
    <FluxLayerPane>
        <FluxLayerPaneSecondary>Team members</FluxLayerPaneSecondary>

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

                    <FluxItemActions is-center>
                        <FluxBadge
                            :color="member.color"
                            :label="member.status"/>
                    </FluxItemActions>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import { FluxAvatar, FluxBadge, FluxItem, FluxItemActions, FluxItemContent, FluxItemMedia, FluxItemStack, FluxLayerPane, FluxLayerPaneSecondary, FluxPane } from '@flux-ui/components';

    const members: { name: string; role: string; status: string; color: FluxColor }[] = [
        {name: 'Bas Milius', role: 'Engineer', status: 'Active', color: 'success'},
        {name: 'Jane Doe', role: 'Designer', status: 'Active', color: 'success'},
        {name: 'John Doe', role: 'Product manager', status: 'Away', color: 'warning'}
    ];
</script>
