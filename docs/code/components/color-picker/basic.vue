<template>
    <FluxPane>
        <FluxColorPicker
            :model-value="[31, 75, 109]"
            type="rgb"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorPicker, FluxPane } from '@flux-ui/components';
</script>
