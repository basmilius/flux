<template>
    <Preview>
        <FluxColorPicker
            :model-value="[31, 75, 109]"
            type="rgb"
            style="width: 330px"/>
    </Preview>
</template>

<script
    lang="ts"
    setup>
    import { FluxColorPicker } from '@flux-ui/components';
</script>
