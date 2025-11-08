<template>
    <FluxTooltip>
        <template #content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur beatae cupiditate deserunt eius, fugiat ipsam maiores perspiciatis praesentium quae quasi quisquam quos, reiciendis rem repellendus, temporibus ut vitae voluptates.
        </template>

        <FluxSecondaryButton
            icon-leading="copy"
            label="Hover me"/>
    </FluxTooltip>
</template>

<script
    setup
    lang="ts">
    import { FluxSecondaryButton, FluxTooltip } from '@flux-ui/components';
</script>
