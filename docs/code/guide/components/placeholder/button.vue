<template>
    <FluxPane>
        <FluxPaneBody>
            <FluxPlaceholder
                icon="files"
                title="No templates found!"
                message="There aren't any invoice templates yet.">

                <FluxSecondaryButton label="Create template"/>
            </FluxPlaceholder>
        </FluxPaneBody>
    </FluxPane>
</template>

<script
    setup
    lang="ts">
    import { FluxPane, FluxPaneBody, FluxPlaceholder, FluxSecondaryButton } from '@flux-ui/components';
</script>
