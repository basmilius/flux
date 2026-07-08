<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <FluxNotice
            color="danger"
            icon="circle-exclamation"
            message="Failed to save data. Please try again."/>

        <FluxNotice
            color="warning"
            icon="circle-exclamation"
            message="You have unsaved changes."/>

        <FluxNotice
            color="success"
            icon="circle-check"
            message="Data saved successfully."/>

        <FluxNotice
            color="info"
            icon="circle-info"
            message="New updates are available."/>

        <FluxNotice
            color="primary"
            icon="circle-info"
            message="A new version of the app is ready to install."/>

        <FluxNotice
            color="gray"
            icon="circle-info"
            message="We've updated the invoice filter, see what's new."/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxNotice } from '@flux-ui/components';
</script>
