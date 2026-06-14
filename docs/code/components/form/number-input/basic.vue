<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Amount">
                    <FluxFormNumberInput
                        v-model="amount"
                        :min="0"
                        placeholder="0"/>
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

    const amount = ref<number | null>(1);
</script>
