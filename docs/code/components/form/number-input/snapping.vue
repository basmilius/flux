<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    label="Quantity"
                    :hint="`Snaps to the nearest multiple of 5 on blur.`">
                    <FluxFormNumberInput
                        v-model="quantity"
                        :min="0"
                        :max="100"
                        :step="5"/>
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

    const quantity = ref<number | null>(20);
</script>
