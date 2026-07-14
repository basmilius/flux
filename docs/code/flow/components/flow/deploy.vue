<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="push" :x="0" :y="120">
            <FluxFlowTriggerCard title="Code Pushed" icon="code-branch">
                Triggered on every push to the main branch.
            </FluxFlowTriggerCard>
        </FluxFlowNode>

        <FluxFlowNode id="build" :x="360" :y="120">
            <FluxFlowActionCard title="Build Image" label="Job" icon="server" color="primary">
                <FluxFlowCardRow label="Runner" leader>ubuntu-latest</FluxFlowCardRow>
                <FluxFlowCardRow label="Duration" leader>2m 14s</FluxFlowCardRow>
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="test" :x="720" :y="120">
            <FluxFlowConditionCard title="Tests Pass?"/>
        </FluxFlowNode>

        <FluxFlowNode id="deploy" :x="1080" :y="0">
            <FluxFlowActionCard title="Deploy" label="Release" icon="circle-check" color="success">
                Ships the image to production.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="notify" :x="1080" :y="270">
            <FluxFlowActionCard title="Notify Team" label="Alert" icon="envelope" color="danger">
                Posts the failure to the on-call channel.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowConnection from="push" to="build" from-side="right" to-side="left"/>
        <FluxFlowConnection from="build" to="test" from-side="right" to-side="left"/>
        <FluxFlowConnection from="test" to="deploy" from-side="right" to-side="left" label="pass" color="success"/>
        <FluxFlowConnection from="test" to="notify" from-side="right" to-side="left" label="fail" color="danger" dashed/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowCardRow, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
