<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="15">
            <FluxBoxedIcon
                :size="90"
                variant="circle-check"/>

            <FluxBoxedIcon
                :size="90"
                variant="lock"/>

            <FluxBoxedIcon
                :size="90"
                variant="rocket"/>
        </FluxStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxBoxedIcon, FluxStack } from '@basmilius/flux';
</script>
