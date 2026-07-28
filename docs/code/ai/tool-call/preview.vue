<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="12"
            style="width: 100%; max-width: 510px">
            <FluxAiToolCall
                :arguments="{query: 'flux color tokens', limit: 5}"
                :duration="0.8"
                is-expanded
                name="search_documentation"
                :result="result"/>

            <FluxAiToolCall
                :arguments="{path: 'packages/components/src/css/token/semantic.scss'}"
                name="read_file"
                status="running"/>

            <FluxAiToolCall
                :arguments="{command: 'bun run build'}"
                :duration="12.4"
                name="run_command"
                result="error: cannot find module '@flux-ui/internals'"
                status="error"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiToolCall } from '@flux-ui/ai';
    import { FluxFlex } from '@flux-ui/components';

    const result = JSON.stringify([
        {title: 'Design tokens', score: 0.94},
        {title: 'Color intents', score: 0.88},
        {title: 'Palette stops', score: 0.71}
    ], null, 4);
</script>
