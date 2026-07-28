<template>
    <FluxAiUsage
        cost="$1.32"
        :input-tokens="164280"
        :limit="200000"
        :output-tokens="21940"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiUsage } from '@flux-ui/ai';
</script>
