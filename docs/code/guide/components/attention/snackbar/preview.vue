<template>
    <Preview>
        <FluxSnackbar
            :actions="{update: 'Update', later: 'Later'}"
            icon="circle-arrow-up"
            message="A new version of macOS is available."
            title="Update available"
            is-rendered/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxSnackbar } from '@basmilius/flux';
</script>
