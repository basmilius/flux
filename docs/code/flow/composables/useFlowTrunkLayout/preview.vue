<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode
                v-for="step of trunk"
                :key="step.id"
                :id="step.id"
                v-bind="positions[step.id]">
                <FluxFlowStep :value="step.value"/>
            </FluxFlowNode>

            <FluxFlowNode
                v-for="node of branches"
                :key="node.id"
                :id="node.id"
                v-bind="positions[node.id]">
                <FluxFlowActionCard
                    :title="node.title"
                    :icon="node.icon"/>
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
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowStep, useFlowTrunkLayout } from '@flux-ui/flow';
    import type { FluxIconName } from '@flux-ui/types';

    const trunk: { id: string; value: number }[] = [
        {id: 'rule-1', value: 1},
        {id: 'rule-2', value: 2}
    ];

    const branches: { id: string; title: string; icon: FluxIconName }[] = [
        {id: 'notify', title: 'Notify the owner', icon: 'envelope'},
        {id: 'archive', title: 'Archive the order', icon: 'box-archive'},
        {id: 'hold', title: 'Hold for review', icon: 'user-check'}
    ];

    const nodes = [
        ...trunk.map(step => ({id: step.id, width: 36, height: 36})),
        ...branches.map(node => ({id: node.id, height: 62}))
    ];

    const edges = [
        {from: 'rule-1', to: 'notify'},
        {from: 'notify', to: 'archive'},
        {from: 'rule-2', to: 'hold'}
    ];

    const {positions, connections} = useFlowTrunkLayout(nodes, edges, ['rule-1', 'rule-2']);
</script>
