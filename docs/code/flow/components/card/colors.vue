<template>
    <FluxFlex
        :gap="48"
        style="flex-wrap: wrap; align-items: flex-start; justify-content: center; padding: 12px 0">
        <FluxFlowCard title="Primary" icon="robot" color="primary">
            An agent step.
        </FluxFlowCard>

        <FluxFlowCard title="Info" icon="bolt" color="info">
            A trigger step.
        </FluxFlowCard>

        <FluxFlowCard title="Success" icon="circle-check" color="success">
            A completed step.
        </FluxFlowCard>

        <FluxFlowCard title="Warning" icon="gauge" color="warning">
            A step needing review.
        </FluxFlowCard>

        <FluxFlowCard title="Danger" icon="stopwatch" color="danger">
            A failed step.
        </FluxFlowCard>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import { FluxFlex } from '@flux-ui/components';
    import { FluxFlowCard } from '@flux-ui/flow';
</script>
