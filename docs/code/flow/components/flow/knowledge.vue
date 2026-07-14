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
                <FluxDescriptionList>
                    <FluxDescriptionItem label="Status">
                        <FluxBadge label="Current" color="success" dot/>
                    </FluxDescriptionItem>
                    <FluxDescriptionItem label="Sources">4</FluxDescriptionItem>
                    <FluxDescriptionItem label="Used by">3 agents</FluxDescriptionItem>
                </FluxDescriptionList>
            </FluxFlowCard>
        </FluxFlowNode>

        <FluxFlowNode id="pricing" :x="480" :y="420">
            <FluxFlowCard title="Pricing exceptions">
                <FluxDescriptionList>
                    <FluxDescriptionItem label="Status">
                        <FluxBadge label="Needs review" color="warning" dot/>
                    </FluxDescriptionItem>
                    <FluxDescriptionItem label="Sources">2</FluxDescriptionItem>
                    <FluxDescriptionItem label="Used by">4 agents</FluxDescriptionItem>
                </FluxDescriptionList>
            </FluxFlowCard>
        </FluxFlowNode>

        <FluxFlowNode id="output" :x="960" :y="210">
            <FluxFlowCard title="Skills file">
                <FluxStatisticsLegend direction="vertical">
                    <FluxStatisticsLegendItem color="primary" label="Support agent"/>
                    <FluxStatisticsLegendItem color="info" label="Billing ops bot"/>
                    <FluxStatisticsLegendItem color="success" label="On-call copilot"/>
                </FluxStatisticsLegend>
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
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList } from '@flux-ui/components';
    import { FluxFlow, FluxFlowCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
    import { FluxStatisticsLegend, FluxStatisticsLegendItem } from '@flux-ui/statistics';
</script>
