<template>
    <FluxPane style="max-width: 420px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField
                    as="group"
                    label="Add-ons">
                    <FluxFormCheckboxGroup v-model="addons">
                        <FluxFormCheckboxTile
                            value="support"
                            icon="bolt"
                            label="Priority support"
                            sub-label="Get faster responses from our team."/>

                        <FluxFormCheckboxTile
                            value="analytics"
                            icon="gauge-high"
                            label="Advanced analytics"
                            sub-label="Unlock detailed usage reports."/>

                        <FluxFormCheckbox
                            value="newsletter"
                            label="Product newsletter"/>
                    </FluxFormCheckboxGroup>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormCheckbox, FluxFormCheckboxGroup, FluxFormCheckboxTile, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
    import { ref } from 'vue';

    const addons = ref(['support']);
</script>
