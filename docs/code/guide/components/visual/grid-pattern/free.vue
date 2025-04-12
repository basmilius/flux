<template>
    <FluxPane variant="flat">
        <FluxAspectRatio :aspect-ratio="21 / 9">
            <FluxGridPattern
                :height="42"
                :width="42"
                :stroke-dasharray="2"
                :squares="[
                    [1, 1],
                    [2, 2],
                    [7, 5],
                    [8, 4]
                ]"/>
        </FluxAspectRatio>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxAspectRatio, FluxGridPattern, FluxPane } from '@flux-ui/components';
</script>
