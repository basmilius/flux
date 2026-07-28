<template>
    <FluxAiStreamingText :content="content">
        <template #code="{code, language}">
            <FluxPane>
                <FluxPaneHeader :title="language ?? 'Snippet'"/>

                <FluxPaneBody>
                    <pre class="snippet">{{ code }}</pre>
                </FluxPaneBody>
            </FluxPane>
        </template>
    </FluxAiStreamingText>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiStreamingText } from '@flux-ui/ai';
    import { FluxPane, FluxPaneBody, FluxPaneHeader } from '@flux-ui/components';

    const content = [
        'Add the plugin before the router so its routes are registered in time:',
        '',
        '```ts',
        'app.use(fluxPlugin);',
        'app.use(router);',
        '```'
    ].join('\n');
</script>

<style scoped>
    .snippet {
        overflow-x: auto;
        font-family: var(--font-monospace);
        font-size: 13px;
    }
</style>
