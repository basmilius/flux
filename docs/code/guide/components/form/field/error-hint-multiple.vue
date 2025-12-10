<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Label">
                    <FluxFormInput placeholder="Any input here!"/>

                    <template #addition>
                        <FluxFormFieldAddition
                            v-for="hint in hints"
                            icon="circle-info"
                            mode="hint"
                            :message="hint"/>

                        <FluxFormFieldAddition
                            v-for="error in errors"
                            icon="circle-exclamation"
                            mode="error"
                            :message="error"/>
                    </template>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormField, FluxFormFieldAddition, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';

    const errors = [
        "Value must be greater than 10",
        "Value must be less than 20"
    ];

    const hints = [
        "Your username must be between 10 and 20 characters long.",
        "You cannot use special characters."
    ]
</script>
