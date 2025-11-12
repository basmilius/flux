<template>
    <Preview>
        <FluxPane style="max-width: 390px">
            <FluxPaneBody>
                <FluxForm>
                    <FluxFormInput
                        placeholder="Any input here!"/>
                </FluxForm>
            </FluxPaneBody>
        </FluxPane>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
