<template>
    <Preview>
        <FluxPane style="max-width: 480px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormGrid :columns="2">
                        <FluxFormField label="First name">
                            <FluxFormInput placeholder="E.g. John"/>
                        </FluxFormField>

                        <FluxFormField label="Last name">
                            <FluxFormInput placeholder="E.g. Doe"/>
                        </FluxFormField>

                        <FluxFormField label="City">
                            <FluxFormInput placeholder="E.g. Amsterdam"/>
                        </FluxFormField>

                        <FluxFormField label="Postal code">
                            <FluxFormInput placeholder="E.g. 1234 AB"/>
                        </FluxFormField>
                    </FluxFormGrid>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormGrid, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
