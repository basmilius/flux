<template>
    <Preview>
        <FluxPane style="max-width: 480px">
            <FluxForm>
                <FluxPaneHeader title="New project"/>

                <FluxPaneBody>
                    <FluxFormColumn>
                        <FluxFormField
                            label="Name"
                            :error="errors.name">
                            <FluxFormInput
                                v-model="form.name"
                                placeholder="E.g. Project Aurora"/>
                        </FluxFormField>

                        <FluxFormField
                            label="Key"
                            hint="A short uppercase identifier."
                            :error="errors.key">
                            <FluxFormInput
                                v-model="form.key"
                                placeholder="E.g. AUR"/>
                        </FluxFormField>

                        <FluxFormField label="Description">
                            <FluxFormTextArea
                                v-model="form.description"
                                placeholder="What is this project about?"/>
                        </FluxFormField>
                    </FluxFormColumn>
                </FluxPaneBody>

                <FluxPaneFooter>
                    <FluxSecondaryButton label="Cancel"/>

                    <FluxSpacer/>

                    <FluxPrimaryButton
                        icon-leading="floppy-disk"
                        label="Save"
                        @click="save"/>
                </FluxPaneFooter>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormColumn, FluxFormField, FluxFormInput, FluxFormTextArea, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '@flux-ui/components';
    import { reactive } from 'vue';

    const form = reactive({
        name: '',
        key: '',
        description: ''
    });

    const errors = reactive<{ name?: string; key?: string }>({});

    function save(): void {
        errors.name = form.name.trim() === '' ? 'A name is required.' : undefined;
        errors.key = /^[A-Z]{2,5}$/.test(form.key) ? undefined : 'Use 2 to 5 uppercase letters.';
    }
</script>
