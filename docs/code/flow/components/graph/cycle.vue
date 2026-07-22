<template>
    <div style="height: 390px">
        <FluxFlow :padding="21" interactive axis="vertical" background="dots">
            <FluxFlowGraph>
                <FluxFlowNode id="fetch">
                    <FluxFlowActionCard title="Fetch the invoice" icon="database"/>
                </FluxFlowNode>

                <FluxFlowNode id="validate">
                    <FluxFlowConditionCard title="Is the total settled?"/>
                </FluxFlowNode>

                <FluxFlowNode id="store">
                    <FluxFlowActionCard title="Store the result" icon="box" color="success"/>
                </FluxFlowNode>

                <FluxFlowConnection from="fetch" to="validate"/>
                <FluxFlowConnection from="validate" to="store" label="Yes"/>

                <!-- Runs back against the flow, so it takes the off axis and
                     loops around the diagram instead of cutting across it. -->
                <FluxFlowConnection
                    from="validate"
                    to="fetch"
                    from-side="right"
                    to-side="right"
                    color="warning"
                    label="No"
                    dashed/>
            </FluxFlowGraph>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowGraph, FluxFlowNode } from '@flux-ui/flow';
</script>
