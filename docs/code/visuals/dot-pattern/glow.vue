<template>
    <FluxPane variant="well">
        <FluxAspectRatio :aspect-ratio="21 / 9">
            <FluxVisualDotPattern
                glow
                :width="18"
                :height="18"/>
        </FluxAspectRatio>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane } from '@flux-ui/components';
    import { FluxVisualDotPattern } from '@flux-ui/visuals';
</script>
