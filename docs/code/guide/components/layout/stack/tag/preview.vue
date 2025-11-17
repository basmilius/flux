<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxTagStack>
                    <FluxTag
                        label="Open"/>

                    <FluxTag
                        label="Pending"/>

                    <FluxTag
                        label="Closed"/>

                    <FluxTag
                        label="Rejected"/>
                </FluxTagStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxTag, FluxTagStack } from '@flux-ui/components';
</script>
