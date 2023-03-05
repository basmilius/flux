<template>
    <flux-button-stack>
        <flux-secondary-button label="Cancel"/>

        <flux-secondary-button
            icon-before="circle-arrow-up"
            label="Upgrade subscription"/>

        <flux-secondary-button
            icon-after="circle-arrow-right"
            label="Takeover"/>

        <flux-secondary-button
            is-loading
            label="Restore"/>
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
