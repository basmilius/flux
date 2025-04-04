<template>
    <Preview>
        <FluxPane style="width: max-content">
            <FluxPaneBody>
                <FluxBadgeStack>
                    <FluxChip
                        icon-leading="sparkles"
                        label="New user"/>

                    <FluxChip
                        icon-leading="location-dot"
                        label="Groenlo"/>
                </FluxBadgeStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBadgeStack, FluxChip, FluxPane, FluxPaneBody } from '@basmilius/flux';
</script>
