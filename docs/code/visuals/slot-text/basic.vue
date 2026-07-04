<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="12">
        <FluxVisualSlotText
            :text="greetings[index]"
            style="font-size: 24px; font-weight: 600;"/>

        <FluxSecondaryButton
            label="Next greeting"
            @click="next"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const greetings = ['Hello', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'Olá'];
    const index = ref(0);

    function next(): void {
        index.value = (index.value + 1) % greetings.length;
    }
</script>
