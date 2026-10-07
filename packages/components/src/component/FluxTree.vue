<template>
    <ul
        :class="$style.tree"
        role="list">
        <slot/>
    </ul>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Tree.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
