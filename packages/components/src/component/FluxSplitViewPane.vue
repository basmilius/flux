<template>
    <div :class="$style.splitViewPane">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/SplitView.module.scss';

    defineProps<{
        readonly defaultSize?: number | string;
        readonly minSize?: number;
        readonly maxSize?: number;
        readonly isResizable?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
