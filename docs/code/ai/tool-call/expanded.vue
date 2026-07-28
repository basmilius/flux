<template>
    <FluxFlex
        direction="vertical"
        :gap="12"
        style="width: 100%">
        <FluxSecondaryButton
            :label="isExpanded ? 'Collapse the call' : 'Expand the call'"
            @click="isExpanded = !isExpanded"/>

        <FluxAiToolCall
            v-model:is-expanded="isExpanded"
            :arguments="{owner: 'basmilius', repo: 'flux', state: 'open'}"
            :duration="2.1"
            name="list_pull_requests"
            result='[{"number": 36, "title": "Resolve a cell column by accumulating colspans"}]'/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { ref } from 'vue';

    const isExpanded = ref(false);
</script>
