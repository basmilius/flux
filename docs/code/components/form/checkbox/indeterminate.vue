<template>
    <FluxPane style="max-width: 390px">
        <FluxForm>
            <FluxPaneBody>
                <FluxFormField label="Newsletter">
                    <FluxFormCheckbox
                        :model-value="null"
                        label="I want to receive weekly updates."/>
                </FluxFormField>
            </FluxPaneBody>
        </FluxForm>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormCheckbox, FluxForm, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
