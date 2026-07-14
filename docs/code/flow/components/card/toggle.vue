<template>
    <div style="display: flex; justify-content: center; padding: 42px 0 12px">
        <FluxFlowTriggerCard
            title="New order received"
            subtitle="Shopify webhook"
            :label="enabled ? 'Live' : 'Paused'"
            :color="enabled ? 'info' : 'gray'"
            :active="enabled">
            <FluxDescriptionList>
                <FluxDescriptionItem label="Enabled">
                    <FluxToggle v-model="enabled"/>
                </FluxDescriptionItem>
                <FluxDescriptionItem label="Channel">Storefront</FluxDescriptionItem>
            </FluxDescriptionList>
        </FluxFlowTriggerCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxDescriptionItem, FluxDescriptionList, FluxToggle } from '@flux-ui/components';
    import { FluxFlowTriggerCard } from '@flux-ui/flow';
    import { ref } from 'vue';

    const enabled = ref(true);
</script>
