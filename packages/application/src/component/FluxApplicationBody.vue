<template>
    <div :class="$style.applicationBody">
        <slot/>
    </div>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '../css/component/Application.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
