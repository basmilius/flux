<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="15">
            <FluxBoxedIcon
                name="circle-check"
                :size="90"/>

            <FluxBoxedIcon
                name="lock"
                :size="90"/>

            <FluxBoxedIcon
                name="rocket"
                :size="90"/>
        </FluxStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxStack } from '@flux-ui/components';
</script>
