<template>
    <FluxPane style="max-width: 480px">
        <FluxPaneBody>
            <FluxForm>
                <FluxFormStep
                    title="Billing address"
                    subtitle="Where should we send the invoices?">
                    <template #end>
                        <FluxBadge
                            color="success"
                            label="Completed"/>
                    </template>

                    <FluxFormField label="Street">
                        <FluxFormInput placeholder="E.g. Main Street 1"/>
                    </FluxFormField>
                </FluxFormStep>

                <FluxFormStep
                    title="Payment method"
                    subtitle="Add a card to finish setting up billing.">
                    <template #end>
                        <FluxBadge
                            color="warning"
                            label="Action needed"/>
                    </template>

                    <FluxFormField label="Card number">
                        <FluxFormInput placeholder="E.g. 4242 4242 4242 4242"/>
                    </FluxFormField>
                </FluxFormStep>
            </FluxForm>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxBadge, FluxForm, FluxFormField, FluxFormInput, FluxFormStep, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
