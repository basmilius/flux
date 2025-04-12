<template>
    <Preview>
        <FluxPane style="width: 330px">
            <FluxColorPicker
                :model-value="[31, 75, 109]"
                type="rgb"/>
        </FluxPane>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorPicker, FluxPane } from '@flux-ui/components';
</script>
