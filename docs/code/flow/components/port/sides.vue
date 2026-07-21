<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="build" :x="0" :y="0">
            <FluxFlowActionCard title="Build image" icon="box">
                <div style="display: flex; align-items: center; justify-content: space-between">
                    Artifact ready
                    <FluxFlowPort id="artifact"/>
                </div>

                <template #footer>
                    <FluxTag icon="check" label="Cached"/>
                    <FluxFlowPort id="done" side="bottom" style="margin-left: auto"/>
                </template>
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="publish" :x="390" :y="42">
            <FluxFlowActionCard title="Publish to registry" icon="rocket"/>
        </FluxFlowNode>

        <FluxFlowNode id="report" :x="360" :y="240">
            <FluxFlowActionCard title="Report the build" icon="envelope" color="info"/>
        </FluxFlowNode>

        <FluxFlowConnection from="build" from-port="artifact" to="publish" label="nearest edge"/>
        <FluxFlowConnection from="build" from-port="done" to="report" to-side="left" label="bottom"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxTag } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowPort } from '@flux-ui/flow';
</script>
