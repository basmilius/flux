<template>
    <FluxRoot>
        <RouterView/>
    </FluxRoot>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoot } from '@flux-ui/components';
    import { RouterView } from 'vue-router';
</script>
