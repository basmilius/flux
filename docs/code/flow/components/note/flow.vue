<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="sync" :x="0" :y="15">
            <FluxFlowTriggerCard title="Nightly sync" subtitle="Every day at 03:00"/>
        </FluxFlowNode>

        <FluxFlowNode id="import" :x="0" :y="195">
            <FluxFlowActionCard title="Import the orders" icon="database"/>
        </FluxFlowNode>

        <FluxFlowNode id="window" :x="390" :y="0">
            <FluxFlowNote title="Heads up" color="warning">
                The window closes at 04:00, so a retry never runs twice.
            </FluxFlowNote>
        </FluxFlowNode>

        <FluxFlowNode id="mapping" :x="390" :y="193">
            <FluxFlowNote>
                Legacy SKUs are mapped in the importer, not here.
            </FluxFlowNote>
        </FluxFlowNode>

        <FluxFlowConnection from="sync" to="import"/>
        <FluxFlowConnection from="window" to="sync" to-side="right" marker-start="none" marker-end="none" color="warning" dashed/>
        <FluxFlowConnection from="mapping" to="import" to-side="right" marker-start="none" marker-end="none" dashed/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowNote, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
