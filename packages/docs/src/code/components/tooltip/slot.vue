<template>
    <flux-tooltip>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur beatae cupiditate deserunt eius, fugiat ipsam maiores perspiciatis praesentium quae quasi quisquam quos, reiciendis rem repellendus, temporibus ut vitae voluptates.
        </template>

        <flux-secondary-button label="Button"/>
    </flux-tooltip>
</template>

<script
    lang="ts"
    setup>
    import {
        FluxSecondaryButton,
        FluxTooltip
    } from '@fancee/flux';
</script>
