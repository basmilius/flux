<template>
    <FluxFormRangeFader
        :min-distance="20"
        label="Range"
        v-model="range"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const range = ref<[number, number]>([30, 70]);
</script>
