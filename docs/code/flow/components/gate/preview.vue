<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode id="paid" :x="0" :y="0">
                <FluxFlowConditionCard title="Invoice is paid"/>
            </FluxFlowNode>

            <FluxFlowNode id="stock" :x="0" :y="180">
                <FluxFlowConditionCard title="Stock is reserved"/>
            </FluxFlowNode>

            <FluxFlowNode id="gate" :x="390" :y="91">
                <FluxFlowGate type="and" color="primary"/>
            </FluxFlowNode>

            <FluxFlowNode id="ship" :x="546" :y="90">
                <FluxFlowActionCard title="Ship the order" icon="truck"/>
            </FluxFlowNode>

            <FluxFlowConnection from="paid" to="gate" from-side="right" marker-end="none"/>
            <FluxFlowConnection from="stock" to="gate" from-side="right" marker-end="none"/>
            <FluxFlowConnection from="gate" to="ship" marker-start="none" color="primary"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGate, FluxFlowNode } from '@flux-ui/flow';
</script>
