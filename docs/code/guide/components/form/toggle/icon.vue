<template>
    <FluxToggle
        v-model="value"
        icon-off="xmark"
        icon-on="check"/>
</template>

<script
    setup
    lang="ts">
    import { FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref(false);
</script>
