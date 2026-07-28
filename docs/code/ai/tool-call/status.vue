<template>
    <FluxFlex
        direction="vertical"
        :gap="12"
        style="width: 100%">
        <FluxAiToolCall
            :arguments="{query: 'open incidents'}"
            name="query_database"
            status="running"/>

        <FluxAiToolCall
            :arguments="{query: 'open incidents'}"
            :duration="1.6"
            name="query_database"
            result="4 rows"/>

        <FluxAiToolCall
            :arguments="{query: 'open incidents'}"
            :duration="30"
            name="query_database"
            result="timeout after 30s"
            status="error"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';
    import { FluxFlex } from '@flux-ui/components';
</script>
