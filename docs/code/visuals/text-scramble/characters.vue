<template>
    <FluxFlex
        align="center"
        direction="horizontal"
        :gap="15">
        <FluxSecondaryButton
            icon-leading="minus"
            @click="step(-1843)"/>

        <FluxVisualTextScramble
            characters="0123456789"
            :text="value.toLocaleString('en-US')"
            style="min-width: 120px; font-size: 33px; font-weight: 700; text-align: center;"/>

        <FluxSecondaryButton
            icon-leading="plus"
            @click="step(1843)"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualTextScramble } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const value = ref(50000);

    function step(delta: number): void {
        value.value = Math.max(0, value.value + delta);
    }
</script>
