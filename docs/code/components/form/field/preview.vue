<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormField
                        label="Label"
                        error="Something is wrong with the input!"
                        hint="A helpful hint can be shown here.">
                        <FluxFormInput placeholder="Any input here!"/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormField, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
