<template>
    <FluxAiStreamingText :content="content"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiStreamingText } from '@flux-ui/ai';

    const content = [
        'Guard the route with a navigation hook instead of a check inside the view,',
        'so an unauthorized visitor never renders it at all.',
        '',
        '```ts',
        'router.beforeEach(to => {',
        '    if (!to.meta.requiresAuth) {',
        '        return true;',
        '    }',
        '',
        '    return useSession().isSignedIn || {name: "sign-in"};',
        '});',
        '```',
        '',
        'Without a language the block still renders, only without a label:',
        '',
        '```',
        'FLUX_API_URL=https://api.example.com',
        'FLUX_API_TIMEOUT=15000',
        '```'
    ].join('\n');
</script>
