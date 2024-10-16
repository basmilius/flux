<template>
    <div
        :class="axis === 'horizontal' ? $style.separatorHorizontal : $style.separatorVertical"
        role="separator"
        :aria-orientation="axis"/>
</template>

<script
    lang="ts"
    setup>
    import type { Axis } from '@/types';
    import $style from '@/css/component/Divider.module.scss';

    const {
        axis = 'horizontal'
    } = defineProps<{
        readonly axis?: Axis;
    }>();
</script>
