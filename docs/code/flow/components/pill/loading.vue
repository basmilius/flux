<template>
    <div style="display: flex; justify-content: center; gap: 15px; padding: 12px 0">
        <FluxFlowPill
            v-for="(stage, index) of STAGES"
            :key="stage.label"
            :color="colorOf(index)"
            :icon="iconOf(index, stage.icon)"
            :label="stage.label"
            :is-loading="index === running"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor, FluxIconName } from '@flux-ui/types';
    import { FluxFlowPill } from '@flux-ui/flow';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const STAGES: { readonly icon: FluxIconName; readonly label: string }[] = [
        {icon: 'database', label: 'Fetch orders'},
        {icon: 'wand-magic-sparkles', label: 'Enrich records'},
        {icon: 'paper-plane', label: 'Publish'}
    ];

    const running = ref(0);

    let interval = 0;

    onMounted(() => {
        interval = setInterval(() => (running.value = (running.value + 1) % (STAGES.length + 1)), 1600);
    });

    onBeforeUnmount(() => clearInterval(interval));

    function colorOf(index: number): FluxColor {
        if (index < running.value) {
            return 'success';
        }

        return index === running.value ? 'primary' : 'gray';
    }

    function iconOf(index: number, icon: FluxIconName): FluxIconName {
        return index < running.value ? 'circle-check' : icon;
    }
</script>
