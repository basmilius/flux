<template>
    <FluxQuantitySelector
        v-model="value"
        :max="1000"
        :min="0"
        :step="5"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxQuantitySelector } from '@basmilius/flux';
    import { ref } from 'vue';

    const value = ref(10);
</script>
