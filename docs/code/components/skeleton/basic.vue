<template>
    <Preview>
        <div style="display: flex; flex-direction: column; gap: 10px; width: 320px">
            <FluxSkeleton/>
            <FluxSkeleton/>
            <FluxSkeleton width="70%"/>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxSkeleton } from '@flux-ui/components';
</script>
