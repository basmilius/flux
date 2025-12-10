<template>
    <FluxActions>
        <FluxAction
            icon="calendar"/>

        <FluxAction
            icon="rotate"/>

        <FluxAction
            is-destructive
            icon="trash"/>
    </FluxActions>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxActions } from '@flux-ui/components';
</script>
