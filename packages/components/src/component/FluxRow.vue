<template>
    <div
        :class="$style.row"
        :style="{'--gap': `${gap}px`}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Layout.module.scss';

    const {
        gap = 18
    } = defineProps<{
        readonly gap?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
