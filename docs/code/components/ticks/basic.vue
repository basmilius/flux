<template>
    <div class="ticks-example">
        <FluxTicks style="width: 90%"
            :lower="0"
            :upper="100"/>
    </div>
</template>

<script
    setup
    lang="ts">
    import { FluxTicks } from '@flux-ui/components';
</script>

<style
    scoped
    lang="css">
    .ticks-example {
        height: 25px;
        display: flex;
        align-items: center;
        place-content: center;
    }
</style>
