<template>
    <div style="display: flex; justify-content: center; padding: 42px 0 12px">
        <FluxFlowActionCard title="Generate Report" label="AI Agent" icon="brain" color="primary">
            <FluxFlowCardSection label="Prompt">
                Summarizes the quarter's numbers into an executive brief.
            </FluxFlowCardSection>

            <FluxFlowCardRow label="Model" leader>Opus 4.8</FluxFlowCardRow>
            <FluxFlowCardRow label="Tokens" leader>394</FluxFlowCardRow>
            <FluxFlowCardRow label="Duration" leader>0.43s</FluxFlowCardRow>
        </FluxFlowActionCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlowActionCard, FluxFlowCardRow, FluxFlowCardSection } from '@flux-ui/flow';
</script>
