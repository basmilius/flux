<template>
    <Preview>
        <FluxFlex :gap="36">
            <FluxIcon
                name="circle-check"
                :size="48"/>

            <FluxIcon
                name="lock"
                :size="48"/>

            <FluxIcon
                name="rocket"
                :size="48"/>
        </FluxFlex>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxFlex, FluxIcon } from '@flux-ui/components';
</script>
