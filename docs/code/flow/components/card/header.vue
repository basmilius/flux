<template>
    <FluxFlowActionCard title="Send the invoice" subtitle="Once per order" icon="paper-plane">
        <template #header>
            <FluxBadge color="success" label="Live"/>
        </template>

        Delivers the invoice to the billing address on file.
    </FluxFlowActionCard>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxFlowActionCard } from '@flux-ui/flow';
</script>
