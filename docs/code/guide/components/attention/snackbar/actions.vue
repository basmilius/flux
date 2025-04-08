<template>
    <FluxSnackbar
        v-if="isVisible"
        :actions="{update: 'Update', later: 'Later'}"
        color="primary"
        icon="circle-arrow-up"
        message="A new version of macOS is available."
        title="Update available"
        @action="onAction"/>

    <FluxPrimaryButton
        label="Toggle Snackbar"
        @click="isVisible = !isVisible"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, FluxSnackbar, showSnackbar } from '@flux-ui/flux';
    import { ref } from 'vue';

    const isVisible = ref(false);

    function onAction(actionKey: string): void {
        isVisible.value = false;

        showSnackbar({
            icon: 'circle-exclamation',
            message: `You clicked ${actionKey}`
        });
    }
</script>
