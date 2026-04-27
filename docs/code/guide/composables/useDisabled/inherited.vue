<template>
    <Preview>
        <FluxStack :gap="9">
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

                <FluxStack
                    direction="horizontal"
                    :gap="9">
                    <FluxSecondaryButton label="Cancel"/>
                    <FluxPrimaryButton label="Save"/>
                </FluxStack>
            </FluxDisabled>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxDisabled, FluxFormField, FluxFormInput, FluxPrimaryButton, FluxSecondaryButton, FluxStack, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const parentDisabled = ref(false);
</script>
