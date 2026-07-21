<template>
    <Preview flush>
        <FluxFlow :padding="21">
            <FluxFlowNode id="review" :x="0" :y="60">
                <FluxFlowConditionCard title="Review order">
                    <div style="display: flex; align-items: center; justify-content: space-between">
                        Approved
                        <FluxFlowPort id="approved" side="right"/>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between">
                        Rejected
                        <FluxFlowPort id="rejected" side="right"/>
                    </div>
                </FluxFlowConditionCard>
            </FluxFlowNode>

            <FluxFlowNode id="ship" :x="390" :y="0">
                <FluxFlowActionCard title="Ship order" icon="truck"/>
            </FluxFlowNode>

            <FluxFlowNode id="refund" :x="390" :y="135">
                <FluxFlowActionCard title="Refund" icon="circle-xmark" color="danger"/>
            </FluxFlowNode>

            <FluxFlowConnection from="review" from-port="approved" to="ship"/>
            <FluxFlowConnection from="review" from-port="rejected" to="refund" color="danger"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPort } from '@flux-ui/flow';
</script>
