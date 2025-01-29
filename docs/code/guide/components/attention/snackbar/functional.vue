<template>
    <FluxPrimaryButton
        label="Show Snackbar"
        @click="show()"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton, showSnackbar } from '@basmilius/flux';

    function show(): void {
        showSnackbar({
            color: 'success',
            icon: 'circle-check',
            message: 'Changes saved successfully.'
        });
    }
</script>
