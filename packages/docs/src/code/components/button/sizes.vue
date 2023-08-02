<template>
    <flux-button-stack>
        <flux-secondary-button
            label="Button"
            size="small"/>

        <flux-secondary-button
            label="Button"
            size="medium"/>

        <flux-secondary-button
            label="Button"
            size="large"/>
    </flux-button-stack>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxButtonStack,
        FluxSecondaryButton
    } from '@fancee/flux';
</script>
