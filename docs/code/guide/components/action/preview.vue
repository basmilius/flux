<template>
    <Preview>
        <FluxPane>
            <FluxPaneBody>
                <FluxActions>
                    <FluxAction
                        icon="circle-xmark"
                        is-destructive/>

                    <FluxAction icon="circle-sort"/>

                    <FluxAction icon="circle-minus"/>
                </FluxActions>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAction, FluxActions, FluxPane, FluxPaneBody } from '@flux-ui/flux';
</script>
