<template>
    <FluxPane style="max-width: 480px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormRepeater
                    v-model="addresses"
                    add-label="Add another address"
                    row-label="Address"
                    :new-row="newAddress">
                    <template #default="{row}">
                        <FluxFormField label="Street">
                            <FluxFormInput
                                v-model="row.street"
                                placeholder="E.g. Main Street 1"/>
                        </FluxFormField>

                        <FluxFormRow>
                            <FluxFormField label="Postal code">
                                <FluxFormInput
                                    v-model="row.postalCode"
                                    placeholder="E.g. 1234 AB"/>
                            </FluxFormField>

                            <FluxFormField label="City">
                                <FluxFormInput
                                    v-model="row.city"
                                    placeholder="E.g. Amsterdam"/>
                            </FluxFormField>
                        </FluxFormRow>
                    </template>
                </FluxFormRepeater>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormRepeater, FluxFormRow, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    type Address = {
        street: string;
        postalCode: string;
        city: string;
    };

    const addresses = ref<Address[]>([
        {street: 'Main Street 1', postalCode: '1234 AB', city: 'Amsterdam'}
    ]);

    function newAddress(): Address {
        return {street: '', postalCode: '', city: ''};
    }
</script>
