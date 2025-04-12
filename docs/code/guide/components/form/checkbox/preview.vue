<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormField label="Newsletter">
                        <FluxCheckbox
                            model-value
                            label="I want to receive weekly updates."/>
                    </FluxFormField>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxCheckbox, FluxForm, FluxFormField, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
