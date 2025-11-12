<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Label" is-optional>
                    <FluxFormInput placeholder="Any input here!"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormField, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
