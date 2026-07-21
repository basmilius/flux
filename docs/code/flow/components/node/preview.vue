<template>
    <Preview flush>
        <FluxFlow>
            <FluxFlowNode id="a" :x="0" :y="0">
                <FluxFlowCard title="Node A">
                    Positioned at (0, 0) in flow coordinates.
                </FluxFlowCard>
            </FluxFlowNode>

            <FluxFlowNode id="b" :x="330" :y="90">
                <FluxFlowCard title="Node B">
                    Positioned at (360, 120) in flow coordinates.
                </FluxFlowCard>
            </FluxFlowNode>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowCard, FluxFlowNode } from '@flux-ui/flow';
</script>
