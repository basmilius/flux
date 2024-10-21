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
    lang="ts"
    setup>
    import { FluxTag, FluxTagStack } from '@basmilius/flux';
</script>
