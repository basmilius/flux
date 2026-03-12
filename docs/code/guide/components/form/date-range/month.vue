<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Month">
                    <FluxFormDateRangeInput
                        v-model="value"
                        range-mode="month"/>
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
        DateTime.now().startOf('month'),
        DateTime.now().endOf('month')
    ]);
</script>
