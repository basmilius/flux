<template>
    <FluxFormRangeSlider
        v-model="ranges"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeSlider } from '@flux-ui/components';
    import { ref } from 'vue';

    const ranges = ref<[number, number]>([25, 75]);
</script>
