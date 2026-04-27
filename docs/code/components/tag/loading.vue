<template>
    <FluxTagStack>
        <FluxTag
            is-loading
            label="Pending"/>

        <FluxTag
            is-loading
            label="Saving"/>
    </FluxTagStack>
</template>

<script
    setup
    lang="ts">
    import { FluxTag, FluxTagStack } from '@flux-ui/components';
</script>
