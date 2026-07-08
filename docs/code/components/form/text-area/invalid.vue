<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    label="Message"
                    error="Please tell us why you are contacting us.">
                    <FluxFormTextArea
                        v-model="value"
                        placeholder="Why are you contacting us?"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormTextArea, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const value = ref('');
</script>
