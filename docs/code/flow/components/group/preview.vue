<template>
    <Preview flush>
        <FluxFlow :padding="30">
            <FluxFlowChain :y="24">
                <FluxFlowNode id="fetch">
                    <FluxFlowActionCard title="Fetch the invoice" icon="database"/>
                </FluxFlowNode>

                <FluxFlowNode id="verify">
                    <FluxFlowActionCard title="Verify the totals" icon="check"/>
                </FluxFlowNode>
            </FluxFlowChain>

            <FluxFlowGroup
                title="Retry block"
                color="warning"
                :nodes="['fetch', 'verify']"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowGroup, FluxFlowNode } from '@flux-ui/flow';
</script>
