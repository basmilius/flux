<template>
    <FluxToggle
        v-model="value"/>
</template>

<script
    setup
    lang="ts">
    import { FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(false);
</script>
