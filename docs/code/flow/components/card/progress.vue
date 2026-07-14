<template>
    <div style="display: flex; justify-content: center; padding: 42px 0 12px">
        <FluxFlowActionCard title="Build image" label="Job" icon="server" color="primary" active>
            <FluxStatisticsMeter
                color="primary"
                icon="gauge-high"
                title="Progress"
                :value="progress"/>
        </FluxFlowActionCard>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlowActionCard } from '@flux-ui/flow';
    import { FluxStatisticsMeter } from '@flux-ui/statistics';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const progress = ref(0);

    let frame = 0;

    onMounted(() => {
        const start = performance.now();

        const tick = (now: number) => {
            progress.value = ((now - start) / 3200) % 1;
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
    });

    onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>
