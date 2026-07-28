<template>
    <Preview>
        <FluxFlowTriggerCard title="Webhook Received">
            Fires whenever a request hits the endpoint.

            <template #footer>
                <FluxTag icon="globe" label="POST /orders"/>
            </template>
        </FluxFlowTriggerCard>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxTag } from '@flux-ui/components';
    import { FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
