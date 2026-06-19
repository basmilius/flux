<template>
    <FluxPrimaryButton
        icon-leading="circle-plus"
        label="Log time"
        type="route"
        :to="{name: 'timesheet-log'}"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxPrimaryButton } from '@flux-ui/components';
</script>
