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
            description: 'Quick replies and short summaries.',
            badge: 'Fastest'
        },
        {
            id: 'standard',
            name: 'Standard',
            description: 'The everyday balance of speed and depth.',
            badge: 'Included'
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'Long reasoning, research and analysis.',
            badge: 'Most capable'
        }
    ];

    const model = ref('mini');
</script>
