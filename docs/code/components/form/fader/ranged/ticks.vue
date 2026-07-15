<template>
    <FluxFormRangeFader
        label="Band"
        v-model="range"
        :min="0"
        :max="10"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormRangeFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const range = ref<[number, number]>([2, 8]);
</script>
