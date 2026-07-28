<template>
    <Preview>
        <FluxAiUsage
            cost="$0.14"
            :input-tokens="18420"
            :limit="200000"
            :output-tokens="3175"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiUsage } from '@flux-ui/ai';
</script>
