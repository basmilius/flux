<template>
    <FluxFlow :padding="21">
        <FluxFlowChain>
            <FluxFlowNode id="push">
                <FluxFlowTriggerCard title="Push to main" subtitle="GitHub"/>
            </FluxFlowNode>

            <FluxFlowConnection
                from="push"
                to="build"
                color="primary"
                label="on main"/>

            <FluxFlowNode id="build">
                <FluxFlowActionCard title="Build the image" icon="box"/>
            </FluxFlowNode>

            <FluxFlowNode id="deploy">
                <FluxFlowActionCard title="Deploy to production" icon="rocket"/>
            </FluxFlowNode>
        </FluxFlowChain>

        <FluxFlowNode id="alert" :x="411" :y="280">
            <FluxFlowActionCard title="Alert the on-call" icon="bell" color="danger"/>
        </FluxFlowNode>

        <FluxFlowConnection
            dashed
            from="build"
            to="alert"
            from-side="right"
            color="danger"
            label="build failed"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
