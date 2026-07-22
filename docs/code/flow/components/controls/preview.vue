<template>
    <Preview flush>
        <div style="height: 390px">
            <FluxFlow :padding="21" interactive background="dots">
                <FluxFlowNode id="trigger" :x="0" :y="0">
                    <FluxFlowTriggerCard title="Payment received"/>
                </FluxFlowNode>

                <FluxFlowNode id="check" :x="0" :y="216">
                    <FluxFlowConditionCard title="Amount over €1,000?"/>
                </FluxFlowNode>

                <FluxFlowConnection from="trigger" to="check"/>

                <FluxFlowControls/>
            </FluxFlow>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowConditionCard, FluxFlowConnection, FluxFlowControls, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
