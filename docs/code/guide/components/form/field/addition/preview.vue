<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxFormFieldAddition
                    icon="circle-info"
                    message="A helpful hint can be shown here."
                    mode="hint"/>

                <FluxFormFieldAddition
                    icon="circle-exclamation"
                    message="Something is wrong with the input!"
                    mode="error"/>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormFieldAddition, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
