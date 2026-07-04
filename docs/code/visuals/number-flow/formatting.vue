<template>
    <FluxFlex
        align="start"
        direction="vertical"
        :gap="18">
        <FluxFlex
            v-for="item in items"
            :key="item.label"
            align="baseline"
            direction="horizontal"
            :gap="12">
            <span style="width: 120px; color: var(--gray-500); font-size: 13px; font-weight: 500;">{{ item.label }}</span>

            <FluxVisualNumberFlow
                :format="item.format"
                :value="item.value"
                style="font-size: 24px; font-weight: 700;"/>
        </FluxFlex>

        <FluxSecondaryButton
            icon-leading="rotate"
            label="New values"
            @click="randomize"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxSecondaryButton } from '@flux-ui/components';
    import { FluxVisualNumberFlow } from '@flux-ui/visuals';
    import { reactive } from 'vue';

    type Metric = {
        label: string;
        value: number;
        format: Intl.NumberFormatOptions;
    };

    const items = reactive<Metric[]>([
        {label: 'Revenue', value: 128400, format: {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}},
        {label: 'Conversion', value: 0.184, format: {style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1}},
        {label: 'Avg. rating', value: 4.6, format: {minimumFractionDigits: 1, maximumFractionDigits: 1}}
    ]);

    function randomize(): void {
        items[0].value = 80000 + Math.floor(Math.random() * 100000);
        items[1].value = Math.random() * 0.4;
        items[2].value = 3 + Math.random() * 2;
    }
</script>
