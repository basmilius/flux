<template>
    <FluxFlex
        align="center"
        direction="horizontal"
        :gap="15">
        <FluxSecondaryButton
            icon-leading="minus"
            @click="step(-2500)"/>

        <FluxVisualNumberFlow
            :value="value"
            style="min-width: 120px; font-size: 33px; font-weight: 700; text-align: center;"/>

        <FluxSecondaryButton
            icon-leading="plus"
            @click="step(2500)"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualNumberFlow } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const value = ref(25000);

    function step(delta: number): void {
        value.value = Math.max(0, value.value + delta);
    }
</script>
