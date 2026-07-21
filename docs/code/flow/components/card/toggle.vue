<template>
    <div style="display: flex; justify-content: center; padding: 12px 0">
        <FluxFlowTriggerCard
            title="New order received"
            subtitle="Shopify webhook"
            :color="enabled ? 'info' : 'gray'"
            :active="enabled">
            <FluxDescriptionList>
                <FluxDescriptionItem label="Enabled">
                    <FluxToggle v-model="enabled"/>
                </FluxDescriptionItem>
                <FluxDescriptionItem label="Channel">Storefront</FluxDescriptionItem>
            </FluxDescriptionList>

            <template #footer>
                <FluxBadge
                    :color="enabled ? 'info' : 'gray'"
                    :label="enabled ? 'Live' : 'Paused'"/>
            </template>
        </FluxFlowTriggerCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxToggle } from '@flux-ui/components';
    import { FluxFlowTriggerCard } from '@flux-ui/flow';
    import { ref } from 'vue';

    const enabled = ref(true);
</script>
