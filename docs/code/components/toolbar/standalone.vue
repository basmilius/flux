<template>
    <FluxToolbar>
        <FluxToolbarGroup>
            <FluxAction
                icon="bold"
                aria-label="Bold"/>

            <FluxAction
                icon="italic"
                aria-label="Italic"/>

            <FluxAction
                icon="underline"
                aria-label="Underline"/>
        </FluxToolbarGroup>

        <FluxSeparator direction="vertical"/>

        <FluxToolbarGroup>
            <FluxAction
                icon="align-left"
                aria-label="Align left"/>

            <FluxAction
                icon="align-center"
                aria-label="Align center"/>

            <FluxAction
                icon="align-right"
                aria-label="Align right"/>
        </FluxToolbarGroup>
    </FluxToolbar>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxSeparator, FluxToolbar, FluxToolbarGroup } from '@flux-ui/components';
</script>
