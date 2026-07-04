<template>
    <FluxFlex
        align="center"
        direction="horizontal"
        :gap="15">
        <FluxSecondaryButton
            icon-leading="minus"
            @click="step(-1)"/>

        <FluxVisualSlotText
            :direction="direction"
            :text="`${count}`"
            style="min-width: 48px; font-size: 33px; font-weight: 700; justify-content: center;"/>

        <FluxSecondaryButton
            icon-leading="plus"
            @click="step(1)"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const count = ref(42);
    const direction = ref<'up' | 'down'>('up');

    function step(delta: number): void {
        direction.value = delta > 0 ? 'up' : 'down';
        count.value += delta;
    }
</script>
