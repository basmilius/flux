<template>
    <FluxTagStack>
        <FluxTag
            dot
            color="success"
            label="Online"/>

        <FluxTag
            dot
            color="danger"
            label="Boot failure"/>
    </FluxTagStack>
</template>

<script
    setup
    lang="ts">
    import { FluxTag, FluxTagStack } from '@flux-ui/components';
</script>
