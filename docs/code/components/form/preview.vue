<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormColumn>
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

                        <FluxFormField label="Email">
                            <FluxFormInput
                                auto-complete="email"
                                placeholder="E.g. email@example.com"
                                type="email"/>
                        </FluxFormField>

                        <FluxFormField label="Question">
                            <FluxFormTextArea auto-complete="email"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSpacer/>

                    <FluxPrimaryButton
                        icon-leading="circle-check"
                        label="Submit"/>
                </FluxPaneFooter>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormRow, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSpacer } from '@flux-ui/components';
</script>
