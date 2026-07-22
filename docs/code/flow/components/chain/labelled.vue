<template>
    <FluxFlow :padding="21">
        <FluxFlowChain>
            <FluxFlowNode id="review">
                <FluxFlowConditionCard title="Contract reviewed"/>
            </FluxFlowNode>

            <FluxFlowConnection
                from="review"
                to="sign"
                color="success"
                label="Approved"/>

            <FluxFlowNode id="sign">
                <FluxFlowActionCard title="Collect the signatures" icon="user-check"/>
            </FluxFlowNode>

            <FluxFlowConnection
                from="sign"
                to="archive"
                color="primary"
                icon="circle-check"
                label="Signed"/>

            <FluxFlowNode id="archive">
                <FluxFlowActionCard title="Archive the contract" icon="database"/>
            </FluxFlowNode>
        </FluxFlowChain>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
