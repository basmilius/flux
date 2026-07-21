<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="trigger" :x="-4" :y="0">
            <FluxFlowPill color="info" icon="bolt" label="Order Released"/>
        </FluxFlowNode>

        <FluxFlowNode id="step-1" :x="0" :y="103">
            <FluxFlowStep :value="1"/>
        </FluxFlowNode>

        <FluxFlowNode id="condition-1" :x="90" :y="90">
            <FluxFlowConditionCard>
                US Shopify orders with matching state or SKU
            </FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="fulfilment-1" :x="270" :y="249">
            <FluxFlowActionCard>
                Set the order's fulfilment profile to Prestons AU
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="hold-1" :x="270" :y="411">
            <FluxFlowActionCard>
                Apply a manual hold
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="step-2" :x="0" :y="562">
            <FluxFlowStep :value="2"/>
        </FluxFlowNode>

        <FluxFlowNode id="condition-2" :x="90" :y="549">
            <FluxFlowConditionCard>
                EU orders shipping from the Rotterdam warehouse
            </FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="fulfilment-2" :x="270" :y="711">
            <FluxFlowActionCard>
                Set delivery to one day delivery
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowConnection from="trigger" to="step-1" from-align="start"/>
        <FluxFlowConnection from="step-1" to="condition-1" to-align="start"/>
        <FluxFlowConnection from="step-1" to="step-2"/>
        <FluxFlowConnection from="step-2" to="condition-2" to-align="start"/>

        <FluxFlowConnection from="condition-1" to="fulfilment-1" from-side="bottom" from-align="start" to-side="left" to-align="start" label="If true"/>
        <FluxFlowConnection from="condition-1" to="hold-1" from-side="bottom" from-align="start" to-side="left" to-align="start" label="If false"/>
        <FluxFlowConnection from="condition-2" to="fulfilment-2" from-side="bottom" from-align="start" to-side="left" to-align="start" label="If true"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPill, FluxFlowStep } from '@flux-ui/flow';
</script>
