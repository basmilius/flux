<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    label="Terms"
                    error="You must accept the terms to continue.">
                    <FluxFormCheckbox
                        :model-value="false"
                        label="I accept the terms and conditions."/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormCheckbox, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
