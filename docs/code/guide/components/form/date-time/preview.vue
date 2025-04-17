<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormField label="Starts on">
                        <FluxFormDateTimeInput v-model="value"/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormDateTimeInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const value = ref(DateTime.fromSQL('1996-03-13 13:37'));
</script>
