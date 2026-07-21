<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="slack" :x="0" :y="0">
            <FluxFlowCard title="Slack" subtitle="1,204 threads"/>
        </FluxFlowNode>

        <FluxFlowNode id="gmail" :x="0" :y="150">
            <FluxFlowCard title="Gmail" subtitle="Support inbox"/>
        </FluxFlowNode>

        <FluxFlowNode id="zendesk" :x="0" :y="300">
            <FluxFlowCard title="Zendesk" subtitle="8,612 tickets"/>
        </FluxFlowNode>

        <FluxFlowNode id="merge" :x="411" :y="181">
            <FluxFlowJunction color="primary"/>
        </FluxFlowNode>

        <FluxFlowNode id="index" :x="546" :y="159">
            <FluxFlowActionCard title="Index the corpus" icon="database"/>
        </FluxFlowNode>

        <FluxFlowConnection from="slack" to="merge" from-side="right" marker-end="none"/>
        <FluxFlowConnection from="gmail" to="merge" from-side="right" marker-end="none"/>
        <FluxFlowConnection from="zendesk" to="merge" from-side="right" marker-end="none"/>
        <FluxFlowConnection from="merge" to="index" marker-start="none" color="primary"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowCard, FluxFlowConnection, FluxFlowJunction, FluxFlowNode } from '@flux-ui/flow';
</script>
