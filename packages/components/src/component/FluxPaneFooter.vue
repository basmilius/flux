<template>
    <div :class="$style.paneFooter">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Pane.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
