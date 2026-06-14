<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    label="Temperature"
                    :hint="`Between 16 and 28 °C, in steps of 0.5.`">
                    <FluxFormNumberInput
                        v-model="temperature"
                        :min="16"
                        :max="28"
                        :step="0.5"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormNumberInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const temperature = ref<number | null>(21);
</script>
