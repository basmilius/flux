<template>
    <aside :class="$style.applicationSide">
        <slot/>
    </aside>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '../css/component/ApplicationSide.module.scss';

    defineSlots<{
        default(): VNode;
    }>();
</script>
