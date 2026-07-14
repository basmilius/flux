<template>
    <Preview flush>
        <FluxFlow :padding="45">
            <FluxFlowNode id="trigger" :x="165" :y="0">
                <FluxFlowTriggerCard title="New Campaign Request">
                    Starts automatically when a marketing campaign brief is submitted.

                    <template #footer>
                        <FluxTag icon="paper-plane" label="Webhook"/>
                    </template>
                </FluxFlowTriggerCard>
            </FluxFlowNode>

            <FluxFlowNode id="analyze" :x="0" :y="330">
                <FluxFlowActionCard title="Analyze Market" label="AI Agent" icon="robot" color="primary">
                    <FluxFlowCardSection label="Prompt">
                        Collects competitor insights and analyzes market trends.
                    </FluxFlowCardSection>

                    <template #footer>
                        <FluxTag icon="brain" label="Opus 4.8"/>
                        <FluxBadge label="394 tokens"/>
                    </template>
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowNode id="draft" :x="330" :y="330">
                <FluxFlowActionCard title="Draft Content" label="AI Agent" icon="wand-magic-sparkles" color="warning">
                    <FluxFlowCardSection label="Prompt">
                        Generates campaign copy variations from the strategy brief.
                    </FluxFlowCardSection>

                    <template #footer>
                        <FluxTag icon="brain" label="Opus 4.8"/>
                        <FluxBadge label="512 tokens"/>
                    </template>
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowNode id="send" :x="165" :y="680">
                <FluxFlowActionCard title="Send Campaign" label="Send Email" icon="envelope" color="info">
                    Delivers the finished campaign to the marketing distribution list.

                    <template #footer>
                        <FluxTag icon="envelope" label="Email"/>
                    </template>
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowConnection from="trigger" to="analyze"/>
            <FluxFlowConnection from="trigger" to="draft"/>
            <FluxFlowConnection from="analyze" to="send"/>
            <FluxFlowConnection from="draft" to="send"/>
        </FluxFlow>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxTag } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowCardSection, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
</script>
