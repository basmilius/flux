<template>
    <FluxTagStack>
        <FluxTag
            icon="check-circle"
            color="success"
            label="Complete"/>

        <FluxTag
            icon="exclamation-circle"
            color="danger"
            label="Missing payment details"/>
    </FluxTagStack>
</template>

<script
    setup
    lang="ts">
    import { FluxTag, FluxTagStack } from '@flux-ui/components';
</script>
