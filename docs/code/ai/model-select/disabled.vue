<template>
    <FluxAiModelSelect
        v-model="model"
        disabled
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
        }
    ];

    const model = ref('mini');
</script>
