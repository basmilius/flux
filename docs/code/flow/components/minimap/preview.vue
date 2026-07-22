<template>
    <Preview flush>
        <div style="height: 420px">
            <FluxFlow :padding="21" interactive background="dots">
                <FluxFlowNode id="trigger" :x="210" :y="0">
                    <FluxFlowTriggerCard title="Payment received"/>
                </FluxFlowNode>

                <FluxFlowNode id="check" :x="210" :y="216">
                    <FluxFlowConditionCard title="Amount over €1,000?"/>
                </FluxFlowNode>

                <FluxFlowNode id="review" :x="0" :y="426">
                    <FluxFlowActionCard title="Manual review" icon="gauge" color="warning"/>
                </FluxFlowNode>

                <FluxFlowNode id="approve" :x="420" :y="426">
                    <FluxFlowActionCard title="Auto-approve" icon="circle-check" color="success"/>
                </FluxFlowNode>

                <FluxFlowNode id="book" :x="210" :y="642">
                    <FluxFlowActionCard title="Book the payment" icon="server"/>
                </FluxFlowNode>

                <FluxFlowConnection from="trigger" to="check"/>
                <FluxFlowConnection from="check" to="review" label="Yes"/>
                <FluxFlowConnection from="check" to="approve" label="No"/>
                <FluxFlowConnection from="review" to="book"/>
                <FluxFlowConnection from="approve" to="book"/>

                <FluxFlowMinimap/>
                <FluxFlowControls position="bottom-left"/>
            </FluxFlow>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowControls, FluxFlowMinimap, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
