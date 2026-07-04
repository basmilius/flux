<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="21">
        <FluxVisualSlotText
            chromatic
            :text="values[index]"
            style="font-size: 33px; font-weight: 700;"/>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="Roll"
            @click="roll"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualSlotText } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const values = ['Rainbow', 'Spectrum', 'Chromatic', 'Vibrant'];
    const index = ref(0);

    function roll(): void {
        index.value = (index.value + 1) % values.length;
    }
</script>
