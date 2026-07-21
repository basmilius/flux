<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="route" :x="0" :y="60">
            <FluxFlowConditionCard title="Route ticket" subtitle="By queue">
                <div style="display: flex; align-items: center; justify-content: space-between">
                    Billing
                    <FluxFlowPort id="billing" side="right"/>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between">
                    Technical
                    <FluxFlowPort id="technical" side="right"/>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between">
                    Anything else
                    <FluxFlowPort id="other" side="right"/>
                </div>
            </FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="finance" :x="390" :y="0">
            <FluxFlowActionCard title="Notify finance" icon="envelope"/>
        </FluxFlowNode>

        <FluxFlowNode id="oncall" :x="390" :y="153">
            <FluxFlowActionCard title="Page on-call" icon="bell" color="warning"/>
        </FluxFlowNode>

        <FluxFlowNode id="inbox" :x="390" :y="300">
            <FluxFlowActionCard title="Park in the inbox" icon="box" color="gray"/>
        </FluxFlowNode>

        <FluxFlowConnection from="route" from-port="billing" to="finance"/>
        <FluxFlowConnection from="route" from-port="technical" to="oncall" color="warning"/>
        <FluxFlowConnection from="route" from-port="other" to="inbox" color="gray" dashed/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPort } from '@flux-ui/flow';
</script>
