<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Notifications">
                    <FluxFormCheckbox
                        v-model="email"
                        label="Email notifications"/>

                    <FluxFormCheckbox
                        v-model="push"
                        label="Push notifications"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormCheckbox, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const email = ref(true);
    const push = ref(false);
</script>
