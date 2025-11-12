<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormColumn>
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
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
