<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="vertical"
            :gap="21">
            <FluxSlotText
                chromatic
                :text="words[index]"
                style="font-size: 39px; font-weight: 700; letter-spacing: -0.02em;"/>

            <FluxSecondaryButton
                icon-leading="rotate"
                label="Shuffle"
                @click="shuffle"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxSlotText } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const words = ['Delightful', 'Tactile', 'Playful', 'Smooth', 'Snappy'];
    const index = ref(0);

    function shuffle(): void {
        index.value = (index.value + 1) % words.length;
    }
</script>
