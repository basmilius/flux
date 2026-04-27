<template>
    <FluxLayerPane>
        <FluxLayerPaneSecondary>
            Notifications
            <FluxSpacer/>
            <FluxBadge
                color="danger"
                label="3"/>
        </FluxLayerPaneSecondary>

        <FluxPane>
            <FluxItemStack>
                <FluxItem>
                    <FluxItemContent>
                        <strong>Deployment finished</strong>
                        <span>Production environment updated successfully</span>
                    </FluxItemContent>
                </FluxItem>

                <FluxItem>
                    <FluxItemContent>
                        <strong>New comment</strong>
                        <span>Jane left a comment on your pull request</span>
                    </FluxItemContent>
                </FluxItem>

                <FluxItem>
                    <FluxItemContent>
                        <strong>Invite accepted</strong>
                        <span>John joined your workspace</span>
                    </FluxItemContent>
                </FluxItem>
            </FluxItemStack>
        </FluxPane>
    </FluxLayerPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadge, FluxItem, FluxItemContent, FluxItemStack, FluxLayerPane, FluxLayerPaneSecondary, FluxPane, FluxSpacer } from '@flux-ui/components';
</script>
