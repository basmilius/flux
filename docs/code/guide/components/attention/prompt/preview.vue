<template>
    <Preview>
        <FluxPane>
            <FluxPaneHeader
                icon="circle-exclamation"
                title="Prompt"/>

            <FluxPaneBody>
                <p>Before this page can be accessed, we need your full name.</p>
            </FluxPaneBody>

            <FluxPaneBody>
                <FluxFormField label="Name">
                    <FluxFormInput
                        v-model="name"
                        ref="input"
                        placeholder="E.g. John Doe"/>
                </FluxFormField>
            </FluxPaneBody>

            <FluxPaneFooter>
                <FluxSpacer/>

                <FluxSecondaryButton label="Cancel"/>

                <FluxPrimaryButton
                    icon-leading="circle-check"
                    label="Ok"/>
            </FluxPaneFooter>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFormField, FluxFormInput, FluxPane, FluxPaneBody, FluxPaneFooter, FluxPaneHeader, FluxPrimaryButton, FluxSecondaryButton, FluxSpacer } from '@flux-ui/flux';
    import { ref } from 'vue';

    const name = ref('');
</script>
