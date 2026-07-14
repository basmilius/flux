<template>
    <Preview>
        <FluxFlowActionCard title="Analyze Market" label="AI Agent" icon="robot" color="primary">
            <FluxFlowCardSection label="Prompt">
                Collects competitor insights and analyzes market trends.
            </FluxFlowCardSection>

            <template #footer>
                <FluxTag icon="brain" label="Opus 4.8"/>
                <FluxBadge label="394 tokens"/>
            </template>
        </FluxFlowActionCard>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxTag } from '@flux-ui/components';
    import { FluxFlowActionCard, FluxFlowCardSection } from '@flux-ui/flow';
</script>
