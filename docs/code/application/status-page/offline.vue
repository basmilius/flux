<template>
    <FluxApplicationStatusPage variant="offline">
        <template #actions>
            <FluxPrimaryButton
                icon-leading="rotate"
                label="Try again"/>

            <FluxSecondaryButton label="Work offline"/>
        </template>
    </FluxApplicationStatusPage>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationStatusPage } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
