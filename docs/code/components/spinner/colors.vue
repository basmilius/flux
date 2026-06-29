<template>
    <FluxFlex
        direction="horizontal"
        :gap="21">
        <FluxSpinner
            color="primary"
            :size="36"/>

        <FluxSpinner
            color="danger"
            :size="36"/>

        <FluxSpinner
            color="info"
            :size="36"/>

        <FluxSpinner
            color="success"
            :size="36"/>

        <FluxSpinner
            color="warning"
            :size="36"/>

        <FluxSpinner
            color="gray"
            :size="36"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxSpinner } from '@flux-ui/components';
</script>
