<template>
    <div
        :class="$style.container"
        :style="{'--gutter': `${gutter}px`}">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Layout.module.scss';

    const {
        gutter = 18
    } = defineProps<{
        readonly gutter?: number;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
