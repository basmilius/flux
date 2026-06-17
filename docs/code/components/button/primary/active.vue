<template>
    <FluxPrimaryButton
        :is-active="isActive"
        label="Toggle"
        @click="isActive = !isActive"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isActive = ref(false);
</script>
