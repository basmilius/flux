<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="vertical"
            :gap="21">
            <FluxVisualNumberFlow
                :value="value"
                style="font-size: 48px; font-weight: 700; letter-spacing: -0.02em;"/>

            <FluxSecondaryButton
                icon-leading="rotate"
                label="Recount"
                @click="recount"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualNumberFlow } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const value = ref(48291);

    function recount(): void {
        value.value = 20000 + Math.floor(Math.random() * 60000);
    }
</script>
