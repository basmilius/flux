<template>
    <FluxFlex
        :gap="9"
        wrap="wrap">
        <PreviewColumn
            v-for="i in 12"
            :key="i">
            Item {{ i }}
        </PreviewColumn>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
</script>
