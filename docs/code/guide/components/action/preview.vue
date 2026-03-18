<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxActionStack>
                    <FluxAction
                        icon="circle-xmark"
                        is-destructive/>

                    <FluxAction icon="circle-sort"/>

                    <FluxAction icon="circle-minus"/>
                </FluxActionStack>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxActionStack, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
