<template>
    <FluxPane style="max-width: 480px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormRepeater
                    v-model="phoneNumbers"
                    add-label="Add phone number"
                    :max="3"
                    :min="1"
                    row-label="Phone number"
                    :new-row="newPhoneNumber">
                    <template #default="{index, row}">
                        <FluxFormField :label="`Phone number ${index + 1}`">
                            <FluxFormInput
                                v-model="row.number"
                                type="tel"
                                placeholder="E.g. +31 6 1234 5678"/>
                        </FluxFormField>
                    </template>
                </FluxFormRepeater>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormRepeater, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    type PhoneNumber = {
        number: string;
    };

    const phoneNumbers = ref<PhoneNumber[]>([
        {number: '+31 6 1234 5678'}
    ]);

    function newPhoneNumber(): PhoneNumber {
        return {number: ''};
    }
</script>
