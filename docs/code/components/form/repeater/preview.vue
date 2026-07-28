<template>
    <Preview>
        <FluxPane style="max-width: 480px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormRepeater
                        v-model="contacts"
                        add-label="Add contact"
                        row-label="Contact"
                        :new-row="newContact">
                        <template #default="{row}">
                            <FluxFormRow>
                                <FluxFormField label="Name">
                                    <FluxFormInput
                                        v-model="row.name"
                                        placeholder="E.g. John Doe"/>
                                </FluxFormField>

                                <FluxFormField label="Email address">
                                    <FluxFormInput
                                        v-model="row.email"
                                        type="email"
                                        placeholder="E.g. john@example.com"/>
                                </FluxFormField>
                            </FluxFormRow>
                        </template>
                    </FluxFormRepeater>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormInput, FluxFormRepeater, FluxFormRow, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    type Contact = {
        name: string;
        email: string;
    };

    const contacts = ref<Contact[]>([
        {name: 'John Doe', email: 'john@example.com'}
    ]);

    function newContact(): Contact {
        return {name: '', email: ''};
    }
</script>
