<template>
    <FluxDisabled disabled>
        <FluxFlex
            direction="vertical"
            :gap="9">
            <FluxFormField label="Email">
                <FluxFormInput placeholder="you@example.com"/>
            </FluxFormField>

            <FluxPrimaryButton label="Subscribe"/>
        </FluxFlex>
    </FluxDisabled>
</template>

<script
    setup
    lang="ts">
    import { FluxDisabled, FluxFlex, FluxFormField, FluxFormInput, FluxPrimaryButton } from '@flux-ui/components';
</script>
