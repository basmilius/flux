<template>
    <FluxFlow :padding="30">
        <!-- Room between the trigger and the group frame that follows it. -->
        <FluxFlowChain :gap="90">
            <FluxFlowNode id="signup">
                <FluxFlowTriggerCard title="Account created" subtitle="Sign-up form"/>
            </FluxFlowNode>

            <FluxFlowNode id="verify">
                <FluxFlowActionCard title="Verify the email" icon="envelope"/>
            </FluxFlowNode>

            <FluxFlowNode id="profile">
                <FluxFlowActionCard title="Complete the profile" icon="user-check"/>
            </FluxFlowNode>

            <FluxFlowNode id="welcome">
                <FluxFlowActionCard title="Send the welcome tour" icon="wand-magic-sparkles"/>
            </FluxFlowNode>
        </FluxFlowChain>

        <FluxFlowGroup
            title="Onboarding"
            color="primary"
            :nodes="['verify', 'profile']"/>

        <FluxFlowNode id="bounce" :x="411" :y="280">
            <FluxFlowActionCard title="Retry in 24 hours" icon="stopwatch" color="danger"/>
        </FluxFlowNode>

        <FluxFlowConnection
            dashed
            from="verify"
            to="bounce"
            from-side="right"
            color="danger"
            label="Bounced"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowChain, FluxFlowConnection, FluxFlowGroup, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
