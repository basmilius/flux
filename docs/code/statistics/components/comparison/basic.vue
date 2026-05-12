<template>
    <FluxFlex
        direction="vertical"
        :gap="18"
        style="width: 100%; max-width: 380px">
        <FluxStatisticsComparison
            style="min-width: 100%"
            icon="user-plus"
            title="New customers"
            :current="284"
            :previous="232"
            footer="this quarter"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxStatisticsComparison } from '@flux-ui/statistics';
</script>
