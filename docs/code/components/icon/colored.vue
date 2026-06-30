<template>
    <Preview>
        <FluxFlex :gap="36">
            <FluxIcon
                color="gray"
                name="rocket"
                :size="48"/>

            <FluxIcon
                color="primary"
                name="rocket"
                :size="48"/>

            <FluxIcon
                color="danger"
                name="rocket"
                :size="48"/>

            <FluxIcon
                color="info"
                name="rocket"
                :size="48"/>

            <FluxIcon
                color="success"
                name="rocket"
                :size="48"/>

            <FluxIcon
                color="warning"
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
