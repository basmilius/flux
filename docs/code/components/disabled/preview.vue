<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="15"
            style="width: 100%; max-width: 345px">
            <FluxToggle v-model="isDisabled">
                Disable the section below
            </FluxToggle>

            <FluxDisabled :disabled="isDisabled">
                <FluxFlex
                    direction="vertical"
                    :gap="9">
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
                </FluxFlex>
            </FluxDisabled>
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxDisabled, FluxFlex, FluxFormField, FluxFormInput, FluxPrimaryButton, FluxSecondaryButton, FluxToggle } from '@flux-ui/components';
    import { ref } from 'vue';

    const isDisabled = ref(true);
</script>
