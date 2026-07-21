<template>
    <div style="height: 390px">
        <FluxFlow :padding="21" interactive background="dots">
            <FluxFlowNode id="trigger" :x="0" :y="90">
                <FluxFlowTriggerCard
                    title="New order"
                    subtitle="Shopify webhook"
                    :color="enabled ? 'info' : 'gray'"
                    :active="enabled">
                    <FluxDescriptionList>
                        <FluxDescriptionItem label="Automation">
                            <FluxToggle v-model="enabled"/>
                        </FluxDescriptionItem>
                    </FluxDescriptionList>
                </FluxFlowTriggerCard>
            </FluxFlowNode>

            <FluxFlowNode id="charge" :x="390" :y="0">
                <FluxFlowActionCard title="Charge card" icon="money-bill" :color="enabled ? 'primary' : 'gray'">
                    Captures the payment for the order total.
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowNode id="email" :x="390" :y="270">
                <FluxFlowActionCard title="Send receipt" icon="envelope" :color="enabled ? 'info' : 'gray'">
                    Emails the customer their order confirmation.
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowConnection from="trigger" to="charge" from-side="right" to-side="left" :color="enabled ? 'primary' : undefined" :dashed="!enabled"/>
            <FluxFlowConnection from="trigger" to="email" from-side="right" to-side="left" :color="enabled ? 'info' : undefined" :dashed="!enabled"/>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxDescriptionItem, FluxDescriptionList, FluxToggle } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
    import { ref } from 'vue';

    const enabled = ref(true);
</script>
