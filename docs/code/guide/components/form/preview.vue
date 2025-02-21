<template>
    <Preview>
        <FluxForm>
            <FluxPane>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormRow>
                            <FluxFormField label="First name">
                                <FluxFormInput
                                    model-value=""
                                    auto-complete="given_name"
                                    placeholder="E.g. Bas"/>
                            </FluxFormField>

                            <FluxFormField label="Last name">
                                <FluxFormInput
                                    model-value=""
                                    auto-complete="family_name"
                                    placeholder="E.g. Milius"/>
                            </FluxFormField>
                        </FluxFormRow>

                        <FluxFormField label="Email">
                            <FluxFormInput
                                model-value=""
                                auto-complete="email"
                                placeholder="E.g. bas@mili.us"
                                type="email"/>
                        </FluxFormField>

                        <FluxFormField label="Question">
                            <FluxFormTextArea auto-complete="email"/>
                        </FluxFormField>

                        <FluxFormField label="Phone number">
                            <FluxFormInputGroup>
                                <FluxFormInputAddition icon="phone"/>

                                <FluxFormInput
                                    model-value=""
                                    auto-complete="phone_number"
                                    placeholder="E.g. +31 6 12345678"
                                    type="tel"/>
                            </FluxFormInputGroup>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxPane>
        </FluxForm>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormInputAddition, FluxFormInputGroup, FluxFormRow, FluxFormTextArea, FluxPane, FluxPaneBody } from '@basmilius/flux';
</script>
