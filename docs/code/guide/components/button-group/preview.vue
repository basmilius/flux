<template>
    <Preview>
        <FluxButtonGroup>
            <FluxSecondaryButton icon-leading="align-left"/>
            <FluxPrimaryButton icon-leading="align-center"/>
            <FluxSecondaryButton icon-leading="align-right"/>
            <FluxSecondaryButton icon-leading="align-justify"/>
        </FluxButtonGroup>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxPrimaryButton, FluxSecondaryButton } from '@flux-ui/components';
</script>
