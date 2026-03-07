<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormSection title="Personal information">
                            <FluxFormColumn>
                                <FluxFormField label="Full name">
                                    <FluxFormInput placeholder="E.g. John Doe"/>
                                </FluxFormField>

                                <FluxFormField label="Email address">
                                    <FluxFormInput
                                        type="email"
                                        placeholder="E.g. john@example.com"/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormSection>

                        <FluxFormSection title="Address">
                            <FluxFormColumn>
                                <FluxFormField label="Street">
                                    <FluxFormInput placeholder="E.g. Main Street 1"/>
                                </FluxFormField>

                                <FluxFormField label="City">
                                    <FluxFormInput placeholder="E.g. Amsterdam"/>
                                </FluxFormField>
                            </FluxFormColumn>
                        </FluxFormSection>
                    </FluxFormColumn>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormSection, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
