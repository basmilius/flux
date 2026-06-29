<template>
    <FluxPane style="max-width: 411px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Payment method">
                    <FluxFormRadioGroup
                        v-model="method"
                        is-connected>
                        <FluxFormRadioTile
                            value="card"
                            icon="money-bill"
                            label="Card"
                            sub-label="Pay with a saved or new card."/>

                        <FluxFormRadioTile
                            value="bank"
                            icon="building-columns"
                            label="Bank transfer"
                            sub-label="Pay directly from your bank."/>

                        <FluxFormRadioTile
                            value="paypal"
                            icon="bolt"
                            label="PayPal"
                            sub-label="Pay using your PayPal balance."/>
                    </FluxFormRadioGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormRadioGroup, FluxFormRadioTile, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const method = ref('card');
</script>
