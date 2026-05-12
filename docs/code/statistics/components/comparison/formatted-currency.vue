<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 380px">
        <FluxStatisticsComparison
            style="min-width: 100%"
            icon="money-bill"
            title="Revenue"
            :current="48230"
            :previous="42118"
            :format="format"
            footer="vs. last quarter"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsComparison } from '@flux-ui/statistics';

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    });

    function format(value: number): string {
        return formatter.format(value);
    }
</script>
