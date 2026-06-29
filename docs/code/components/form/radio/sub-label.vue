<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Plan">
                    <FluxFormRadioGroup v-model="plan">
                        <FluxFormRadio
                            value="starter"
                            label="Starter"
                            sub-label="For individuals getting started with the basics."/>

                        <FluxFormRadio
                            value="pro"
                            label="Pro"
                            sub-label="For growing teams that need more power and seats."/>
                    </FluxFormRadioGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormRadio, FluxFormRadioGroup, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const plan = ref('pro');
</script>
