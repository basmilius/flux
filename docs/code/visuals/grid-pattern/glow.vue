<template>
    <FluxPane variant="well">
        <FluxAspectRatio :aspect-ratio="21 / 9">
            <FluxVisualGridPattern
                glow
                :width="30"
                :height="30"
                :stroke-dasharray="3"/>
        </FluxAspectRatio>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxPane } from '@flux-ui/components';
    import { FluxVisualGridPattern } from '@flux-ui/visuals';
</script>
