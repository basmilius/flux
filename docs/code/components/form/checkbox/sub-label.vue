<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Notifications">
                    <FluxFormCheckboxGroup v-model="channels">
                        <FluxFormCheckbox
                            value="email"
                            label="Email notifications"
                            sub-label="Receive a weekly digest of activity in your account."/>

                        <FluxFormCheckbox
                            value="usage"
                            label="Share usage data"
                            sub-label="Help us improve the product by sharing anonymous usage statistics."/>
                    </FluxFormCheckboxGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormCheckbox, FluxFormCheckboxGroup, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const channels = ref(['email']);
</script>
