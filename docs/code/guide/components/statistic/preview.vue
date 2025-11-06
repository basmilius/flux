<template>
    <Preview>
        <FluxStack
            :gap="10"
            direction="vertical">
            <FluxStatistic
                color="info"
                icon="circle"
                label="Label"
                value="Value"/>

            <FluxStatistic
                icon="users"
                color="danger"
                label="Active users this month"
                value="750"
                change-color="danger"
                change-value="10%"
                change-icon="arrow-trend-down"/>

            <FluxStatistic
                icon="user-plus"
                color="success"
                label="New users this month"
                value="20"
                change-color="success"
                change-value="5%"
                change-icon="arrow-trend-up"/>
        </FluxStack>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxStack, FluxStatistic } from '@flux-ui/components';
</script>
