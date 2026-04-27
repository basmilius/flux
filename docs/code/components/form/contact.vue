<template>
    <FluxPane style="max-width: 480px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormColumn>
                    <FluxFormGrid :columns="2">
                        <FluxFormField label="First name">
                            <FluxFormInput
                                auto-complete="given-name"
                                placeholder="E.g. John"/>
                        </FluxFormField>

                        <FluxFormField label="Last name">
                            <FluxFormInput
                                auto-complete="family-name"
                                placeholder="E.g. Doe"/>
                        </FluxFormField>
                    </FluxFormGrid>

                    <FluxFormField label="Email">
                        <FluxFormInput
                            auto-complete="email"
                            placeholder="E.g. john@example.com"
                            type="email"/>
                    </FluxFormField>

                    <FluxFormField label="Message">
                        <FluxFormTextArea
                            :rows="4"
                            placeholder="How can we help?"/>
                    </FluxFormField>
                </FluxFormColumn>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxPrimaryButton
                    icon-leading="paper-plane"
                    label="Send message"/>
            </FluxPaneFooter>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormGrid, FluxFormInput, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPrimaryButton, FluxSpacer } from '@flux-ui/components';
</script>
