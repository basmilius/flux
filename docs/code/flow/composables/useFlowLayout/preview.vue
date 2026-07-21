<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode
                v-for="node of nodes"
                :key="node.id"
                :id="node.id"
                :x="positions[node.id].x"
                :y="positions[node.id].y">
                <FluxFlowActionCard :title="node.title" :icon="node.icon"/>
            </FluxFlowNode>

            <FluxFlowConnection
                v-for="edge of edges"
                :key="`${edge.from} ${edge.to}`"
                from-side="bottom"
                to-side="top"
                :from="edge.from"
                :to="edge.to"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import type { FluxIconName } from '@flux-ui/types';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, useFlowLayout } from '@flux-ui/flow';

    const nodes: { id: string; title: string; icon: FluxIconName }[] = [
        {id: 'intake', title: 'Intake the lead', icon: 'database'},
        {id: 'verify', title: 'Verify the email', icon: 'envelope'},
        {id: 'enrich', title: 'Enrich the company', icon: 'brain'},
        {id: 'score', title: 'Score the lead', icon: 'gauge'}
    ];

    const edges = [
        {from: 'intake', to: 'verify'},
        {from: 'intake', to: 'enrich'},
        {from: 'verify', to: 'score'},
        {from: 'enrich', to: 'score'}
    ];

    const positions = useFlowLayout(nodes, edges, {nodeHeight: 62});
</script>
