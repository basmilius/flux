<template>
    <FluxPrimaryButton
        icon-leading="circle-plus"
        label="New project"
        type="route"
        :to="{name: 'project-new'}"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton } from '@flux-ui/components';
</script>
