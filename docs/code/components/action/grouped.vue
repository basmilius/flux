<template>
    <FluxActionStack>
        <FluxAction
            icon="calendar"/>

        <FluxAction
            icon="rotate"/>

        <FluxAction
            is-destructive
            icon="trash"/>
    </FluxActionStack>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxActionStack } from '@flux-ui/components';
</script>
