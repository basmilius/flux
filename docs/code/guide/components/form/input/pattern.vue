<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxForm>
                <FluxFormInput
                    pattern="iban"
                    placeholder="NL12 ABNA 0123 4567 89"/>
            </FluxForm>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
