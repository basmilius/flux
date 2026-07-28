<template>
    <FluxAiStreamingText :content="content"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiStreamingText } from '@flux-ui/ai';

    const content = [
        'A workspace groups everything one team works on: projects, members and',
        'billing. You can belong to more than one workspace, and switching between',
        'them never mixes their data.',
        '',
        '1. Open the workspace menu in the top left.',
        '2. Pick **New workspace**.',
        '3. Invite the people who need access.',
        '',
        '> A workspace can be renamed later, but its slug is permanent.'
    ].join('\n');
</script>
