<template>
    <FluxFormRangeSlider
        style="max-width: 420px"
        v-model="sliderValue"
        is-ticks-visible
        :min="0"
        :max="100"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormRangeSlider } from '@basmilius/flux';
    import { ref } from 'vue';

    const sliderValue = ref([25, 50]);
</script>
