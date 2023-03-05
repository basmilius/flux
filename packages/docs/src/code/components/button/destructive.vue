<template>
    <flux-button-stack>
        <flux-destructive-button label="Disable"/>

        <flux-destructive-button
            icon-before="lock"
            label="Lock account"/>

        <flux-destructive-button
            icon-after="circle-arrow-down"
            label="Downgrade"/>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxButtonStack,
        FluxDestructiveButton
    } from '@fancee/flux';
</script>
