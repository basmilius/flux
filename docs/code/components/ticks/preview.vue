<template>
    <Preview>
        <FluxTicks style="width: 90%"
            :lower="0"
            :upper="100"/>
    </Preview>
</template>

<script
    setup
    lang="ts">
    import { FluxTicks } from '@flux-ui/components';
</script>
