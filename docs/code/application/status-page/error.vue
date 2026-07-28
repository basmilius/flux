<template>
    <FluxApplicationStatusPage
        code="500"
        variant="error">
        <template #actions>
            <FluxPrimaryButton
                icon-leading="rotate"
                label="Try again"/>

            <FluxSecondaryButton label="Report this"/>
        </template>
    </FluxApplicationStatusPage>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationStatusPage } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
