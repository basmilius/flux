<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxStack
                direction="horizontal"
                :gap="5">
                <FluxAction
                    icon="plus"/>

                <FluxAction
                    icon="minus"/>

                <FluxSeparator
                    direction="vertical"/>

                <FluxAction
                    is-destructive
                    icon="trash"/>
            </FluxStack>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxPane, FluxPaneBody, FluxSeparator, FluxStack } from '@flux-ui/components';
</script>
