<template>
    <div style="height: 540px">
        <FluxFlow :padding="21" interactive background="dots">
            <FluxFlowGraph :trunk="['trigger', 'step-1', 'step-2']">
                <FluxFlowNode id="trigger">
                    <FluxFlowPill color="info" icon="bolt" label="Order Released"/>
                </FluxFlowNode>

                <FluxFlowNode id="step-1">
                    <FluxFlowStep :value="1"/>
                </FluxFlowNode>

                <FluxFlowNode id="condition-1">
                    <FluxFlowConditionCard>
                        US Shopify orders with matching state or SKU
                    </FluxFlowConditionCard>
                </FluxFlowNode>

                <FluxFlowNode id="fulfilment-1">
                    <FluxFlowActionCard>
                        Set the order's fulfilment profile to Prestons AU
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="hold-1">
                    <FluxFlowActionCard>
                        Apply a manual hold
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowNode id="step-2">
                    <FluxFlowStep :value="2"/>
                </FluxFlowNode>

                <FluxFlowNode id="condition-2">
                    <FluxFlowConditionCard>
                        EU orders shipping from the Rotterdam warehouse
                    </FluxFlowConditionCard>
                </FluxFlowNode>

                <FluxFlowNode id="fulfilment-2">
                    <FluxFlowActionCard>
                        Set delivery to one day delivery
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowConnection from="trigger" to="step-1"/>
                <FluxFlowConnection from="step-1" to="condition-1" to-align="start"/>
                <FluxFlowConnection from="step-1" to="step-2"/>
                <FluxFlowConnection from="step-2" to="condition-2" to-align="start"/>

                <FluxFlowConnection from="condition-1" to="fulfilment-1" from-side="bottom" from-align="start" to-side="left" to-align="start" label="If true" label-placement="last-leg"/>
                <FluxFlowConnection from="condition-1" to="hold-1" from-side="bottom" from-align="start" to-side="left" to-align="start" label="If false" label-placement="last-leg"/>
                <FluxFlowConnection from="condition-2" to="fulfilment-2" from-side="bottom" from-align="start" to-side="left" to-align="start" label="If true" label-placement="last-leg"/>
            </FluxFlowGraph>

            <FluxFlowControls/>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowControls, FluxFlowGraph, FluxFlowNode, FluxFlowPill, FluxFlowStep } from '@flux-ui/flow';
</script>
