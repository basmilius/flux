<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Plan">
                    <FluxFormRadioGroup v-model="plan">
                        <FluxFormRadio
                            value="free"
                            label="Free"/>

                        <FluxFormRadio
                            value="pro"
                            label="Pro"/>

                        <FluxFormRadio
                            value="enterprise"
                            label="Enterprise"/>
                    </FluxFormRadioGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxPane, FluxPaneBody, FluxFormRadio, FluxFormRadioGroup } from '@flux-ui/components';
    import { ref } from 'vue';

    const plan = ref('pro');
</script>
