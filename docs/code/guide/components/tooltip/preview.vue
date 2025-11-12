<template>
    <Preview>
        <FluxButtonStack>
            <FluxTooltip
                content="A vertical tooltip">
                <FluxSecondaryButton
                    icon-leading="copy"
                    label="Hover me"/>
            </FluxTooltip>

            <FluxTooltip
                direction="horizontal"
                content="A horizontal tooltip">
                <FluxSecondaryButton
                    icon-leading="copy"
                    label="Hover me"/>
            </FluxTooltip>

        </FluxButtonStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxButtonStack, FluxSecondaryButton, FluxTooltip } from '@flux-ui/components';
</script>
