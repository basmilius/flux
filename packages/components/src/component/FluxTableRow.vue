<template>
    <tr :class="$style.tableRow">
        <slot/>
    </tr>
</template>

<script
    lang="ts"
    setup>
    import type { VNode } from 'vue';
    import $style from '$flux/css/component/Table.module.scss';

    defineSlots<{
        default(): VNode[];
    }>();
</script>
