<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormRow>
                    <FluxFormField label="First name">
                        <FluxFormInput
                            auto-complete="given_name"
                            placeholder="E.g. John"/>
                    </FluxFormField>

                    <FluxFormField label="Last name">
                        <FluxFormInput
                            auto-complete="family_name"
                            placeholder="E.g. Doe"/>
                    </FluxFormField>
                </FluxFormRow>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormRow, FluxFormField, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
