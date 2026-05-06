<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxFlex :gap="5">
                <FluxAction
                    icon="plus"/>

                <FluxAction
                    icon="minus"/>

                <FluxSeparator
                    direction="vertical"/>

                <FluxAction
                    is-destructive
                    icon="trash"/>
            </FluxFlex>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxFlex, FluxPane, FluxPaneBody, FluxSeparator } from '@flux-ui/components';
</script>
