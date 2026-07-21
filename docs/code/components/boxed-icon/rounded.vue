<template>
    <FluxFlex :gap="15">
        <FluxBoxedIcon
            rounded
            color="primary"
            name="circle-check"
            :size="90"/>

        <FluxBoxedIcon
            rounded
            color="warning"
            name="lock"
            :size="90"/>

        <FluxBoxedIcon
            rounded
            name="rocket"
            :size="90"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxFlex } from '@flux-ui/components';
</script>
