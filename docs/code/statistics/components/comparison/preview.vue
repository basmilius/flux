<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="18"
            style="width: 100%; max-width: 380px">
            <FluxStatisticsComparison
                style="min-width: 100%"
                icon="arrow-trend-up"
                title="Monthly active users"
                :current="12480"
                :previous="11203"
                footer="vs. last month"/>
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsComparison } from '@flux-ui/statistics';
</script>
