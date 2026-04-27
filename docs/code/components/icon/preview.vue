<template>
    <Preview>
        <FluxStack
            direction="horizontal"
            :gap="36">
            <FluxIcon
                name="circle-check"
                :size="48"/>

            <FluxIcon
                name="lock"
                :size="48"/>

            <FluxIcon
                name="rocket"
                :size="48"/>
        </FluxStack>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxIcon, FluxStack } from '@flux-ui/components';
</script>
