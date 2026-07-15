<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 380px">
        <FluxStatisticsComparison
            show-delta
            icon="stopwatch"
            title="Response time"
            current-label="This week"
            previous-label="Last week"
            :current="182"
            :previous="204"
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
        return `${value} ms`;
    }
</script>
