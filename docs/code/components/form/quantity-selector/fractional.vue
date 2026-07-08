<template>
    <FluxQuantitySelector
        v-model="value"
        :min="0"
        :max="10"
        :step="0.5"/>
</template>

<script
    setup
    lang="ts">
    import { FluxQuantitySelector } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(2.5);
</script>
