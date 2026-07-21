<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 450px">
        <FluxStatisticsTracker>
            <FluxStatisticsTrackerLabel
                color="success"
                label="Completed"/>

            <FluxStatisticsTrackerEntry
                color="success"
                icon="circle-check"
                title="Order placed"
                when="Mar 8, 2026 · 09:12 am"/>

            <FluxStatisticsTrackerLabel
                :color="isDelivered ? 'success' : 'primary'"
                :label="isDelivered ? 'Completed' : 'In-progress'"/>

            <FluxStatisticsTrackerEntry
                icon="truck"
                title="Shipment 1"
                :color="isDelivered ? 'success' : 'primary'">
                <template #end>
                    <FluxBadge
                        colored
                        :color="isDelivered ? 'success' : 'primary'"
                        :label="isDelivered ? 'Delivered' : 'In Progress'"/>
                </template>

                <FluxStatisticsTrackerSteps>
                    <FluxStatisticsTrackerStep
                        v-for="(step, index) of STEPS"
                        :key="step"
                        :label="step"
                        :state="stateOf(index)"/>
                </FluxStatisticsTrackerSteps>
            </FluxStatisticsTrackerEntry>

            <FluxStatisticsTrackerEntry
                v-if="isDelivered"
                icon="house"
                title="Delivery"
                description="Handed to the customer"/>
        </FluxStatisticsTracker>

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
    import { FluxBadge, FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxStatisticsTracker, FluxStatisticsTrackerEntry, FluxStatisticsTrackerLabel, FluxStatisticsTrackerStep, FluxStatisticsTrackerSteps } from '@flux-ui/statistics';
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

    // One step completes per interval; the entry itself flips to delivered once
    // the last one is done, which also adds the closing row to the rail.
    const STEPS = ['Shipping label generated', 'Packing in progress', 'Handed to carrier', 'Out for delivery'];
    const STEP_DURATION = 900;

    const elapsed = ref(0);
    const running = ref(false);

    const isDelivered = computed(() => elapsed.value >= STEPS.length);

    let frame = 0;

    onMounted(() => run());

    onBeforeUnmount(() => cancelAnimationFrame(frame));

    function stateOf(index: number): 'active' | 'done' | 'pending' {
        if (elapsed.value >= index + 1) {
            return 'done';
        }

        return elapsed.value > index ? 'active' : 'pending';
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
