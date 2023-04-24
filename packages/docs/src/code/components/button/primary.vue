<template>
    <flux-button-stack>
        <flux-primary-button label="Buy"/>

        <flux-primary-button
            icon-before="check-circle"
            label="Save"/>

        <flux-primary-button
            icon-after="circle-arrow-right"
            label="Enter"/>

        <flux-primary-button
            is-loading
            label="Update"/>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxButtonStack,
        FluxPrimaryButton
    } from '@fancee/flux';
</script>
