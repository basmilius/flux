<template>
    <FluxVisualSlotText
        direction="up"
        :text="time"
        style="font-size: 39px; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: 0.02em;"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const time = ref('00:00:00');

    let timer: number;

    function tick(): void {
        time.value = new Date().toLocaleTimeString('en-US', {hour12: false});
    }

    onMounted(() => {
        tick();
        timer = window.setInterval(tick, 1000);
    });

    onBeforeUnmount(() => window.clearInterval(timer));
</script>
