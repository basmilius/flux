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
                            label="Email"/>

                        <FluxFormCheckbox
                            value="sms"
                            label="SMS"/>

                        <FluxFormCheckbox
                            value="push"
                            label="Push"/>
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

    const channels = ref(['email', 'push']);
</script>
