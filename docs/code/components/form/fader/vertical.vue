<template>
    <FluxFormFader
        direction="vertical"
        label="Volume"
        v-model="value"/>
</template>

<script
    setup
    lang="ts">
    import { FluxFormFader } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(25);
</script>
