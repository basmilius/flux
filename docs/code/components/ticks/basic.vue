<template>
    <div :class="$style.ticksExample">
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

<style module>
    .ticksExample {
        height: 25px;
        display: flex;
        align-items: center;
        place-content: center;
    }
</style>
