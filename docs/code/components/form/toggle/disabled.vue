<template>
    <FluxFlex :gap="18">
        <FluxToggle
            :model-value="false"
            disabled/>

        <FluxToggle
            :model-value="true"
            disabled/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxToggle } from '@flux-ui/components';
</script>
