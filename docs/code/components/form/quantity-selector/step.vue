<template>
    <FluxQuantitySelector
        v-model="value"
        :min="1"
        :max="100"
        :step="5"/>
</template>

<script
    setup
    lang="ts">
    import { FluxQuantitySelector } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(10);
</script>
