<template>
    <div style="height: 480px">
        <FluxFlow :padding="45" interactive background="dots">
            <FluxFlowNode id="trigger" :x="0" :y="60">
                <FluxFlowTriggerCard title="Deploy requested" subtitle="main branch">
                    <template #footer>
                        <FluxPrimaryButton
                            icon-leading="play"
                            :label="running ? 'Running' : 'Run'"
                            :is-loading="running"
                            :disabled="running"
                            @click="run"/>
                    </template>
                </FluxFlowTriggerCard>
            </FluxFlowNode>

            <FluxFlowNode id="build" :x="390" :y="60">
                <FluxFlowActionCard title="Build image" label="Job" icon="server" color="primary" :active="phase1 > 0 && phase1 < 1">
                    <FluxStatisticsMeter
                        color="primary"
                        icon="gauge-high"
                        title="Progress"
                        :value="phase1"/>
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowNode id="ship" :x="780" :y="60">
                <FluxFlowActionCard title="Ship to production" label="Release" icon="circle-check" color="success" :active="done">
                    Rolls the new image out to production.
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowConnection from="trigger" to="build" from-side="right" to-side="left" progress-color="primary" :progress-value="phase1"/>
            <FluxFlowConnection from="build" to="ship" from-side="right" to-side="left" progress-color="success" :progress-value="phase2"/>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxPrimaryButton } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowNode, FluxFlowTriggerCard } from '@flux-ui/flow';
    import { FluxStatisticsMeter } from '@flux-ui/statistics';
    import { computed, onBeforeUnmount, ref } from 'vue';

    const progress = ref(0);
    const running = ref(false);

    const phase1 = computed(() => Math.min(progress.value * 2, 1));
    const phase2 = computed(() => Math.max(progress.value * 2 - 1, 0));
    const done = computed(() => progress.value >= 1);

    let frame = 0;

    function run(): void {
        if (running.value) {
            return;
        }

        running.value = true;
        progress.value = 0;

        const start = performance.now();

        const tick = (now: number) => {
            progress.value = Math.min((now - start) / 2400, 1);

            if (progress.value < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                running.value = false;
            }
        };

        frame = requestAnimationFrame(tick);
    }

    onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>
