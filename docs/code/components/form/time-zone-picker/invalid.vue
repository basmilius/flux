<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    label="Time zone"
                    error="Please select a time zone.">
                    <FluxFormTimeZonePicker
                        v-model="timezone"
                        placeholder="Select your timezone ..."/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormTimeZonePicker, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const timezone = ref(null);
</script>
