<template>
    <div class="controlled">
        <FluxSecondaryButton
            :label="isExpanded ? 'Hide the reasoning' : 'Show the reasoning'"
            @click="isExpanded = !isExpanded"/>

        <FluxAiReasoning
            v-model:is-expanded="isExpanded"
            content="The staging database sits behind a different security group, so the timeout is a network rule rather than a slow query."
            :duration="4"/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiReasoning } from '@flux-ui/ai';
    import { FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isExpanded = ref(false);
</script>

<style
    scoped
    lang="css">
    .controlled {
        display: flex;
        flex-flow: column;
        align-items: start;
        gap: 15px;
    }
</style>
