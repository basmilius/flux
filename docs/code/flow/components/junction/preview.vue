<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode id="orders" :x="0" :y="0">
                <FluxFlowPill color="info" icon="bolt" label="Order placed"/>
            </FluxFlowNode>

            <FluxFlowNode id="returns" :x="0" :y="90">
                <FluxFlowPill color="info" icon="bolt" label="Order returned"/>
            </FluxFlowNode>

            <FluxFlowNode id="merge" :x="240" :y="58">
                <FluxFlowJunction color="primary"/>
            </FluxFlowNode>

            <FluxFlowNode id="ledger" :x="375" :y="45">
                <FluxFlowPill color="primary" icon="database" label="Update the ledger"/>
            </FluxFlowNode>

            <FluxFlowConnection from="orders" to="merge" from-side="right" marker-end="none"/>
            <FluxFlowConnection from="returns" to="merge" from-side="right" marker-end="none"/>
            <FluxFlowConnection from="merge" to="ledger" marker-start="none" color="primary"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConnection, FluxFlowJunction, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
</script>
