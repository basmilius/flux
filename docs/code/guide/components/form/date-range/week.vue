<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Week">
                    <FluxFormDateRangeInput
                        v-model="value"
                        range-mode="week"/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxForm, FluxFormDateRangeInput, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { DateTime } from 'luxon';
    import { ref } from 'vue';

    const value = ref<[DateTime, DateTime] | null>([
        DateTime.now().startOf('week'),
        DateTime.now().endOf('week')
    ]);
</script>
