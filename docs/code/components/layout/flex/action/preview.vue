<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxActionStack>
                    <FluxAction
                        icon="scissors"/>

                    <FluxAction
                        icon="copy"/>

                    <FluxAction
                        icon="paste"/>
                </FluxActionStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxAction, FluxActionStack, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
