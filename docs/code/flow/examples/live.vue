<template>
    <div style="height: 390px">
        <FluxFlow :padding="21" interactive background="dots">
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
                <FluxFlowActionCard title="Build image" icon="server" color="primary" :active="building">
                    <FluxStatisticsMeter
                        color="primary"
                        icon="gauge-high"
                        title="Progress"
                        :value="build"/>
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowNode id="ship" :x="780" :y="60">
                <FluxFlowActionCard title="Ship to production" icon="circle-check" color="success" :active="done">
                    Rolls the new image out to production.
                </FluxFlowActionCard>
            </FluxFlowNode>

            <FluxFlowConnection from="trigger" to="build" from-side="right" to-side="left" progress-color="primary" :progress-value="handoff"/>
            <FluxFlowConnection from="build" to="ship" from-side="right" to-side="left" progress-color="success" :progress-value="release"/>
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

    // A run walks three stages in order: the connector fills towards the build,
    // the build itself runs, and only then does the release connector fill.
    const STAGES = 3;
    const STAGE_DURATION = 800;

    const elapsed = ref(0);
    const running = ref(false);

    const handoff = computed(() => clamp(elapsed.value));
    const build = computed(() => clamp(elapsed.value - 1));
    const release = computed(() => clamp(elapsed.value - 2));
    const building = computed(() => elapsed.value > 1 && elapsed.value < 2);
    const done = computed(() => elapsed.value >= STAGES);

    let frame = 0;

    onBeforeUnmount(() => cancelAnimationFrame(frame));

    function clamp(value: number): number {
        return Math.min(Math.max(value, 0), 1);
    }

    function run(): void {
        cancelAnimationFrame(frame);
        running.value = true;
        elapsed.value = 0;

        const start = performance.now();

        const tick = (now: number) => {
            elapsed.value = Math.min((now - start) / STAGE_DURATION, STAGES);

            if (elapsed.value < STAGES) {
                frame = requestAnimationFrame(tick);
            } else {
                running.value = false;
            }
        };

        frame = requestAnimationFrame(tick);
    }
</script>
