<template>
    <FluxAiModelSelect
        v-model="model"
        :models="models">
        <template #option="{model}">
            <FluxFlex
                direction="vertical"
                :gap="3">
                <FluxFlex
                    align="baseline"
                    direction="horizontal"
                    :gap="9">
                    <strong>{{ model.name }}</strong>

                    <small>{{ prices[model.id] }}</small>
                </FluxFlex>

                <small>{{ model.description }}</small>
            </FluxFlex>
        </template>
    </FluxAiModelSelect>
</template>

<script
    lang="ts"
    setup>
    import { FluxAiModelSelect } from '@flux-ui/ai';
    import { FluxFlex } from '@flux-ui/components';
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
            description: 'Long reasoning, research and analysis.'
        }
    ];

    const prices: Record<string, string> = {
        mini: '$0.25 / 1M tokens',
        standard: '$3 / 1M tokens',
        pro: '$15 / 1M tokens'
    };

    const model = ref('standard');
</script>
