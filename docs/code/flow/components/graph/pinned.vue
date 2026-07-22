<template>
    <div style="height: 390px">
        <FluxFlow :padding="21" interactive axis="vertical" background="dots">
            <FluxFlowGraph>
                <FluxFlowNode id="order">
                    <FluxFlowTriggerCard title="Order placed"/>
                </FluxFlowNode>

                <FluxFlowNode id="charge">
                    <FluxFlowActionCard title="Charge the card" icon="server"/>
                </FluxFlowNode>

                <FluxFlowNode id="receipt">
                    <FluxFlowActionCard title="Send the receipt" icon="paper-plane"/>
                </FluxFlowNode>

                <!-- Carries its own coordinates, so the layout leaves it where it
                     is and lays the three cards out around it. -->
                <FluxFlowNode id="note" :x="360" :y="102">
                    <FluxFlowNote title="Retries">
                        A charge that is declined is retried twice before the order is released.
                    </FluxFlowNote>
                </FluxFlowNode>

                <FluxFlowConnection from="order" to="charge"/>
                <FluxFlowConnection from="charge" to="receipt"/>
                <FluxFlowConnection from="charge" to="note" from-side="right" to-side="left" marker-start="none" marker-end="none" dotted/>
            </FluxFlowGraph>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowGraph, FluxFlowNode, FluxFlowNote, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
