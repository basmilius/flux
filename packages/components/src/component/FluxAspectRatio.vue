<template>
    <div
        :class="$style.aspectRatio"
        :style="{aspectRatio}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Layout.module.scss';

    defineProps<{
        aspectRatio: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
