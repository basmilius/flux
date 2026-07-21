<template>
    <!-- Room under the row for the retry loop and its badge. -->
    <FluxFlow :padding="45">
        <FluxFlowNode
            v-for="node of nodes"
            :key="node.id"
            :id="node.id"
            v-bind="positions[node.id]">
            <FluxFlowPill :icon="node.icon" :label="node.label" :color="node.color"/>
        </FluxFlowNode>

        <FluxFlowConnection
            v-for="wire of wires"
            :key="`${wire.from} ${wire.to}`"
            v-bind="wire"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxFlow, FluxFlowConnection, FluxFlowNode, FluxFlowPill, useFlowLayout } from '@flux-ui/flow';

    const nodes: { id: string; label: string; icon: FluxIconName; color: FluxColor }[] = [
        {id: 'queued', label: 'Queued', icon: 'stopwatch', color: 'gray'},
        {id: 'building', label: 'Building', icon: 'box', color: 'info'},
        {id: 'testing', label: 'Testing', icon: 'robot', color: 'info'},
        {id: 'released', label: 'Released', icon: 'rocket', color: 'success'}
    ];

    const edges = [
        {from: 'queued', to: 'building'},
        {from: 'building', to: 'testing'},
        {from: 'testing', to: 'released'},
        // A cycle. The layout cuts it open instead of following it, and hands it
        // back with sides that loop under the row rather than back through it.
        {from: 'released', to: 'building'}
    ];

    // How a connector looks is yours; where it attaches comes from the layout.
    const style: Record<string, { dashed?: boolean; label?: string }> = {
        'released->building': {dashed: true, label: 'retry'}
    };

    const {positions, connections} = useFlowLayout(nodes, edges, {
        direction: 'horizontal',
        nodeWidth: 162,
        nodeHeight: 44,
        layerGap: 45
    });

    const wires = connections.map(wire => ({...wire, ...style[`${wire.from}->${wire.to}`]}));
</script>
