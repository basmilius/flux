<template>
    <FluxSecondaryButton
        :is-active="isActive"
        label="Toggle"
        @click="isActive = !isActive"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isActive = ref(false);
</script>
