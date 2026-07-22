<template>
    <Preview flush>
        <div style="height: 390px">
            <FluxFlow :padding="21" interactive background="dots">
                <FluxFlowNode id="trigger" :x="0" :y="0">
                    <FluxFlowTriggerCard title="Nightly sync" subtitle="03:00"/>
                </FluxFlowNode>

                <FluxFlowNode id="import" :x="0" :y="216">
                    <FluxFlowActionCard title="Import orders" icon="server"/>
                </FluxFlowNode>

                <FluxFlowConnection from="trigger" to="import"/>

                <FluxFlowPanel position="top-left">
                    <FluxFlowNote title="Legend">
                        Blue heads the flow, purple does the work.
                    </FluxFlowNote>
                </FluxFlowPanel>
            </FluxFlow>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowNote, FluxFlowPanel, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
