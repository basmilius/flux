<template>
    <FluxFormSlider
        style="max-width: 420px"
        v-model="sliderValue"
        :min="0"
        :max="100"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormSlider } from '@basmilius/flux';
    import { ref } from 'vue';

    const sliderValue = ref(75);
</script>
