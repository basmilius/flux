<template>
    <Preview>
        <FluxFlowConditionCard title="Amount over €100">
            Routes high-value orders for manual review.

            <template #footer>
                <FluxBadge label="2 branches"/>
            </template>
        </FluxFlowConditionCard>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxFlowConditionCard } from '@flux-ui/flow';
</script>
