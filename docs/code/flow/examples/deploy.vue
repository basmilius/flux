<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="push" :x="0" :y="126">
            <FluxFlowTriggerCard title="Code Pushed" icon="code-branch">
                Triggered on every push to the main branch.
            </FluxFlowTriggerCard>
        </FluxFlowNode>

        <FluxFlowNode id="build" :x="360" :y="120">
            <FluxFlowActionCard title="Build Image" icon="server" color="primary">
                <FluxDescriptionList>
                    <FluxDescriptionItem label="Runner">ubuntu-latest</FluxDescriptionItem>
                    <FluxDescriptionItem label="Duration">2m 14s</FluxDescriptionItem>
                </FluxDescriptionList>
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="test" :x="720" :y="158">
            <FluxFlowConditionCard title="Tests Pass?"/>
        </FluxFlowNode>

        <FluxFlowNode id="deploy" :x="1080" :y="18">
            <FluxFlowActionCard title="Deploy" icon="circle-check" color="success">
                Ships the image to production.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="notify" :x="1080" :y="246">
            <FluxFlowActionCard title="Notify Team" icon="envelope" color="danger">
                Posts the failure to the on-call channel.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowConnection from="push" to="build" from-side="right" to-side="left"/>
        <FluxFlowConnection from="build" to="test" from-side="right" to-side="left"/>
        <FluxFlowConnection from="test" to="deploy" from-side="right" to-side="left" label="Pass" color="success"/>
        <FluxFlowConnection from="test" to="notify" from-side="right" to-side="left" label="Fail" color="danger" dashed/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConditionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
