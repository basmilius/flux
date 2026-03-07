<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="9">
            <FluxStatisticsChange
                color="success"
                icon="arrow-trend-up"
                value="+8.2%"/>

            <FluxStatisticsChange
                color="danger"
                icon="arrow-trend-down"
                value="-3.5%"/>

            <FluxStatisticsChange
                color="warning"
                value="~0.1%"/>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStack } from '@flux-ui/components';
    import { FluxStatisticsChange } from '@flux-ui/statistics';
</script>
