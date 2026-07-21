<template>
    <FluxFlow :padding="21">
        <FluxFlowNode id="extract" :x="0" :y="0">
            <FluxFlowActionCard title="Extract" label="Running" icon="gauge" color="primary" active/>
        </FluxFlowNode>

        <FluxFlowNode id="load" :x="0" :y="240">
            <FluxFlowActionCard title="Load"/>
        </FluxFlowNode>

        <FluxFlowConnection from="extract" to="load" progress-color="primary" :progress-value="progress"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode } from '@flux-ui/flow';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const progress = ref(0);

    let frame = 0;

    onMounted(() => {
        const start = performance.now();

        const tick = (now: number) => {
            progress.value = ((now - start) / 2400) % 1;
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
    });

    onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>
