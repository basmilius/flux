<template>
    <FluxFlex
        :gap="48"
        style="flex-wrap: wrap; align-items: flex-start; justify-content: center; padding: 42px 0 12px">
        <FluxFlowCard title="Primary" label="Agent" icon="robot" color="primary">
            An agent step.
        </FluxFlowCard>

        <FluxFlowCard title="Info" label="Trigger" icon="bolt" color="info">
            A trigger step.
        </FluxFlowCard>

        <FluxFlowCard title="Success" label="Done" icon="circle-check" color="success">
            A completed step.
        </FluxFlowCard>

        <FluxFlowCard title="Warning" label="Review" icon="gauge" color="warning">
            A step needing review.
        </FluxFlowCard>

        <FluxFlowCard title="Danger" label="Error" icon="stopwatch" color="danger">
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
