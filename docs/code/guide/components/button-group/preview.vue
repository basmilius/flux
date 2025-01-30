<template>
    <Preview>
        <FluxButtonGroup>
            <FluxSecondaryButton icon-before="align-left"/>
            <FluxPrimaryButton icon-before="align-center"/>
            <FluxSecondaryButton icon-before="align-right"/>
            <FluxSecondaryButton icon-before="align-justify"/>
        </FluxButtonGroup>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxButtonGroup, FluxPrimaryButton, FluxSecondaryButton } from '@basmilius/flux';
</script>
