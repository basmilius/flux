<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowLane title="Client" :y="0" :height="150"/>
            <FluxFlowLane title="Server" color="info" :y="180" :height="150"/>

            <FluxFlowNode id="browser" :x="0" :y="44">
                <FluxFlowActionCard title="Submit the form" icon="paper-plane"/>
            </FluxFlowNode>

            <FluxFlowNode id="api" :x="0" :y="224">
                <FluxFlowActionCard title="Validate the payload" icon="check"/>
            </FluxFlowNode>

            <FluxFlowNode id="store" :x="411" :y="224">
                <FluxFlowActionCard title="Write to the database" icon="database"/>
            </FluxFlowNode>

            <FluxFlowConnection from="browser" to="api"/>
            <FluxFlowConnection from="api" to="store"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowLane, FluxFlowNode } from '@flux-ui/flow';
</script>
