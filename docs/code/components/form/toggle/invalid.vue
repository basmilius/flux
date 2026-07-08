<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    label="Do you agree with the terms and conditions?"
                    error="You must enable this to continue.">
                    <FluxToggle :model-value="false"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxPane, FluxPaneBody, FluxToggle } from '@flux-ui/components';
</script>
