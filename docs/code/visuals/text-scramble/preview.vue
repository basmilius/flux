<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="vertical"
            :gap="21">
            <FluxVisualTextScramble
                :text="words[index]"
                style="font-size: 33px; font-weight: 700; letter-spacing: -0.02em;"/>

            <FluxSecondaryButton
                icon-leading="rotate"
                label="Decode"
                @click="next"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualTextScramble } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const words = ['Dashboard', 'Analytics', 'Realtime', 'Insights', 'Overview'];
    const index = ref(0);

    function next(): void {
        index.value = (index.value + 1) % words.length;
    }
</script>
