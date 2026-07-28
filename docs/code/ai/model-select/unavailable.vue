<template>
    <FluxAiModelSelect
        v-model="model"
        :models="models"/>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiModelSelect } from '@flux-ui/ai';
    import { ref } from 'vue';

    const models = [
        {
            id: 'mini',
            name: 'Mini',
            description: 'Quick replies and short summaries.'
        },
        {
            id: 'standard',
            name: 'Standard',
            description: 'The everyday balance of speed and depth.'
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'Available on the Team plan.',
            badge: 'Upgrade',
            isDisabled: true
        }
    ];

    const model = ref('standard');
</script>
