<template>
    <Preview>
        <FluxFlex
            align="center"
            direction="horizontal"
            :gap="9">
            <FluxVisualPing/>

            <span style="font-weight: 500;">Live</span>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex } from '@flux-ui/components';
    import { FluxVisualPing } from '@flux-ui/visuals';
</script>
