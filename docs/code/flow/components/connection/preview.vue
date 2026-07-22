<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode id="source" :x="0" :y="0">
                <FluxFlowTriggerCard title="Form Submitted"/>
            </FluxFlowNode>

            <FluxFlowNode id="target" :x="0" :y="180">
                <FluxFlowActionCard title="Store Lead"/>
            </FluxFlowNode>

            <FluxFlowConnection from="source" to="target" label="Always"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
