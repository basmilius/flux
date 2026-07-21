<template>
    <div style="display: flex; justify-content: center; padding: 12px 0">
        <FluxFlowCard
            title="Manager approval"
            subtitle="Expense over € 500"
            :icon="approved ? 'circle-check' : 'hourglass-clock'"
            :color="approved ? 'success' : 'warning'"
            :active="!approved">
            <FluxDescriptionList>
                <FluxDescriptionItem label="Reviewer">
                    <span style="display: flex; align-items: center; gap: 9px">
                        <FluxAvatar :size="24" fallback="colorized" fallback-initials="JD"/>
                        Jane Doe
                    </span>
                </FluxDescriptionItem>
                <FluxDescriptionItem label="SLA">4 hours</FluxDescriptionItem>
            </FluxDescriptionList>

            <template #footer>
                <FluxSecondaryButton
                    v-if="!approved"
                    icon-leading="check"
                    label="Approve"
                    @click="approved = true"/>
                <FluxBadge
                    v-else
                    icon="circle-check"
                    label="Approved"
                    color="success"/>
            </template>
        </FluxFlowCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxAvatar, FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxFlowCard } from '@flux-ui/flow';
    import { ref } from 'vue';

    const approved = ref(false);
</script>
