<template>
    <FluxBorderShine
        :colors="['transparent', 'transparent', 'transparent', '#10b981', 'transparent', 'transparent', 'transparent']"
        :duration="3"
        :width="1">
        <FluxSecondaryButton
            icon-leading="circle-arrow-up"
            label="Upgrade now"/>
    </FluxBorderShine>
</template>

<script
    lang="ts"
    setup>
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { FluxBorderShine } from '@flux-ui/visuals';
</script>
