<template>
    <FluxFlex
        direction="horizontal"
        :gap="21">
        <FluxProgressRing
            :size="24"
            :thickness="3"
            :value="0.4"/>

        <FluxProgressRing
            :size="42"
            :thickness="6"
            :value="0.4"/>

        <FluxProgressRing
            :size="60"
            :thickness="9"
            :value="0.4"/>

        <FluxProgressRing
            :size="84"
            :thickness="12"
            :value="0.4"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex, FluxProgressRing } from '@flux-ui/components';
</script>
