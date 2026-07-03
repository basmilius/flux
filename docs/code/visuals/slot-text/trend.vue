<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="15">
        <FluxFlex
            align="baseline"
            direction="horizontal"
            :gap="9">
            <span style="color: var(--gray-500); font-size: 13px; font-weight: 500;">Revenue MoM</span>

            <FluxSlotText
                :color="trend.color"
                :direction="trend.direction"
                :text="trend.label"
                style="font-size: 21px; font-weight: 700; font-variant-numeric: tabular-nums;"/>
        </FluxFlex>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="New reading"
            @click="next"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxSlotText } from '@flux-ui/visuals';
    import { computed, ref } from 'vue';

    const readings = [4.2, -1.1, 8.7, -3.4, 2.6, -0.8];
    const index = ref(0);
    const current = computed(() => readings[index.value]);

    const trend = computed(() => {
        const up = current.value >= 0;

        return {
            label: `${up ? '+' : ''}${current.value.toFixed(1)}%`,
            color: up ? 'var(--success-500)' : 'var(--danger-500)',
            direction: (up ? 'up' : 'down') as 'up' | 'down'
        };
    });

    function next(): void {
        index.value = (index.value + 1) % readings.length;
    }
</script>
