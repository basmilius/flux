<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode
                v-for="node of nodes"
                :key="node.id"
                :id="node.id"
                v-bind="positions[node.id]">
                <FluxFlowActionCard :title="node.title" :icon="node.icon"/>
            </FluxFlowNode>

            <FluxFlowConnection
                v-for="wire of connections"
                :key="`${wire.from} ${wire.to}`"
                v-bind="wire"/>
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

    const {positions, connections} = useFlowLayout(nodes, edges, {nodeHeight: 62});
</script>
