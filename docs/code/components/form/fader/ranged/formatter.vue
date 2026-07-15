<template>
    <FluxFormRangeFader
        label="Price"
        v-model="range"
        :min="0"
        :max="1000"
        :step="50"
        :formatter="euro"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const range = ref<[number, number]>([200, 800]);

    const formatter = new Intl.NumberFormat(navigator.language, {
        currency: 'EUR',
        maximumFractionDigits: 0,
        style: 'currency'
    });

    function euro(value: number): string {
        return formatter.format(value);
    }
</script>
