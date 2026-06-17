<template>
    <FluxPrimaryLinkButton
        :is-active="isActive"
        label="Toggle"
        @click="isActive = !isActive"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryLinkButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isActive = ref(false);
</script>
