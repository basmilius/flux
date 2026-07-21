<template>
    <FluxFlow :padding="30">
        <FluxFlowChain :x="0" :y="0">
            <FluxFlowNode id="collect">
                <FluxFlowActionCard title="Collect the readings" icon="database"/>
            </FluxFlowNode>

            <FluxFlowNode id="clean">
                <FluxFlowActionCard title="Drop the outliers" icon="wand-magic-sparkles"/>
            </FluxFlowNode>
        </FluxFlowChain>

        <FluxFlowChain :x="411" :y="122">
            <FluxFlowNode id="report">
                <FluxFlowActionCard title="Render the report" icon="gauge"/>
            </FluxFlowNode>

            <FluxFlowNode id="mail">
                <FluxFlowActionCard title="Mail the subscribers" icon="paper-plane"/>
            </FluxFlowNode>
        </FluxFlowChain>

        <FluxFlowGroup
            title="Ingest"
            color="info"
            :nodes="['collect', 'clean']"/>

        <FluxFlowGroup
            title="Deliver"
            color="success"
            :nodes="['report', 'mail']"/>

        <FluxFlowConnection from="clean" to="report" from-side="right"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowConnection, FluxFlowGroup, FluxFlowNode } from '@flux-ui/flow';
</script>
