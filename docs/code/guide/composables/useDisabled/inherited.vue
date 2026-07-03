<template>
    <FluxFlex
        direction="vertical"
        :gap="9">
        <FluxToggle v-model="parentDisabled">
            Disable everything below
        </FluxToggle>

        <FluxDisabled :disabled="parentDisabled">
            <FluxFormField label="First name">
                <FluxFormInput placeholder="E.g. John"/>
            </FluxFormField>

            <FluxFormField label="Last name">
                <FluxFormInput placeholder="E.g. Doe"/>
            </FluxFormField>

            <FluxFlex :gap="9">
                <FluxSecondaryButton label="Cancel"/>
                <FluxPrimaryButton label="Save"/>
            </FluxFlex>
        </FluxDisabled>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxDisabled, FluxFlex, FluxFormField, FluxFormInput, FluxPrimaryButton, FluxSecondaryButton, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const parentDisabled = ref(false);
</script>
