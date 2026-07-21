<template>
    <FluxFlex :gap="15">
        <FluxFlowStep :value="1"/>
        <FluxFlowStep value="A"/>
        <FluxFlowStep value="Start"/>
        <FluxFlowStep value="Review"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxFlowStep } from '@flux-ui/flow';
</script>
