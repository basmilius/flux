<template>
    <FluxFlex :gap="15">
        <FluxBoxedIcon
            name="circle-check"
            :size="90"/>

        <FluxBoxedIcon
            name="lock"
            :size="90"/>

        <FluxBoxedIcon
            name="rocket"
            :size="90"/>
    </FluxFlex>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxFlex } from '@flux-ui/components';
</script>
