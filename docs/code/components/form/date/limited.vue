<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Birthdate">
                    <FluxFormDateInput
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
    import { FluxForm, FluxFormDateInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const min = ref(DateTime.fromSQL('1970-01-01'));
    const max = ref(DateTime.now());

    const value = ref(DateTime.fromSQL('1996-03-13'));
</script>
