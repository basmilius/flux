<template>
    <div
        data-flow-anchor
        :class="$style.flowJunction"
        :data-color="color"/>
</template>

<script
    lang="ts"
    setup>
    import type { FluxColor } from '@flux-ui/types';
    import $style from '~flux/flow/css/component/FlowJunction.module.scss';

    defineProps<{
        readonly color?: FluxColor;
    }>();
</script>
