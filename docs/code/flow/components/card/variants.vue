<template>
    <FluxFlex
        :gap="48"
        style="flex-wrap: wrap; align-items: flex-start; justify-content: center; padding: 12px 0">
        <FluxFlowTriggerCard title="Webhook Received">
            Fires whenever a request hits the endpoint.
        </FluxFlowTriggerCard>

        <FluxFlowConditionCard title="Amount over €100">
            Routes high-value orders for manual review.
        </FluxFlowConditionCard>

        <FluxFlowActionCard title="Send Invoice">
            Emails the generated invoice to the customer.
        </FluxFlowActionCard>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxFlowActionCard, FluxFlowConditionCard, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
