<template>
    <flux-form-range-slider
        style="max-width: 420px"
        v-model="sliderValue"
        :min="0"
        :max="100"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormRangeSlider } from '@fancee/flux';
    import { ref } from 'vue';

    const sliderValue = ref([25, 75]);
</script>
