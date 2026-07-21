<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="trigger" :x="69" :y="0">
            <FluxFlowPill color="info" icon="bolt" label="Order Released"/>
        </FluxFlowNode>

        <FluxFlowNode id="check" :x="0" :y="150">
            <FluxFlowConditionCard title="Ships from the EU"/>
        </FluxFlowNode>

        <FluxFlowConnection from="trigger" to="check"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
</script>
