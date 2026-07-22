<template>
    <div style="height: 690px">
        <FluxFlow :padding="21" interactive axis="vertical" background="dots">
            <FluxFlowGraph>
                <FluxFlowNode id="trigger">
                    <FluxFlowPill
                        color="info"
                        icon="bolt"
                        label="Nightly sync"
                        :is-loading="isRunning(0)"/>
                </FluxFlowNode>

                <FluxFlowNode
                    v-for="(stage, index) of STAGES"
                    :id="stage.id"
                    :key="stage.id">
                    <FluxFlowActionCard
                        :title="stage.title"
                        :subtitle="stage.subtitle"
                        :icon="isDone(index + 1) ? 'circle-check' : stage.icon"
                        :color="colorOf(index + 1)"
                        :active="isRunning(index + 1)"
                        :is-loading="isRunning(index + 1)">
                        {{ stage.description }}

                        <template #footer>
                            <FluxBadge
                                :color="colorOf(index + 1)"
                                :label="labelOf(index + 1)"/>
                        </template>
                    </FluxFlowActionCard>
                </FluxFlowNode>

                <FluxFlowConnection
                    from="trigger"
                    to="fetch"
                    progress-color="primary"
                    :progress-value="progressOf(1)"/>

                <FluxFlowConnection
                    from="fetch"
                    to="enrich"
                    progress-color="primary"
                    :progress-value="progressOf(2)"/>

                <FluxFlowConnection
                    from="enrich"
                    to="load"
                    progress-color="primary"
                    :progress-value="progressOf(3)"/>
            </FluxFlowGraph>
        </FluxFlow>
    </div>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxBadge } from '@flux-ui/components';
    import { FluxFlow, FluxFlowActionCard, FluxFlowConnection, FluxFlowGraph, FluxFlowNode, FluxFlowPill } from '@flux-ui/flow';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const STAGES: { readonly id: string; readonly icon: FluxIconName; readonly title: string; readonly subtitle: string; readonly description: string }[] = [
        {id: 'fetch', icon: 'database', title: 'Fetch orders', subtitle: 'Shopify API', description: 'Pulls every order created since the last successful run.'},
        {id: 'enrich', icon: 'wand-magic-sparkles', title: 'Enrich records', subtitle: 'Customer service', description: 'Adds customer, currency and tax data to each order.'},
        {id: 'load', icon: 'server', title: 'Load into warehouse', subtitle: 'BigQuery', description: 'Writes the enriched batch and marks the run as complete.'}
    ];

    // The run walks the pill and the three cards in order: a step runs for one
    // unit of elapsed time, during which the connector towards the next step
    // fills, so a step that starts running is already fully connected.
    const STEPS = STAGES.length + 1;
    const STEP_DURATION = 1400;

    // A finished run holds for a beat, then the canvas clears for a beat before
    // the next one starts, so the reset reads as a reset.
    const HOLD = 1;
    const IDLE = 0.6;

    const elapsed = ref(0);

    let frame = 0;

    onMounted(() => {
        const start = performance.now();

        const tick = (now: number) => {
            elapsed.value = (((now - start) / STEP_DURATION) % (STEPS + HOLD + IDLE)) - IDLE;
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
    });

    onBeforeUnmount(() => cancelAnimationFrame(frame));

    function isRunning(step: number): boolean {
        return elapsed.value >= step && elapsed.value < step + 1;
    }

    function isDone(step: number): boolean {
        return elapsed.value >= step + 1;
    }

    function colorOf(step: number): FluxColor {
        if (isDone(step)) {
            return 'success';
        }

        return isRunning(step) ? 'primary' : 'gray';
    }

    function labelOf(step: number): string {
        if (isDone(step)) {
            return 'Done';
        }

        return isRunning(step) ? 'Running' : 'Pending';
    }

    function progressOf(step: number): number {
        return Math.min(Math.max(elapsed.value - step + 1, 0), 1);
    }
</script>
