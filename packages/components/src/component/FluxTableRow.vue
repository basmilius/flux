<template>
    <tr :class="clsx($style.tableRow, isSelected && $style.isSelected)">
        <slot/>
    </tr>
</template>

<script
    lang="ts"
    setup>
    import { clsx } from 'clsx';
    import type { VNode } from 'vue';
    import $style from '~flux/components/css/component/Table.module.scss';

    defineProps<{
        readonly isSelected?: boolean;
    }>();

    defineSlots<{
        default(): VNode[];
    }>();
</script>
