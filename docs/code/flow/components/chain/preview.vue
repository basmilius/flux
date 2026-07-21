<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowChain>
                <FluxFlowNode id="order">
                    <FluxFlowTriggerCard title="New order" subtitle="Shopify"/>
                </FluxFlowNode>

                <FluxFlowNode id="charge">
                    <FluxFlowActionCard title="Charge the card" icon="money-bill"/>
                </FluxFlowNode>

                <FluxFlowNode id="receipt">
                    <FluxFlowActionCard title="Email the receipt" icon="envelope"/>
                </FluxFlowNode>
            </FluxFlowChain>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
