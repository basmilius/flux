<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 380px">
        <FluxStatisticsComparison
            style="min-width: 100%"
            icon="arrow-trend-down"
            title="Bounce rate"
            current-label="This week"
            previous-label="Last week"
            :current="38"
            :previous="32"
            :format="format"
            footer="lower is better"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsComparison } from '@flux-ui/statistics';

    function format(value: number): string {
        return `${value}%`;
    }
</script>
