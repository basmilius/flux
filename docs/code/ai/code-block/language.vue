<template>
    <div class="stack">
        <FluxAiCodeBlock
            :code="code"
            language="sql"/>

        <FluxAiCodeBlock :code="code"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiCodeBlock } from '@flux-ui/ai';

    const code = 'select id, label from views where owner_id = $1 order by label;';
</script>

<style scoped>
    .stack {
        display: flex;
        flex-flow: column;
        gap: 15px;
    }
</style>
