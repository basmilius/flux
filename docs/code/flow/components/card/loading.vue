<template>
    <div style="display: flex; justify-content: center; padding: 12px 0">
        <FluxFlowActionCard
            title="Sync inventory"
            subtitle="Warehouse API"
            :active="isRunning"
            :is-loading="isRunning">
            <FluxDescriptionList>
                <FluxDescriptionItem label="Products">1.284</FluxDescriptionItem>
                <FluxDescriptionItem label="Batch size">250</FluxDescriptionItem>
            </FluxDescriptionList>

            <template #footer>
                <FluxSecondaryButton
                    icon-leading="rotate"
                    label="Run step"
                    :disabled="isRunning"
                    @click="run"/>

                <FluxBadge
                    v-if="isFinished"
                    color="success"
                    icon="circle-check"
                    label="Synced"/>
            </template>
        </FluxFlowActionCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxDescriptionItem, FluxDescriptionList, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxFlowActionCard } from '@flux-ui/flow';
    import { onBeforeUnmount, ref } from 'vue';

    const isFinished = ref(false);
    const isRunning = ref(false);

    let timeout = 0;

    onBeforeUnmount(() => clearTimeout(timeout));

    function run(): void {
        isFinished.value = false;
        isRunning.value = true;

        timeout = setTimeout(() => {
            isFinished.value = true;
            isRunning.value = false;
        }, 2400);
    }
</script>
