<template>
    <FluxFlex
        direction="horizontal"
        :gap="21">
        <FluxProgressRing
            v-for="color of colors"
            :key="color"
            :color="color"
            :size="48"
            :value="0.6"/>
    </FluxFlex>
</template>

<script
    setup
    lang="ts">
    import type { FluxColor } from '@flux-ui/types';
    import { FluxFlex, FluxProgressRing } from '@flux-ui/components';

    const colors: FluxColor[] = ['gray', 'primary', 'danger', 'info', 'success', 'warning'];
</script>
