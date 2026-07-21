<template>
    <!-- Room under the row for the retry loop and its badge. -->
    <FluxFlow :padding="45">
        <FluxFlowNode
            v-for="node of nodes"
            :key="node.id"
            :id="node.id"
            :x="positions[node.id].x"
            :y="positions[node.id].y">
            <FluxFlowPill :icon="node.icon" :label="node.label" :color="node.color"/>
        </FluxFlowNode>

        <FluxFlowConnection
            v-for="edge of edges"
            :key="`${edge.from} ${edge.to}`"
            :from="edge.from"
            :to="edge.to"
            :from-side="edge.fromSide ?? 'right'"
            :to-side="edge.toSide ?? 'left'"
            :dashed="edge.dashed"
            :label="edge.label"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxFlow, FluxFlowConnection, FluxFlowNode, FluxFlowPill, type FluxFlowSide, useFlowLayout } from '@flux-ui/flow';

    type Edge = {
        from: string;
        to: string;
        fromSide?: FluxFlowSide;
        toSide?: FluxFlowSide;
        dashed?: boolean;
        label?: string;
    };

    const nodes: { id: string; label: string; icon: FluxIconName; color: FluxColor }[] = [
        {id: 'queued', label: 'Queued', icon: 'stopwatch', color: 'gray'},
        {id: 'building', label: 'Building', icon: 'box', color: 'info'},
        {id: 'testing', label: 'Testing', icon: 'robot', color: 'info'},
        {id: 'released', label: 'Released', icon: 'rocket', color: 'success'}
    ];

    const edges: Edge[] = [
        {from: 'queued', to: 'building'},
        {from: 'building', to: 'testing'},
        {from: 'testing', to: 'released'},
        // A cycle, cut open by the layout instead of followed: the retry loops
        // back under the row rather than opening a fifth layer.
        {from: 'released', to: 'building', fromSide: 'bottom', toSide: 'bottom', dashed: true, label: 'retry'}
    ];

    const positions = useFlowLayout(nodes, edges, {
        direction: 'horizontal',
        nodeWidth: 162,
        nodeHeight: 44,
        layerGap: 45
    });
</script>
