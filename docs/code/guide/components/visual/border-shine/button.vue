<template>
    <FluxBorderShine
        :colors="['transparent', 'transparent', 'transparent', '#10b981', 'transparent', 'transparent', 'transparent']"
        :duration="3"
        :width="1">
        <FluxSecondaryButton
            icon-before="circle-arrow-up"
            label="Upgrade now"/>
    </FluxBorderShine>
</template>

<script
    lang="ts"
    setup>
    import { FluxBorderShine, FluxSecondaryButton } from '@basmilius/flux';
</script>
