<template>
    <FluxPane style="max-width: 441px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Shipping method">
                    <FluxFormRadioGroup v-model="shipping">
                        <FluxFormRadioTile
                            value="standard"
                            icon="truck"
                            label="Standard"
                            sub-label="Arrives in 5–7 business days. Free."/>

                        <FluxFormRadioTile
                            value="express"
                            icon="bolt"
                            label="Express"
                            sub-label="Arrives in 2 business days. $12."/>

                        <FluxFormRadioTile
                            value="overnight"
                            icon="rocket"
                            label="Overnight"
                            sub-label="Arrives the next business day. $29."/>
                    </FluxFormRadioGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormRadioGroup, FluxFormRadioTile, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const shipping = ref('standard');
</script>
