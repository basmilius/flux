<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="36">
            <FluxIcon
                :size="48"
                variant="circle-check"/>

            <FluxIcon
                :size="48"
                variant="lock"/>

            <FluxIcon
                :size="48"
                variant="rocket"/>
        </FluxStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxStack } from '@basmilius/flux';
</script>
