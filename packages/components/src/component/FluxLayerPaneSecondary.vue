<template>
    <div :class="$style.layerPaneSecondary">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/LayerPane.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
