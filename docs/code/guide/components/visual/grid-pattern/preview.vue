<template>
    <FluxPane variant="well">
        <FluxAspectRatio :aspect-ratio="21 / 9">
            <FluxGridPattern
                :height="30"
                :width="30"
                :stroke-dasharray="3"/>
        </FluxAspectRatio>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxGridPattern, FluxPane } from '@flux-ui/components';
</script>
