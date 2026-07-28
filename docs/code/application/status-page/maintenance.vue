<template>
    <FluxApplicationStatusPage
        code="503"
        variant="maintenance"
        description="We are rolling out an update. Everything should be back within a few minutes.">
        <template #actions>
            <FluxSecondaryButton
                icon-leading="rotate"
                label="Check again"/>

            <FluxSecondaryButton label="View status page"/>
        </template>
    </FluxApplicationStatusPage>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationStatusPage } from '@flux-ui/application';
    import { FluxSecondaryButton } from '@flux-ui/components';
</script>
