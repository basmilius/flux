<template>
    <Preview>
        <FluxQuantitySelector
            v-model="value"
            :min="1"
            :max="100"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxQuantitySelector } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(10);
</script>
