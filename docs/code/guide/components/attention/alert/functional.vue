<template>
    <FluxPrimaryButton
        label="Show alert"
        @click="show()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showAlert } from '@flux-ui/flux';

    async function show(): Promise<void> {
        await showAlert({
            icon: 'circle-exclamation',
            title: 'Title',
            message: 'Hello world'
        });
    }
</script>
