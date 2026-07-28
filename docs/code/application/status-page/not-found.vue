<template>
    <FluxApplicationStatusPage
        code="404"
        variant="not-found"
        description="The page you were looking for does not exist, or it moved somewhere else.">
        <template #actions>
            <FluxPrimaryButton
                icon-leading="house"
                label="Go to dashboard"/>

            <FluxSecondaryButton label="Contact support"/>
        </template>
    </FluxApplicationStatusPage>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationStatusPage } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
