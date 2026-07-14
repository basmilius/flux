<template>
    <FluxFlow :padding="45">
        <FluxFlowNode id="trigger" :x="165" :y="0">
            <FluxFlowTriggerCard title="New Campaign Request" :active="progress < 0.5">
                Starts automatically when a marketing campaign brief is submitted.
            </FluxFlowTriggerCard>
        </FluxFlowNode>

        <FluxFlowNode id="analyze" :x="0" :y="330">
            <FluxFlowActionCard title="Analyze Market" label="AI Agent" icon="robot" color="primary" :active="progress >= 0.5">
                Collects competitor insights and analyzes market trends.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="draft" :x="330" :y="330">
            <FluxFlowActionCard title="Draft Content" label="AI Agent" icon="wand-magic-sparkles" color="warning" :active="progress >= 0.5">
                Generates campaign copy variations from the strategy brief.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowNode id="send" :x="165" :y="680">
            <FluxFlowActionCard title="Send Campaign" label="Send Email" icon="envelope" color="info">
                Delivers the finished campaign to the marketing distribution list.
            </FluxFlowActionCard>
        </FluxFlowNode>

        <FluxFlowConnection from="trigger" to="analyze" progress-color="primary" :progress-value="phase1"/>
        <FluxFlowConnection from="trigger" to="draft" progress-color="primary" :progress-value="phase1"/>
        <FluxFlowConnection from="analyze" to="send" progress-color="primary" :progress-value="phase2"/>
        <FluxFlowConnection from="draft" to="send" progress-color="primary" :progress-value="phase2"/>
    </FluxFlow>
</template>

<script
    setup
    lang="ts">
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

    const progress = ref(0);

    const phase1 = computed(() => Math.min(progress.value * 2, 1));
    const phase2 = computed(() => Math.max(progress.value * 2 - 1, 0));

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
