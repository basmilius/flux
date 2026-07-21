<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="trigger" :x="-63" :y="0">
            <FluxFlowPill color="info" icon="bolt" label="Order Released"/>
        </FluxFlowNode>

        <FluxFlowNode id="step-1" :x="0" :y="135">
            <FluxFlowStep :value="1"/>
        </FluxFlowNode>

        <FluxFlowNode id="condition-1" :x="90" :y="90">
            <FluxFlowConditionCard>
                US Shopify orders with matching state or SKU
            </FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="fulfilment-1" :x="480" :y="240">
            <FluxFlowActionCard>
                Set the order's fulfilment profile to Prestons AU
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="hold-1" :x="480" :y="420">
            <FluxFlowActionCard>
                Apply a manual hold
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="step-2" :x="0" :y="615">
            <FluxFlowStep :value="2"/>
        </FluxFlowNode>

        <FluxFlowNode id="condition-2" :x="90" :y="570">
            <FluxFlowConditionCard>
                EU orders shipping from the Rotterdam warehouse
            </FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="fulfilment-2" :x="480" :y="720">
            <FluxFlowActionCard>
                Set delivery to one day delivery
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowConnection from="trigger" to="step-1"/>
        <FluxFlowConnection type="straight" from="step-1" to="condition-1"/>
        <FluxFlowConnection from="step-1" to="step-2"/>
        <FluxFlowConnection type="straight" from="step-2" to="condition-2"/>

        <FluxFlowConnection from="condition-1" to="fulfilment-1" from-side="bottom" to-side="left" label="If true"/>
        <FluxFlowConnection from="condition-1" to="hold-1" from-side="bottom" to-side="left" label="If false"/>
        <FluxFlowConnection from="condition-2" to="fulfilment-2" from-side="bottom" to-side="left" label="If true"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPill, FluxFlowStep } from '@flux-ui/flow';
</script>
