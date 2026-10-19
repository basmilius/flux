<template>
    <FluxFlex
        align="center"
        direction="vertical"
        :gap="15">
        <FluxVisualDrumRoll
            :stagger="stagger"
            :text="price"
            style="font-size: 33px; font-weight: 600;"/>

        <FluxButtonGroup>
            <FluxSecondaryButton
                label="No stagger"
                @click="shuffle(0)"/>

            <FluxSecondaryButton
                label="40ms"
                @click="shuffle(40)"/>

            <FluxSecondaryButton
                label="90ms"
                @click="shuffle(90)"/>
        </FluxButtonGroup>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualDrumRoll } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const prices = ['$ 4,812.30', '$ 5,207.95', '$ 3,964.10'];
    const index = ref(0);
    const price = ref(prices[0]);
    const stagger = ref(40);

    function shuffle(value: number): void {
        stagger.value = value;
        index.value = (index.value + 1) % prices.length;
        price.value = prices[index.value];
    }
</script>
