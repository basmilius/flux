<template>
    <div style="height: 450px">
        <FluxFlow :padding="21" interactive axis="vertical" background="dots">
            <FluxFlowGraph>
                <FluxFlowNode id="push">
                    <FluxFlowTriggerCard title="Push to main" subtitle="Every commit"/>
                </FluxFlowNode>

                <FluxFlowNode id="lint">
                    <FluxFlowPill color="info" icon="code-branch" label="Lint"/>
                </FluxFlowNode>

                <FluxFlowNode id="test">
                    <FluxFlowPill color="info" icon="gauge-high" label="Unit tests"/>
                </FluxFlowNode>

                <FluxFlowNode id="audit">
                    <FluxFlowPill color="info" icon="file-lines" label="Audit"/>
                </FluxFlowNode>

                <FluxFlowNode id="build">
                    <FluxFlowActionCard title="Build image" icon="server"/>
                </FluxFlowNode>

                <FluxFlowNode id="ship">
                    <FluxFlowTerminal color="success" icon="circle-check" label="Shipped"/>
                </FluxFlowNode>

                <FluxFlowConnection from="push" to="lint"/>
                <FluxFlowConnection from="push" to="test"/>
                <FluxFlowConnection from="push" to="audit"/>
                <FluxFlowConnection from="lint" to="build"/>
                <FluxFlowConnection from="test" to="build"/>
                <FluxFlowConnection from="audit" to="build"/>
                <FluxFlowConnection from="build" to="ship"/>
            </FluxFlowGraph>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowGraph, FluxFlowNode, FluxFlowPill, FluxFlowTerminal, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
