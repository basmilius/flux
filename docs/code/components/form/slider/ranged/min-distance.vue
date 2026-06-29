<template>
    <FluxFormRangeSlider
        :min-distance="20"
        v-model="ranges"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeSlider } from '@flux-ui/components';
    import { ref } from 'vue';

    const ranges = ref<[number, number]>([30, 70]);
</script>
