<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormField label="Birthdate">
                        <FluxFormDateInput v-model="value"/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormDateInput, FluxFormField, FluxPane, FluxPaneBody } from '@basmilius/flux';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const value = ref(DateTime.fromSQL('1996-03-13'));
</script>
