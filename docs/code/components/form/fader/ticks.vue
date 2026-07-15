<template>
    <FluxFormFader
        label="Resonance"
        v-model="value"
        :min="0"
        :max="10"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(4);
</script>
