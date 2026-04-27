<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxBadgeStack>
                <FluxBadge
                    label="Open"/>
                <FluxBadge
                    label="Pending"/>
                <FluxBadge
                    label="Closed"/>
                <FluxBadge
                    label="Rejected"/>
            </FluxBadgeStack>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxBadgeStack, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
