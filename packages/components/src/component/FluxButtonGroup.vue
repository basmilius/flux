<template>
    <div :class="$style.buttonGroup">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Button.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
