<template>
    <Preview>
        <FluxPane style="max-width: 540px">
            <FluxForm>
                <FluxPaneBody>
                    <FluxFormGrid :columns="3">
                        <FluxFormField label="Street">
                            <FluxFormInput placeholder="E.g. Main Street"/>
                        </FluxFormField>

                        <FluxFormField label="Number">
                            <FluxFormInput placeholder="E.g. 12"/>
                        </FluxFormField>

                        <FluxFormField label="Suffix">
                            <FluxFormInput placeholder="E.g. A"/>
                        </FluxFormField>
                    </FluxFormGrid>
                </FluxPaneBody>
            </FluxForm>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormField, FluxFormGrid, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
