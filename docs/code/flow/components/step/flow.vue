<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="step-1" :x="0" :y="13">
            <FluxFlowStep :value="1"/>
        </FluxFlowNode>

        <FluxFlowNode id="pull" :x="90" :y="0">
            <FluxFlowActionCard title="Pull new orders"/>
        </FluxFlowNode>

        <FluxFlowNode id="step-2" :x="0" :y="193">
            <FluxFlowStep :value="2"/>
        </FluxFlowNode>

        <FluxFlowNode id="route" :x="90" :y="180">
            <FluxFlowConditionCard title="Ships from the EU"/>
        </FluxFlowNode>

        <FluxFlowNode id="step-3" :x="0" :y="373">
            <FluxFlowStep :value="3"/>
        </FluxFlowNode>

        <FluxFlowNode id="notify" :x="90" :y="360">
            <FluxFlowActionCard title="Notify the warehouse"/>
        </FluxFlowNode>

        <FluxFlowConnection marker-start="none" from="step-1" to="pull"/>
        <FluxFlowConnection marker-start="none" from="step-1" to="step-2"/>
        <FluxFlowConnection marker-start="none" from="step-2" to="route"/>
        <FluxFlowConnection marker-start="none" from="step-2" to="step-3"/>
        <FluxFlowConnection marker-start="none" from="step-3" to="notify"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowStep } from '@flux-ui/flow';
</script>
