<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="slack" :x="0" :y="0">
            <FluxFlowCard title="Slack" subtitle="1,204 threads"/>
        </FluxFlowNode>
        <FluxFlowNode id="gmail" :x="0" :y="150">
            <FluxFlowCard title="Gmail" subtitle="Support inbox"/>
        </FluxFlowNode>
        <FluxFlowNode id="zendesk" :x="0" :y="300">
            <FluxFlowCard title="Zendesk" subtitle="8,612 tickets"/>
        </FluxFlowNode>
        <FluxFlowNode id="postgres" :x="0" :y="450">
            <FluxFlowCard title="Postgres" subtitle="pricing_db"/>
        </FluxFlowNode>
        <FluxFlowNode id="notion" :x="0" :y="600">
            <FluxFlowCard title="Notion" subtitle="Stale · 38d"/>
        </FluxFlowNode>

        <FluxFlowNode id="refund" :x="480" :y="30">
            <FluxFlowCard title="Refund handling" active>
                <FluxFlowCardRow label="Status">
                    <FluxBadge label="Current" color="success" dot/>
                </FluxFlowCardRow>
                <FluxFlowCardRow label="Sources" leader>4</FluxFlowCardRow>
                <FluxFlowCardRow label="Used by" leader>3 agents</FluxFlowCardRow>
            </FluxFlowCard>
        </FluxFlowNode>

        <FluxFlowNode id="pricing" :x="480" :y="420">
            <FluxFlowCard title="Pricing exceptions">
                <FluxFlowCardRow label="Status">
                    <FluxBadge label="Needs review" color="warning" dot/>
                </FluxFlowCardRow>
                <FluxFlowCardRow label="Sources" leader>2</FluxFlowCardRow>
                <FluxFlowCardRow label="Used by" leader>4 agents</FluxFlowCardRow>
            </FluxFlowCard>
        </FluxFlowNode>

        <FluxFlowNode id="output" :x="960" :y="210">
            <FluxFlowCard title="Skills file">
                <FluxFlowCardSection label="Consumed by">
                    <div>Support agent</div>
                    <div>Billing ops bot</div>
                    <div>On-call copilot</div>
                </FluxFlowCardSection>
            </FluxFlowCard>
        </FluxFlowNode>

        <FluxFlowConnection from="slack" to="refund" from-side="right" to-side="left"/>
        <FluxFlowConnection from="gmail" to="refund" from-side="right" to-side="left"/>
        <FluxFlowConnection from="zendesk" to="refund" from-side="right" to-side="left"/>
        <FluxFlowConnection from="postgres" to="pricing" from-side="right" to-side="left"/>
        <FluxFlowConnection from="notion" to="pricing" from-side="right" to-side="left" color="warning" dashed/>

        <FluxFlowConnection from="refund" to="output" from-side="right" to-side="left" color="success"/>
        <FluxFlowConnection from="pricing" to="output" from-side="right" to-side="left" color="warning" dashed/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge } from '@flux-ui/components';
    import { FluxFlow, FluxFlowCard, FluxFlowCardRow, FluxFlowCardSection, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
</script>
