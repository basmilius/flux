<template>
    <FluxAiUsage
        cost="$0.14"
        :input-tokens="18420"
        is-compact
        :limit="200000"
        :output-tokens="3175"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiUsage } from '@flux-ui/ai';
</script>
