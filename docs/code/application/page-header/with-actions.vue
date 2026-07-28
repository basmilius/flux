<template>
    <FluxApplicationPageHeader
        title="Invoices"
        description="Every invoice sent from this workspace.">
        <template #actions>
            <FluxSecondaryButton
                icon-leading="arrow-up-from-square"
                label="Export"/>

            <FluxSecondaryButton
                aria-label="Invoice settings"
                icon-leading="gear"/>

            <FluxPrimaryButton
                icon-leading="plus"
                label="New invoice"/>
        </template>
    </FluxApplicationPageHeader>
</template>

<script
    setup
    lang="ts">
    import { FluxApplicationPageHeader } from '@flux-ui/application';
    import { FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
