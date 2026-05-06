<template>
    <Preview>
        <FluxFlex
            direction="vertical"
            :gap="10">
            <FluxStatistic
                color="info"
                icon="circle"
                label="Label"
                value="Value"/>

            <FluxStatistic
                label="Label"
                value="Value"
                image-src="https://avatars.githubusercontent.com/u/978257?v=4"/>

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
        </FluxFlex>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxStatistic } from '@flux-ui/components';
</script>
