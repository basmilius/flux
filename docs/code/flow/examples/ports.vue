<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="start" :x="60" :y="0">
            <FluxFlowTerminal icon="play" label="Payment received" color="success"/>
        </FluxFlowNode>

        <FluxFlowNode id="check" :x="0" :y="120">
            <FluxFlowConditionCard title="Fraud check" subtitle="Score above 0.8">
                <div style="display: flex; align-items: center; justify-content: space-between">
                    <FluxBadge color="success" icon="circle-check" label="Clean"/>
                    <FluxFlowPort id="true" side="right"/>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between">
                    <FluxBadge color="danger" icon="circle-xmark" label="Suspicious"/>
                    <FluxFlowPort id="false" side="right"/>
                </div>
            </FluxFlowConditionCard>
        </FluxFlowNode>

        <FluxFlowNode id="ship" :x="450" :y="60">
            <FluxFlowActionCard title="Release for shipping" icon="truck"/>
        </FluxFlowNode>

        <FluxFlowNode id="hold" :x="450" :y="213">
            <FluxFlowActionCard title="Hold for review" icon="bell" color="danger"/>
        </FluxFlowNode>

        <FluxFlowNode id="note" :x="495" :y="420">
            <FluxFlowNote title="Manual step">
                A held order waits for the risk team, so nothing downstream runs on it.
            </FluxFlowNote>
        </FluxFlowNode>

        <FluxFlowNode id="done" :x="825" :y="73">
            <FluxFlowTerminal icon="circle-check" label="Done"/>
        </FluxFlowNode>

        <FluxFlowConnection from="start" to="check" marker-start="none"/>
        <FluxFlowConnection from="check" from-port="true" to="ship" color="success"/>
        <FluxFlowConnection from="check" from-port="false" to="hold" color="danger"/>
        <FluxFlowConnection from="ship" to="done" marker-end="none"/>
        <FluxFlowConnection from="note" to="hold" to-side="bottom" marker-start="none" marker-end="none" dashed/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowNote, FluxFlowPort, FluxFlowTerminal } from '@flux-ui/flow';
</script>
