<template>
    <FluxFormRangeSlider
        style="max-width: 420px"
        v-model="sliderValue"
        is-ticks-visible
        :formatter="customFormatter"
        :min="100"
        :max="500"
        :step="0.5"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormRangeSlider } from '@basmilius/flux';
    import { ref } from 'vue';

    const sliderValue = ref([250, 300]);

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
