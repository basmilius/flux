<template>
    <div style="display: flex; padding: 12px 0; flex-wrap: wrap; justify-content: center; gap: 12px">
        <FluxFlowTerminal icon="play" label="Start"/>
        <FluxFlowTerminal icon="play" label="Start" color="success"/>
        <FluxFlowTerminal icon="circle-check" label="Done" color="primary"/>
        <FluxFlowTerminal icon="circle-xmark" label="Failed" color="danger"/>
        <FluxFlowTerminal icon="bell" label="Waiting" color="warning"/>
        <FluxFlowTerminal label="Cancelled" color="info"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxFlowTerminal } from '@flux-ui/flow';
</script>
