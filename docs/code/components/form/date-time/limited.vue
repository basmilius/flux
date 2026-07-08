<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Starts on">
                    <FluxFormDateTimeInput
                        v-model="value"
                        :min="min"
                        :max="max"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormDateTimeInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const min = ref(DateTime.now().startOf('day'));
    const max = ref(DateTime.now().plus({days: 7}).endOf('day'));

    const value = ref(DateTime.now());
</script>
