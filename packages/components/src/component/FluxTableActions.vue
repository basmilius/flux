<template>
    <FluxActionStack :class="$style.tableActions">
        <slot/>
    </FluxActionStack>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import FluxActionStack from './FluxActionStack.vue';
    import $style from '$flux/css/component/Table.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
