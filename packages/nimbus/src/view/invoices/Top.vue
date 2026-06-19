<template>
    <FluxPrimaryButton
        icon-leading="circle-plus"
        label="New invoice"
        type="route"
        :to="{name: 'invoice-new'}"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton } from '@flux-ui/components';
</script>
