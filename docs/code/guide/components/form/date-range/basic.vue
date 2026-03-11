<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Period">
                    <FluxFormDateRangeInput v-model="value"/>
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

    const value = ref<[DateTime, DateTime] | null>(null);
</script>
