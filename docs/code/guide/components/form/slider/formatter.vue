<template>
    <FluxFormSlider
        is-ticks-visible
        v-model="value"
        :min="0"
        :max="100"
        :step="0.5"
        :formatter="customFormatter"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormSlider, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(25);

    function customFormatter(value: number): string {
        const formatter = new Intl.NumberFormat(navigator.language, {
            currency: 'EUR',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            style: 'currency'
        });

        return formatter.format(value);
    }
</script>
