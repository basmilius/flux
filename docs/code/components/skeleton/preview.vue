<template>
    <Preview>
        <div style="display: flex; gap: 16px; align-items: center; width: 320px">
            <FluxSkeleton
                variant="circle"
                :width="48"
                :height="48"/>

            <div style="display: flex; flex-direction: column; gap: 10px; flex: 1">
                <FluxSkeleton width="55%"/>
                <FluxSkeleton/>
                <FluxSkeleton width="80%"/>
            </div>
        </div>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxSkeleton } from '@flux-ui/components';
</script>
