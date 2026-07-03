<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormSection
                    title="Billing details"
                    :heading-level="2">
                    <FluxFormColumn>
                        <FluxFormField label="Card number">
                            <FluxFormInput
                                v-model="cardNumber"
                                placeholder="E.g. 4242 4242 4242 4242"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxFormSection>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormSection, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const cardNumber = ref('');
</script>
