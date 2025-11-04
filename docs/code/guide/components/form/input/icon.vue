<template>
    <FluxPane style="max-width: 390px">
        <FluxPaneBody>
            <FluxForm>
                <FluxFormInput
                    icon-leading="user"
                    placeholder="Put your username here!"/>
            </FluxForm>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxForm, FluxFormInput, FluxPane, FluxPaneBody } from '@flux-ui/components';
</script>
