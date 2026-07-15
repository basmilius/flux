<template>
    <FluxFormRangeFader
        label="Range"
        v-model="range"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const range = ref<[number, number]>([25, 75]);
</script>
