<template>
    <FluxAspectRatio :aspect-ratio="16 / 9">
        <FluxPane style="align-items: center; display: flex; justify-content: center;">
            16:9
        </FluxPane>
    </FluxAspectRatio>
</template>

<script
    setup
    lang="ts">
    import { FluxAspectRatio, FluxPane } from '@flux-ui/components';
</script>
