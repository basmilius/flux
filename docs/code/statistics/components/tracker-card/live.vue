<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 450px">
        <FluxStatisticsTrackerCard
            title="Your Order is on the Way"
            :subtitle="subtitle"
            icon="truck">
            <FluxStatisticsTrackerCardSegment
                v-for="(step, index) of STEPS"
                :key="step"
                :label="step"
                :state="stateOf(index)"
                :min="0"
                :max="1"
                :value="valueOf(index)"/>
        </FluxStatisticsTrackerCard>

        <FluxSecondaryButton
            icon-leading="play"
            :label="running ? 'Running' : 'Run again'"
            :is-loading="running"
            :disabled="running"
            @click="run"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxStatisticsTrackerCard, FluxStatisticsTrackerCardSegment } from '@flux-ui/statistics';
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

    // Every step takes the same amount of time, so elapsed doubles as the index
    // of the running step and as the progress within it.
    const STEPS = ['Ordered', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];
    const STEP_DURATION = 900;

    const elapsed = ref(0);
    const running = ref(false);

    const subtitle = computed(() => {
        const index = Math.min(Math.floor(elapsed.value), STEPS.length - 1);

        return elapsed.value >= STEPS.length
            ? 'Delivered · Thank you for your order'
            : `Step ${index + 1} of ${STEPS.length} · ${STEPS[index]}`;
    });

    let frame = 0;

    onMounted(() => run());

    onBeforeUnmount(() => cancelAnimationFrame(frame));

    function clamp(value: number): number {
        return Math.min(Math.max(value, 0), 1);
    }

    function stateOf(index: number): 'active' | 'done' | 'todo' {
        if (elapsed.value >= index + 1) {
            return 'done';
        }

        return elapsed.value > index ? 'active' : 'todo';
    }

    function valueOf(index: number): number {
        return clamp(elapsed.value - index);
    }

    function run(): void {
        cancelAnimationFrame(frame);
        running.value = true;
        elapsed.value = 0;

        const start = performance.now();

        const tick = (now: number) => {
            elapsed.value = Math.min((now - start) / STEP_DURATION, STEPS.length);

            if (elapsed.value < STEPS.length) {
                frame = requestAnimationFrame(tick);
            } else {
                running.value = false;
            }
        };

        frame = requestAnimationFrame(tick);
    }
</script>
