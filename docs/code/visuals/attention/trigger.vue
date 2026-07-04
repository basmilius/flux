<template>
    <FluxFlex
        align="center"
        direction="horizontal"
        :gap="15">
        <FluxVisualAttention
            effect="tada"
            :trigger="orders">
            <span style="display: inline-block; font-size: 27px; font-weight: 700; font-variant-numeric: tabular-nums;">{{ orders }}</span>
        </FluxVisualAttention>

        <FluxSecondaryButton
            icon-leading="plus"
            label="New order"
            @click="orders++"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualAttention } from '@flux-ui/visuals';
    import { ref } from 'vue';

    const orders = ref(128);
</script>
